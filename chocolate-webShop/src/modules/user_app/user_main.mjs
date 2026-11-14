// Controller for kundeappen / Hovedmodulen som styrer navigasjon, visninger og kommunikasjon mellom komponentene.

import {
  getCategories,
  getProductsBySearch,
  getProductsByCategory,
} from "../api_service.mjs";
import { HomeView, ProductListView } from "./views/user_product_views.mjs";

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
const cartButton = document.getElementById("cartButton"); //finner knappen i headeren i user_app.html

cartButton.addEventListener("click", () => {
  console.log("Shopping cart button clicked");
});

//-----------------------------productListView-----------------------------
const productListView = new ProductListView();

productListView.addEventListener("backClick", () => {
  productListView.remove();
  document.body.appendChild(homeView);
});

productListView.addEventListener("productSelect", (event) => {
  console.log(event.productData);
});
