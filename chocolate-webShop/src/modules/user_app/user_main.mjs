// Controller for kundeappen / Hovedmodulen som styrer navigasjon, visninger og kommunikasjon mellom komponentene.

import {
  getCategories,
  getProductsBySearch,
  getProductsByCategory,
  getProductById,
  registerUser,
  getShippingMethods,
  addOrder,
  getProductComments,
  userLogin,
  getUserThumbUrl,
  getUsers,
} from "../api_service.mjs";

import {
  HomeView,
  ProductListView,
  ProductDetailView,
} from "./views/user_product_views.mjs";

import { showMessage } from "../msg_handler.mjs";

import { RegistrationView } from "./views/user_registration_views.mjs";

import { CartView } from "./views/user_cart_views.mjs";

import { CheckoutView } from "./views/user_checkout_views.mjs";

import { OrderConfirmationView } from "./views/user_order_confirmation_views.mjs";

import { CommentsView } from "./views/user_comments_views.mjs";

import { LoginView } from "./views/user_login_views.mjs";

import { UserSettingsView } from "./views/user_settings_views.mjs";

//----------------------------shoppingCart----------------------------
const cart = JSON.parse(localStorage.getItem("shoppingCart")) || []; // Henter lagret handlekurv, eller oppretter en tom hvis ingen er lagret

function addToCart(product) {
  // Legger produktet i handlekurven, eller øker antallet hvis det finnes fra før
  const existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("shoppingCart", JSON.stringify(cart)); // Lagrer den oppdaterte handlekurven i nettleseren
}

//----------------------------prepareView--------------------------------
// Klargjør visning før navigasjon
async function prepareView(view) {
  view.style.visibility = "hidden";
  document.body.appendChild(view);

  const styleLink = view.shadow.querySelector('link[rel="stylesheet"]');

  await new Promise((resolve) => {
    if (styleLink.sheet) {
      resolve();
    } else {
      styleLink.addEventListener("load", resolve, { once: true });
      styleLink.addEventListener("error", resolve, { once: true });
    }
  });
}

//------------------------------homeView-----------------------------
const homeView = new HomeView(); // Oppretter en instans av HomeView

const categories = await getCategories(); // Henter kategorier fra API og venter på respons

homeView.refresh(categories);
document.body.appendChild(homeView);

homeView.addEventListener("categorySelect", async (event) => {
  const products = await getProductsByCategory(event.categoryData.id);

  productListView.refresh(products, event.categoryData.catName);

  await prepareView(productListView);

  homeView.remove();
  productListView.style.visibility = "visible";
});

homeView.addEventListener("productSearch", async (event) => {
  const products = await getProductsBySearch(event.searchWord);
  productListView.refresh(products, "Search results");

  await prepareView(productListView);

  homeView.remove();
  productListView.style.visibility = "visible";
});

//-----------------------------header-----------------------------

const homeButton = document.getElementById("homeButton");

async function showHome() {
  await prepareView(homeView);

  // Fjerner andre visninger
  productListView.remove();
  productDetailView.remove();
  cartView.remove();
  checkoutView.remove();
  registrationView.remove();
  orderConfirmationView.remove();
  commentsView.remove();
  loginView.remove();
  userSettingsView.remove();

  homeView.style.visibility = "visible";
}

homeButton.addEventListener("click", showHome);

const homeTitle = document.getElementById("homeTitle");

homeTitle.addEventListener("click", showHome);

homeTitle.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    showHome();
  }
});

const cartButton = document.getElementById("cartButton");

const userMenuButton = document.getElementById("userMenuButton");
const userMenu = document.getElementById("userMenu");
const loggedIn = document.getElementById("loggedIn");
const loggedOut = document.getElementById("loggedOut");

function showUserThumb() {
  const thumb = sessionStorage.getItem("userThumb");

  if (!thumb) return; //hvis det ikke finnes en fil opplastet

  const img = document.createElement("img");
  img.src = getUserThumbUrl(thumb);
  img.alt = "Profile picture"; //viktig universell utforming
  img.style.borderRadius = "50%"; // ny kode fordi tidligere css er for knapp
  img.style.objectFit = "cover";

  userMenuButton.replaceChildren(img);
}

