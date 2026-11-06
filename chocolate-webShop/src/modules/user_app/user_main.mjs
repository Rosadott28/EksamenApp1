// Controller for kundeappen / Hovedmodulen som styrer navigasjon, visninger og kommunikasjon mellom komponentene.

import { getCategories, getProductsBySearch } from "../api_service.mjs";
import { HomeView } from "./views/user_product_views.mjs";

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

homeView.addEventListener("cartClick", () => {
    console.log("Shopping cart button clicked"); 
});