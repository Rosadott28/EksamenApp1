// Controller for kundeappen / Hovedmodulen som styrer navigasjon, visninger og kommunikasjon mellom komponentene.

import {
  getCategories,
  getProductsBySearch,
  getProductsByCategory,
  getProductById,
} from "../api_service.mjs";

import {
  HomeView,
  ProductListView,
  ProductDetailView,
} from "./views/user_product_views.mjs";

import { CartView } from "./views/user_cart_views.mjs";

//----------------------------shoppingCart----------------------------
const cart = [];

function addToCart(product) {
  // Legger produktet i handlekurven, eller øker antallet hvis det finnes fra før
  const existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
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

const cartView = new CartView();

cartButton.addEventListener("click", () => {
  homeView.remove();
  productListView.remove();
  productDetailView.remove();

  cartView.refresh(cart);
  document.body.appendChild(cartView);
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

productDetailView.addEventListener("buyProduct", (event) => {
  addToCart(event.detail);
  console.log(cart);
});

productDetailView.addEventListener("backClick", () => {
  productDetailView.remove();
  document.body.appendChild(productListView);
});
