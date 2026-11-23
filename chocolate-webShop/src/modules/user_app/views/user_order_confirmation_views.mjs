export class OrderConfirmationView extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  //-----------------------------
  refresh(order) {
    this.shadow.replaceChildren();

    const heading = this.createHeading(order);
    this.shadow.appendChild(heading);

    const orderNumber = this.createOrderNumber(order);
    this.shadow.appendChild(orderNumber);

    const customerInfo = this.createCustomerInfo(order);
    this.shadow.appendChild(customerInfo);

    const orderProducts = this.createOrderProducts(order);
    this.shadow.appendChild(orderProducts);
  }

  createHeading(order) {
    const heading = document.createElement("h2");
    heading.textContent = "Order confirmation";
    return heading;
  }

  createOrderNumber(order) {
    const orderNumber = document.createElement("p");
    orderNumber.textContent = "Order number: " + order.orderNumber; //order.orderNumber henter ordrenummeret fra API-responsen

    return orderNumber;
  }

  createCustomerInfo(order) {
    const section = document.createElement("section");
    const heading = document.createElement("h3");
    heading.textContent = "Customer information";
    section.appendChild(heading);

    const name = document.createElement("p");
    name.textContent = "Name: " + order.customer_name;
    section.appendChild(name);

    const email = document.createElement("p");
    email.textContent = "Email: " + order.email;
    section.appendChild(email);

    const address = document.createElement("p");
    address.textContent =
      "Address: " +
      order.street +
      ", " +
      order.zipcode +
      " " +
      order.city +
      ", " +
      order.country;
    section.appendChild(address);

    return section;
  }

  createOrderProducts(order) {
    const section = document.createElement("section");

    const heading = document.createElement("h3");
    heading.textContent = "Ordered products";
    section.appendChild(heading);

    const products = JSON.parse(order.content); //json tekst fra APi til produktliste

    products.forEach((product) => {
      const productText = document.createElement("p");
      productText.textContent =
        product.name + " - " + product.quantity + " × " + product.price + " kr";

      section.appendChild(productText);
    });

    return section;
  }

  
}

customElements.define("order-confirmation-view", OrderConfirmationView);
