export class HomeView extends HTMLElement {
  //-----------------------------
  constructor() { // Oppretter Shadow DOM
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  //-----------------------------
  refresh(data) {
    // Viser kategorilisten
    if (!data) {
      return;
    } //if an error is catched in api_service

    this.shadow.replaceChildren(); //Tryggere enn innerHTML

    const searchField = this.createSearchField();
    this.shadow.appendChild(searchField);

    const cartButton = this.createCartButton();
    this.shadow.appendChild(cartButton);

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

    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.placeholder = "Search for chocolate...";
    searchInput.setAttribute("aria-label", "Search for products"); //gir søkefeltet et navn som blant annet skjermlesere kan lese opp for personer med synsnedsettelser

    const searchButton = document.createElement("button");
    searchButton.textContent = "Search";

    searchButton.addEventListener("click", () => {
      this.handleSearch(searchInput.value); //this.handleSearch(...)Sender søkeordet til en egen metode.
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

  createCartButton() {
    // Oppretter handlekurvknappen
    const cartButton = document.createElement("button");
    cartButton.textContent = "Go to shopping cart";

    cartButton.addEventListener("click", () => {
      this.handleCartClick();
    });
    return cartButton;
  }

  handleCartClick() {
    const cartEvt = new CustomEvent("cartClick", {
      composed: true,
      bubbles: true,
    });
    this.shadow.dispatchEvent(cartEvt);
  }
}

customElements.define("home-view", HomeView); // Registrerer en Web Component i nettleseren
