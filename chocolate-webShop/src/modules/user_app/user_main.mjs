// Controller for kundeappen / Hovedmodulen som styrer navigasjon, visninger og kommunikasjon mellom komponentene.

import { getCategories, getProductsBySearch } from "../api_service.mjs";
import { HomeView, ProductListView } from "./views/user_product_views.mjs";

//------------------------------homeView-----------------------------
const homeView = new HomeView(); // Oppretter en instans av HomeView

const categories = await getCategories(); // Henter kategorier fra API og venter på respons

homeView.refresh(categories);
document.body.appendChild(homeView);

homeView.addEventListener("categorySelect", (event) => {
  console.log(event.categoryData); // Håndterer klikk på en kategori og sender event med valgt kategori
});

homeView.addEventListener("productSearch", async (event) => {
  console.log(event.searchWord); // Håndterer søk og sender event med søkeordet
  const products = await getProductsBySearch(event.searchWord); //forespør API
  // TODO Task 2: Fix ProductArrayModel (name: chocoName)
  console.log(products);
});

//-----------------------------header-----------------------------
const cartButton = document.getElementById("cartButton"); //finner knappen i headeren i user_app.html

cartButton.addEventListener("click", () => {
  console.log("Shopping cart button clicked");
});

//-----------------------------productListView-----------------------------
const productListView = new ProductListView();

productListView.addEventListener("backClick", () => {
  console.log("Back button clicked");
});

productListView.addEventListener("productSelect", (event) => {
    console.log(event.productData);
});