// Controller for kundeappen / Hovedmodulen som styrer navigasjon, visninger og kommunikasjon mellom komponentene.

// import { getCategories } from "../api_service.mjs";
import { HomeView } from "./views/user_product_views.mjs";

const homeView = new HomeView(); // Oppretter en instans av HomeView

const testCategories = [
  { catName: "Sjokolade", catDescr: "Sjokolade er godt" },
  { catName: "Karamell", catDescr: "Karamell er godt" },
  { catName: "Sukker", catDescr: "Sukker er godt" },
];
homeView.refresh(testCategories);
document.body.appendChild(homeView);