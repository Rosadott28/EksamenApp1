import { getProductThumbUrl } from "../../api_service.mjs";

//----------------------------- HOME VIEW -----------------------------

export class HomeView extends HTMLElement {
  //-----------------------------
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" }); // Oppretter Shadow DOM
  }
  //-----------------------------
  refresh(data) {
    // Viser kategorilisten
    if (!data) {
      return;
    } //if an error is catched in api_service

    this.shadow.replaceChildren(); //Tryggere enn innerHTML

    const styleLink = document.createElement("link");
    styleLink.rel = "stylesheet";
    styleLink.href = "./user.css";
    this.shadow.appendChild(styleLink); //legger CSS-koblingen inn i Shadow DOM.

    const searchField = this.createSearchField();
    this.shadow.appendChild(searchField);

    const heading = document.createElement("h2");
    heading.classList.add("view-heading");
    heading.textContent = "Categories";
    this.shadow.appendChild(heading);

    data.forEach((value) => {
      const div = this.createCategory(value);
      this.shadow.appendChild(div);

      div.addEventListener("click", () => {
        this.handleCategoryClick(value);
      });
    });
  }

  createCategory(category) {
    // Oppretter HTML for én kategori
    const div = document.createElement("div");
    div.classList.add("category-card"); // CSS-klasse for kategorikort

    const heading = document.createElement("h2");
    heading.textContent = category.catName;
    div.appendChild(heading);

    const description = document.createElement("p");
    description.textContent = category.catDescr;
    div.appendChild(description);

    return div;
  }

  handleCategoryClick(category) {
    // Håndterer klikk på en kategori og sender event med valgt kategori
    const catEvt = new CustomEvent("categorySelect", {
      composed: true,
      bubbles: true,
    });
    catEvt.categoryData = category;
    this.shadow.dispatchEvent(catEvt);
  }

  createSearchField() {
    // Oppretter søkefeltet med input og knapp
    const searchContainer = document.createElement("div");
    searchContainer.classList.add("search-container"); // CSS-klasse for søkeområdet

    const searchInput = document.createElement("input");
    searchInput.classList.add("search-input"); // CSS-klasse for søkefeltet
    searchInput.type = "text";
    searchInput.placeholder = "Search for chocolate...";
    searchInput.setAttribute("aria-label", "Search for products"); //gir søkefeltet et navn som blant annet skjermlesere kan lese opp for personer med synsnedsettelser

    const searchButton = document.createElement("button");
    searchButton.classList.add("search-button"); // CSS-klasse for søkeknappen
    searchButton.textContent = "Search";

    searchButton.addEventListener("click", () => {
      this.handleSearch(searchInput.value); //Sender søkeordet til en egen metode.
    });

    searchContainer.appendChild(searchInput);
    searchContainer.appendChild(searchButton);

    return searchContainer;
  }

  handleSearch(searchWord) {
    const searchEvt = new CustomEvent("productSearch", {
      composed: true,
      bubbles: true,
    });

    searchEvt.searchWord = searchWord;
    this.shadow.dispatchEvent(searchEvt);
  }
}

//----------------------------- END OF HOME VIEW -----------------------------

//----------------------------- PRODUCT LIST VIEW ----------------------------

export class ProductListView extends HTMLElement {
  //-----------------------------
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  //-----------------------------
  refresh(data, title) {
    // Viser produktlisten
    if (!data) {
      return;
    }

    this.shadow.replaceChildren();

    const styleLink = document.createElement("link");
    styleLink.rel = "stylesheet";
    styleLink.href = "./user.css";
    this.shadow.appendChild(styleLink);

    const headerRow = document.createElement("div"); // Oppretter en rad for overskrift og tilbakeknapp, i en beholder
    headerRow.classList.add("list-header");

    const backButton = this.createBackButton();
    headerRow.appendChild(backButton);

    const heading = document.createElement("h2");
    heading.classList.add("view-heading");
    heading.textContent = title;
    headerRow.appendChild(heading);

    this.shadow.appendChild(headerRow);

    if (data.length === 0) {
      //undersøker om det er null produkter.
      const message = document.createElement("p");
      message.textContent = "Your search did not match any products";
      this.shadow.appendChild(message);
      return;
    }

    data.forEach((product) => {
      const productCard = this.createProduct(product);
      this.shadow.appendChild(productCard);
    });
  }

  createProduct(product) {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    const productImage = this.createProductImage(product);
    productCard.appendChild(productImage);

    const productInfo = this.createProductInfo(product);
    productCard.appendChild(productInfo);

    productCard.addEventListener("click", () => {
      this.handleProductClick(product);
    });

    return productCard;
  }

  createProductImage(product) {
    const productImage = document.createElement("img");
    productImage.src = getProductThumbUrl(product);
    productImage.alt = product.name; // Setter alt-tekst for tilgjengelighet

    return productImage;
  }

  createProductInfo(product) {
    const productInfo = document.createElement("div");

    const heading = document.createElement("h2");
    heading.textContent = product.name;
    productInfo.appendChild(heading);

    const price = document.createElement("p");
    price.textContent = `${product.price} kr`;
    productInfo.appendChild(price);

    return productInfo;
  }

  handleProductClick(product) {
    const productEvt = new CustomEvent("productSelect", {
      composed: true,
      bubbles: true,
    });

    productEvt.productData = product;
    this.shadow.dispatchEvent(productEvt);
  }

  createBackButton() {
    const backButton = document.createElement("button");
    backButton.textContent = "← Back";
    backButton.classList.add("back-button");

    backButton.addEventListener("click", () => {
      this.handleBackClick();
    });

    return backButton;
  }

  handleBackClick() {
    const backEvt = new CustomEvent("backClick", {
      composed: true,
      bubbles: true,
    });

    this.shadow.dispatchEvent(backEvt);
  }
}

//------------------------ END OF PRODUCT LIST VIEW --------------------------

customElements.define("home-view", HomeView); // Registrerer en Web Component i nettleseren

customElements.define("product-list-view", ProductListView);