showUserThumb();

userMenuButton.addEventListener("click", () => {
  if (sessionStorage.getItem("userToken")){
    loggedOut.hidden = true;
    loggedIn.hidden = false;
    userMenu.classList.add("logged-in");
  } else {
    loggedOut.hidden = false;
    loggedIn.hidden = true;
    userMenu.classList.remove("logged-in");
  }
  userMenu.hidden = !userMenu.hidden; //gjør det motsatte av hva den er på, derfor åpnes og lukkes menyen når du trykker
});

//--------------------------------cartView--------------------------------
const cartView = new CartView();

// Åpner checkout
cartView.addEventListener("checkoutClick", async () => {
  if (cart.length === 0) {
    showMessage("Your shopping cart is empty.");
    return;
  }

  shippingMethods = await getShippingMethods();

  checkoutView.refresh(shippingMethods, cart);

  await prepareView(checkoutView);

  cartView.remove();
  checkoutView.style.visibility = "visible";
});

// Oppdaterer antallet i handlekurven og beregner prisene på nytt
cartView.addEventListener("quantityChange", (event) => {
  const product = cart.find((item) => item.id === event.detail.id);

  if (product) {
    product.quantity = event.detail.quantity;
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
    cartView.refresh(cart);
  }
});

// Fjerner valgt produkt fra handlekurven og oppdaterer visningen
cartView.addEventListener("deleteCartProduct", (event) => {
  const index = cart.findIndex((item) => item.id === event.detail);

  if (index !== -1) {
    cart.splice(index, 1);
    localStorage.setItem("shoppingCart", JSON.stringify(cart)); // Lagrer handlekurven etter at produktet er slettet
    cartView.refresh(cart);
  }
});

// Tømmer hele handlekurven og oppdaterer visningen
cartView.addEventListener("emptyCart", () => {
  cart.length = 0;

  localStorage.setItem("shoppingCart", JSON.stringify(cart));

  cartView.refresh(cart);
});

// Åpner handlekurven
cartButton.addEventListener("click", async () => {
  cartView.refresh(cart);

  await prepareView(cartView);

  homeView.remove();
  productListView.remove();
  productDetailView.remove();
  checkoutView.remove();
  registrationView.remove();
  orderConfirmationView.remove();
  commentsView.remove();
  loginView.remove();
  userSettingsView.remove();

  cartView.style.visibility = "visible";
});

//-----------------------------checkoutView-----------------------------
const checkoutView = new CheckoutView();

let isOrdering = false;

let shippingMethods = [];

// Mottar kundeinformasjonen når kunden trykker Place order
checkoutView.addEventListener("placeOrder", async (event) => {
  if (isOrdering) {
    // Hindrer flere bestillinger mens én behandles
    return;
  }

  // Hindrer tomme bestillinger
  if (cart.length === 0) {
    showMessage("Your shopping cart is empty.");
    return;
  }

  isOrdering = true;

  const customerData = event.detail.customerData;
  const shippingId = event.detail.shippingId;

  const order = {
    //Samler bestillingsinformasjonen
    customer_name: customerData.customerName,
    email: customerData.customerEmail,
    phone: customerData.customerPhone,
    street: customerData.customerStreet,
    zipcode: customerData.customerZip,
    city: customerData.customerCity,
    country: customerData.customerCountry,
    shipping_id: shippingId,
    content: JSON.stringify(cart), // Gjør produktene i handlekurven om til JSON-tekst for API-et
  };

  try {
    const result = await addOrder(order);

    if (result) {
      console.log("Order created:", result);
      cart.length = 0; // Tømmer handlekurven etter vellykket bestilling
      localStorage.setItem("shoppingCart", JSON.stringify(cart));
      cartView.refresh(cart);
      orderConfirmationView.refresh(result.record, shippingMethods);

      await prepareView(orderConfirmationView);

      checkoutView.remove();
      orderConfirmationView.style.visibility = "visible";
      isOrdering = false;
    } else {
      isOrdering = false;
      alert("Could not place your order. Please try again.");
      console.log("Could not create order.");
    }
  } catch (error) {
    isOrdering = false;
    alert("Could not place your order. Please try again.");
    console.error("Order error:", error);
  }
});

