export class CheckoutView extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  //-----------------------------
  refresh() {
    this.shadow.replaceChildren();

    const heading = document.createElement("h2");
    heading.textContent = "Checkout";

    this.shadow.appendChild(heading);
  }
}

customElements.define("checkout-view", CheckoutView);