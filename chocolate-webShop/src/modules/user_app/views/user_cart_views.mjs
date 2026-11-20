export class CartView extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  //-----------------------------
  refresh(data) {
    this.shadow.replaceChildren();

    const styleLink = document.createElement("link");
    styleLink.rel = "stylesheet";
    styleLink.href = "./user.css";
    this.shadow.appendChild(styleLink);

    const heading = document.createElement("h2");
    heading.classList.add("view-heading");
    heading.classList.add("cart-heading");
    heading.textContent = "Shopping cart";
    this.shadow.appendChild(heading);

    const productContainer = this.createProductContainer(data);
    this.shadow.appendChild(productContainer);

    const cartTotal = this.createCartTotal(data);
    this.shadow.appendChild(cartTotal);

    const emptyButton = this.createEmptyCartButton();
    this.shadow.appendChild(emptyButton);

    const checkoutButton = this.createCheckoutButton();
    this.shadow.appendChild(checkoutButton);
  }

  createProductContainer(data) {
    const container = document.createElement("div");
    container.classList.add("cart-product-container");

    data.forEach((product) => {
      const productCard = this.createProductRow(product);
      container.appendChild(productCard);
    });

    return container;
  }

  createProductRow(product) {
    const row = document.createElement("div");
    row.classList.add("cart-product-card");

    const values = [
      product.name,
      "Product ID: " + product.id,
      "Unit price: " + product.price + " kr",
      "Product total: " + product.price * product.quantity + " kr",
    ];

    values.forEach((value, index) => {
      const cell = document.createElement("div");
      cell.textContent = value;

      if (index === 0) {
        cell.classList.add("cart-product-name");
      } else if (index === 3) {
        cell.classList.add("cart-product-total");
      }

      row.appendChild(cell);
    });

    const quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.classList.add("quantity-input");
    quantityInput.min = "1";
    quantityInput.value = product.quantity;

    quantityInput.addEventListener("change", () => {
      // Validerer nytt antall og sender endringen videre til hovedmodulen
      const quantity = Number(quantityInput.value);

      if (quantity < 1 || !Number.isInteger(quantity)) {
        quantityInput.value = product.quantity;
        return;
      }

      this.dispatchEvent(
        new CustomEvent("quantityChange", {
          detail: {
            id: product.id,
            quantity: quantity,
          },
        }),
      );
    });

    const quantityCell = document.createElement("div");

    const quantityLabel = document.createElement("label");
    quantityLabel.textContent = "Quantity: ";
    // Kobler Quantity-etiketten til riktig antallsfelt for bedre tilgjengelighet
    quantityInput.id = "quantity-" + product.id;
    quantityLabel.htmlFor = quantityInput.id;

    quantityCell.appendChild(quantityLabel);

    quantityCell.appendChild(quantityInput);

    row.insertBefore(quantityCell, row.children[2]);

    const shippingCell = document.createElement("div");

    if (product.stock === 0 && product.expectedShipped) {
      const date = new Date(product.expectedShipped);
      shippingCell.textContent = date.toLocaleDateString("en-GB");
    }

    row.appendChild(shippingCell);

    const deleteCell = document.createElement("div");
    deleteCell.classList.add("cart-delete-cell");

    const deleteButton = this.createDeleteButton(product);

    deleteCell.appendChild(deleteButton);
    row.appendChild(deleteCell);

    return row;
  }

  createDeleteButton(product) {
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");

    // Sender produkt-ID til hovedmodulen når brukeren vil slette et produkt
    deleteButton.addEventListener("click", () => {
      const deleteEvent = new CustomEvent("deleteCartProduct", {
        detail: product.id,
      });

      this.dispatchEvent(deleteEvent);
    });

    return deleteButton;
  }

  createEmptyCartButton() {
    const emptyButton = document.createElement("button");
    emptyButton.textContent = "Empty shopping cart";
    emptyButton.classList.add("delete-button", "empty-cart-button");

    emptyButton.addEventListener("click", () => {
      this.dispatchEvent(new CustomEvent("emptyCart"));
    });

    return emptyButton;
  }

  createCheckoutButton() {
    const button = document.createElement("button");
    button.textContent = "Proceed to checkout";
    button.classList.add("checkout-button");

    // Sender beskjed til hovedmodulen når brukeren vil gå til checkout
    button.addEventListener("click", () => {
      this.dispatchEvent(new CustomEvent("checkoutClick"));
    });

    return button;
  }

  createCartTotal(data) {
    const total = data.reduce((sum, product) => {
      return sum + product.price * product.quantity;
    }, 0);

    const totalText = document.createElement("p");
    totalText.classList.add("cart-total");
    totalText.textContent = "Total shopping cart: " + total + " kr";

    return totalText;
  }
}

customElements.define("cart-view", CartView);