//-----------------------------orderConfirmationView-----------------------------
const orderConfirmationView = new OrderConfirmationView();

//-----------------------------createUser-----------------------------
const createUserButton = document.getElementById("createUserButton");
createUserButton.addEventListener("click", () => {
  homeView.remove();
  productListView.remove();
  productDetailView.remove();
  cartView.remove();
  checkoutView.remove();
  loginView.remove();
  document.body.appendChild(registrationView);
  userSettingsView.remove();
  userMenu.hidden = true;
});

//-----------------------------UserSettingsView-----------------------------
const userSettingsView = new UserSettingsView();
const editUserButton = document.getElementById("editUserButton");

editUserButton.addEventListener("click", async () => {
  const users = await getUsers();
  const user = users.find(
    (item) => item.username === sessionStorage.getItem("userUsername") // finner brukeren med samme brukernavn som lagrets ved innlogging.
  );
  if (!user) {
  showMessage("Could not load user information.");
  return;
}
  userSettingsView.prepareEdit(user);

  homeView.remove();
  productListView.remove();
  productDetailView.remove();
  cartView.remove();
  checkoutView.remove();
  registrationView.remove();
  loginView.remove();
  commentsView.remove();
  orderConfirmationView.remove();

  document.body.appendChild(userSettingsView);
  userMenu.hidden = true;
});

//-----------------------------loginButton-----------------------------
const loginButton = document.getElementById("loginButton");

loginButton.addEventListener("click", () => {
  homeView.remove();
  productListView.remove();
  productDetailView.remove();
  cartView.remove();
  checkoutView.remove();
  registrationView.remove();
  userSettingsView.remove();

  document.body.appendChild(loginView);
  userMenu.hidden = true;
});
//-----------------------------productListView-----------------------------
const productListView = new ProductListView();

productListView.addEventListener("backClick", showHome);

// Henter valgt produkt
productListView.addEventListener("productSelect", async (event) => {
  const product = await getProductById(event.productData.id);

  if (!product) {
    return;
  }

  productDetailView.refresh(product);

  await prepareView(productDetailView);

  productListView.remove();
  productDetailView.style.visibility = "visible";
});

//-----------------------------productDetailView-----------------------------
const productDetailView = new ProductDetailView();

productDetailView.addEventListener("buyProduct", (event) => {
  addToCart(event.detail);
});

productDetailView.addEventListener("backClick", async () => {
  await prepareView(productListView);

  productDetailView.remove();
  productListView.style.visibility = "visible";
});

const commentsView = new CommentsView();

productDetailView.addEventListener("showComments", async (event) => {
  const productId = event.detail;
  const comments = await getProductComments(productId);

  commentsView.refresh(comments);

  productDetailView.remove();
  document.body.appendChild(commentsView);
});

commentsView.addEventListener("backClick", async () => {
  await prepareView(productDetailView);

  commentsView.remove();
  productDetailView.style.visibility = "visible";
});

//-----------------------------registrationView-----------------------------
const registrationView = new RegistrationView();

registrationView.addEventListener("registeruser", async function (evt) {
  const result = await registerUser(evt.userForm);
  if (result) {
    registrationView.resetForm();
    showMessage("Account created successfully!");
  } else {
    showMessage("Could not create account. Please try again.");
  }
});

registrationView.addEventListener("cancelRegistration", function (evt) {
  showHome();
});

//-----------------------------loginView-----------------------------
const loginView = new LoginView();

loginView.addEventListener("loginuser", async function (evt) {
  const result = await userLogin(evt.username, evt.password);

  if (result?.logindata?.token) { // ?. betyr omtrent «fortsett bare hvis verdien finnes». optional chaining

    sessionStorage.setItem("userToken", result.logindata.token);
    sessionStorage.setItem("userThumb", result.logindata.thumb);
    sessionStorage.setItem("userUsername", result.logindata.username);
    showUserThumb();

    loginView.resetForm();
    showMessage("Login successful!");
    showHome();
  } else {
    showMessage("Incorrect email or password. Please try again.");
  }
});

loginView.addEventListener("cancelLogin", function (evt) {
  showHome();

});






//testMedBilde@Bilde.com - bilde
//testbruker@gmail.com - 12345678