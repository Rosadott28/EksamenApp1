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
  }

  createProductTable(data) {
    //lager tabellen
    const productTable = document.createElement("table");
    const headerRow = document.createElement("tr");

    const columns = ["Product ID", "Name", "Quantity", "Price", "Total"];

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
      1,
      product.price + " kr",
      product.price + " kr",
    ];

    values.forEach((value) => {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.appendChild(cell);
    });

    return row;
  }
}

customElements.define("cart-view", CartView);
