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
    heading.textContent = "Shopping cart";
    this.shadow.appendChild(heading);

    const productTable = this.createProductTable(data);
    this.shadow.appendChild(productTable);

    const cartTotal = this.createCartTotal(data);
    this.shadow.appendChild(cartTotal);
  }

  createProductTable(data) {
    //lager tabellen
    const productTable = document.createElement("table");
    const headerRow = document.createElement("tr");

    const columns = [
      "Product ID",
      "Name",
      "Quantity",
      "Price",
      "Total",
      "Action",
    ];

    columns.forEach((column) => {
      const th = document.createElement("th");
      th.textContent = column;
      headerRow.appendChild(th);
    });

    productTable.appendChild(headerRow);

    data.forEach((product) => {
      const productRow = this.createProductRow(product);
      productTable.appendChild(productRow);
    });

    return productTable;
  }

  createProductRow(product) {
    //lager radene i tabellen
    const row = document.createElement("tr");

    const values = [
      product.id,
      product.name,
      product.price + " kr",
      product.price * product.quantity + " kr",
    ];

    values.forEach((value) => {
      const cell = document.createElement("td");
      cell.textContent = value;
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

    const quantityCell = document.createElement("td");
    quantityCell.appendChild(quantityInput);

    row.insertBefore(quantityCell, row.children[2]);

    const deleteCell = document.createElement("td");
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
