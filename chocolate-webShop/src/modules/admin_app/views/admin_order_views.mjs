export class OrderView extends HTMLElement {
  //-----------------------------
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  //-----------------------------
  refresh(orders) {
    if (!orders) {
      return;
    } //if an error is catched in api_service

    this.shadow.replaceChildren();

    const orderTableStyle = document.createElement("style");
    const orderTable = document.createElement("table");
    const orderTableBody = document.createElement("tbody");
    const tableHeaderSection = document.createElement("thead");
    const headerRow = document.createElement("tr");
    const orderNameHeader = document.createElement("th");
    const priceNameHeader = document.createElement("th");
    const actionNameHeader = document.createElement("th");

    orderNameHeader.textContent = "order name";
    priceNameHeader.textContent = "Price";
    actionNameHeader.textContent = "Action";
    orderTableStyle.textContent = `
        
            .delete-button {
            background-color: var(--ivory);
            border: 2px solid #B42318;
            color: #B42318 ;
            border-radius: 999px;
            padding: 6px 14px;
            font-size: 14px;
            cursor: pointer;
            box-shadow: 0 3px 8px #00000020;
        }
        :host {
                display: block;
                width: 100%;
            }

            table {
                width: 100%;
                border-collapse: collapse;
            }
            th {
                text-align: left;
                padding: 4px 8px;
            }
            td {
                padding: 4px 8px;
            }
          thead {
                background-color: var(--truffle);
                color: var(--ivory);
            }

            tbody tr:nth-child(odd) {
                background-color: var(--ivory);
            }

            tbody tr:nth-child(even) {
                background-color: var(--pearl);
            }`;

    headerRow.appendChild(orderNameHeader);
    headerRow.appendChild(priceNameHeader);
    headerRow.appendChild(actionNameHeader);
    tableHeaderSection.appendChild(headerRow);
    orderTable.appendChild(tableHeaderSection);
    orderTable.appendChild(orderTableBody);

    this.shadow.appendChild(orderTable);
    this.shadow.appendChild(orderTableStyle);

    orders.forEach((order) => {
      const orderRow = document.createElement("tr");
      const orderIdCell = document.createElement("td");
      const orderDateCell = document.createElement("td");
      const orderActionCell = document.createElement("td");
      const deleteButton = document.createElement("button");

      deleteButton.classList.add("delete-button");

      deleteButton.textContent = "Delete";

      orderRow.appendChild(orderIdCell);
      orderRow.appendChild(orderDateCell);
      orderRow.appendChild(orderActionCell);
      orderTableBody.appendChild(orderRow);
      orderActionCell.appendChild(deleteButton);

      deleteButton.addEventListener("click", (evt) => {
        const deleteOrder = new CustomEvent("deleteorder", {
          detail: order,
        });
        this.dispatchEvent(deleteOrder);
      });
    });
  }
}
customElements.define("order-view", OrderView);
