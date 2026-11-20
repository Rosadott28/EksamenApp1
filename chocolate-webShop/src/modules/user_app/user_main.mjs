// Controller for kundeappen / Hovedmodulen som styrer navigasjon, visninger og kommunikasjon mellom komponentene.

import {
  getCategories,
  getProductsBySearch,
  getProductsByCategory,
  getProductById,
  registerUser,
} from "../api_service.mjs";
import {
  HomeView,
  ProductListView,
  ProductDetailView,
} from "./views/user_product_views.mjs";
import {
  showMessage
} from "../msg_handler.mjs";
import {
  RegistrationView
} from "../user_registration_views.mjs";



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
  registrationView.remove();
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

const cartButton = document.getElementById("cartButton"); //finner knappen i headeren i user_app.html

cartButton.addEventListener("click", () => {
  console.log("Shopping cart button clicked");
});

const userMenuButton = document.getElementById("userMenuButton");
const userMenu = document.getElementById("userMenu");
userMenuButton.addEventListener("click", () => {
  userMenu.hidden = !userMenu.hidden; //gjør det motsatte av hva den er på, derfor åpnes og lukkes menyen når du trykker
});

//-----------------------------createUser-----------------------------
const createUserButton = document.getElementById("createUserButton");
createUserButton.addEventListener("click", () => {
  homeView.remove();
  productListView.remove();
  productDetailView.remove();
  document.body.appendChild(registrationView);
  userMenu.hidden = true;
});

//-----------------------------productListView-----------------------------
const productListView = new ProductListView();

productListView.addEventListener("backClick", () => {
  productListView.remove();
  document.body.appendChild(homeView);
});

productListView.addEventListener("productSelect", async (event) => {
  // Henter valgt produkt fra API og viser detaljvisningen
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

productDetailView.addEventListener("backClick", () => {
  productDetailView.remove();
  document.body.appendChild(productListView);
});

//-----------------------------registrationView-----------------------------
const registrationView = new RegistrationView();

registrationView.addEventListener('registeruser', async function (evt) {
  const result = await registerUser(evt.userForm);
  if (result) {
    registrationView.resetForm()
    showMessage("Account created successfully!");
  } else {
    showMessage("Could not create account. Please try again.");
  }
});

  registrationView.addEventListener('cancelRegistration', function (evt) {
          showHome();
  });