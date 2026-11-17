import { getProductThumbUrl, getProductImageUrl } from "../../api_service.mjs";

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

    this.shadow.replaceChildren(); //Tryggere enn innerHTML. Fjerner tidligere innhold

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

    // Samler kategorikortene for responsivt grid
    const categoryContainer = document.createElement("div");
    categoryContainer.classList.add("category-container");

    data.forEach((value) => {
      const div = this.createCategory(value);

      categoryContainer.appendChild(div);

      div.addEventListener("click", () => {
        this.handleCategoryClick(value);
      });
    });
    this.shadow.appendChild(categoryContainer);
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
    price.textContent = product.price + " kr";
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

//------------------------------PRODUCT DETAIL VIEW-----------------------------

export class ProductDetailView extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  //-----------------------------
  refresh(data) {
    // Viser produktdetaljer
    if (!data) {
      return;
    }

    this.shadow.replaceChildren();

    const styleLink = document.createElement("link");
    styleLink.rel = "stylesheet";
    styleLink.href = "./user.css";
    this.shadow.appendChild(styleLink);

    const backButton = this.createBackButton();
    this.shadow.appendChild(backButton);

    const productCard = document.createElement("div");
    productCard.classList.add("detail-card");

    const imageContainer = this.createImageContainer(data);
    productCard.appendChild(imageContainer);

    const productInfo = this.createProductInfo(data);
    productCard.appendChild(productInfo);

    this.shadow.appendChild(productCard);
  }

  createImageContainer(data) {
    //bildet og rabattmerket
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("detail-image-container");

    const productImage = this.createProductImage(data);
    imageContainer.appendChild(productImage);

    const discount = this.createDiscountBadge(data);

    if (discount) {
      imageContainer.appendChild(discount);
    }

    return imageContainer;
  }

  createProductImage(data) {
    //lager bildet.
    const productImage = document.createElement("img");
    productImage.src = getProductImageUrl(data);
    productImage.alt = data.name;

    return productImage;
  }

  createDiscountBadge(data) {
    if (data.discount === 0) {
      return null;
    }

    const discount = document.createElement("p");
    discount.classList.add("discount");
    discount.textContent = data.discount + "% discount";

    return discount;
  }

  createProductInfo(data) {
    const productInfo = document.createElement("div");

    const heading = document.createElement("h2");
    heading.classList.add("view-heading");
    heading.textContent = data.name;
    productInfo.appendChild(heading);

    const shortDescription = document.createElement("h3");
    shortDescription.textContent = data.shortDescr;
    productInfo.appendChild(shortDescription);

    const category = document.createElement("p");
    category.textContent = data.categoryName;
    productInfo.appendChild(category);

    const description = document.createElement("p");
    description.textContent = data.descr;
    productInfo.appendChild(description);

    const price = document.createElement("p");
    price.textContent = data.price + " kr";
    productInfo.appendChild(price);

    const rating = this.createProductRating(data);
    if (rating) {
      productInfo.appendChild(rating);
    }

    const stockInfo = this.createStockInfo(data);
    productInfo.appendChild(stockInfo);

    return productInfo;
  }

  createProductRating(data) {
    if (data.rating === null) {
      return null;
    }

    const rating = document.createElement("p");
    const fullStars = Math.floor(data.rating);
    const halfStar = data.rating - fullStars >= 0.5; //Blir true hvis minst 0,5 stjerner igjen

    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    rating.textContent =
      "★".repeat(fullStars) +
      (halfStar ? "⯪" : "") +
      "☆".repeat(emptyStars) + //fyller opp resten til totalt fem stjerner
      " (" +
      data.rating +
      "/5, " +
      data.numberOfRatings +
      " reviews)";

    return rating;
  }

  createStockInfo(data) {
    const stockInfo = document.createElement("div");

    const stock = document.createElement("p");

    if (data.stock === 0) {
      stock.textContent = "Out of stock";
      stockInfo.appendChild(stock);

      if (data.expectedShipped) {
        const delivery = document.createElement("p");
        const date = new Date(data.expectedShipped);
        delivery.textContent =
          "Expected shipping: " + date.toLocaleDateString("en-GB");
        stockInfo.appendChild(delivery);
      }
    } else {
      stock.textContent = "In stock: " + data.stock;
      stockInfo.appendChild(stock);
    }

    return stockInfo;
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

//------------------------ END OF PRODUCT DETAIL VIEW --------------------------

customElements.define("home-view", HomeView); // Registrerer en Web Component i nettleseren

customElements.define("product-list-view", ProductListView);

customElements.define("product-detail-view", ProductDetailView);
