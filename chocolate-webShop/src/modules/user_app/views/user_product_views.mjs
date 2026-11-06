export class HomeView extends HTMLElement {
  //-----------------------------
  constructor() {
    // Oppretter Shadow DOM
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
    // sender categoryselect event med valgt kategori
    const catEvt = new CustomEvent("categoryselect", {
      composed: true,
      bubbles: true,
    });
    catEvt.categoryData = category;
    this.shadow.dispatchEvent(catEvt);
  }
}

customElements.define("home-view", HomeView); // Registrerer en Web Component i nettleseren