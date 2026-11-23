// Controller for kundeappen / Hovedmodulen som styrer navigasjon, visninger og kommunikasjon mellom komponentene.

import {
  getCategories,
  getProductsBySearch,
  getProductsByCategory,
  getProductById,
  registerUser,
  getShippingMethods,
  addOrder,
} from "../api_service.mjs";

import {
  HomeView,
  ProductListView,
  ProductDetailView,
} from "./views/user_product_views.mjs";

import { showMessage } from "../msg_handler.mjs";

import { RegistrationView } from "../user_registration_views.mjs";

import { CartView } from "./views/user_cart_views.mjs";

import { CheckoutView } from "./views/user_checkout_views.mjs";

import { OrderConfirmationView } from "./views/user_order_confirmation_views.mjs";

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

//------------------------------homeView-----------------------------
const homeView = new HomeView(); // Oppretter en instans av HomeView

const categories = await getCategories(); // Henter kategorier fra API og venter på respons

homeView.refresh(categories);
document.body.appendChild(homeView);

homeView.addEventListener("categorySelect", async (event) => {
  const products = await getProductsByCategory(event.categoryData.id);

  productListView.refresh(products, event.categoryData.catName);
  homeView.remove();
  document.body.appendChild(productListView);
});

homeView.addEventListener("productSearch", async (event) => {
  const products = await getProductsBySearch(event.searchWord); //forespør API
  productListView.refresh(products, "Search results");
  homeView.remove();
  document.body.appendChild(productListView);
});

//-----------------------------header-----------------------------

const homeButton = document.getElementById("homeButton");

function showHome() {
  productListView.remove();
  productDetailView.remove();
  cartView.remove();
  checkoutView.remove();
  registrationView.remove();
  orderConfirmationView.remove();
  document.body.appendChild(homeView);
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
userMenuButton.addEventListener("click", () => {
  userMenu.hidden = !userMenu.hidden; //gjør det motsatte av hva den er på, derfor åpnes og lukkes menyen når du trykker
});

//--------------------------------cartView--------------------------------
const cartView = new CartView();

// Åpner checkout-visningen og henter fraktmetoder
cartView.addEventListener("checkoutClick", async () => {
  shippingMethods = await getShippingMethods();

  cartView.remove();
  checkoutView.refresh(shippingMethods, cart);
  document.body.appendChild(checkoutView);
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

cartButton.addEventListener("click", () => {
  homeView.remove();
  productListView.remove();
  productDetailView.remove();
  checkoutView.remove();
  registrationView.remove();
  orderConfirmationView.remove();

  cartView.refresh(cart);
  document.body.appendChild(cartView);
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
    content: JSON.stringify(cart), //// Gjør produktene i handlekurven om til JSON-tekst for API-et
  };

  try {
    const result = await addOrder(order);

    if (result) {
      console.log("Order created:", result);
      cart.length = 0; // Tømmer handlekurven etter vellykket bestilling
      localStorage.setItem("shoppingCart", JSON.stringify(cart));
      cartView.refresh(cart);
      orderConfirmationView.refresh(result.record, shippingMethods);
      checkoutView.remove();
      document.body.appendChild(orderConfirmationView);
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
  document.body.appendChild(registrationView);
  userMenu.hidden = true;
});

//-----------------------------productListView-----------------------------
const productListView = new ProductListView();

productListView.addEventListener("backClick", () => {
  productListView.remove();
  document.body.appendChild(homeView);
});

// Henter valgt produkt fra API og viser detaljvisningen
productListView.addEventListener("productSelect", async (event) => {
  const product = await getProductById(event.productData.id);

  if (!product) {
    return;
  }

  productDetailView.refresh(product);
  productListView.remove();
  document.body.appendChild(productDetailView);
});

//-----------------------------productDetailView-----------------------------
const productDetailView = new ProductDetailView();

productDetailView.addEventListener("buyProduct", (event) => {
  addToCart(event.detail);
});

productDetailView.addEventListener("backClick", () => {
  productDetailView.remove();
  document.body.appendChild(productListView);
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
