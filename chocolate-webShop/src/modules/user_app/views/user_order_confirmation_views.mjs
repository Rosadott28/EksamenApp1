export class OrderConfirmationView extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  //-----------------------------
  refresh(order, shippingMethods) {
    this.shadow.replaceChildren();

    const styleLink = document.createElement("link");
    styleLink.rel = "stylesheet";
    styleLink.href = "./user.css";
    this.shadow.appendChild(styleLink);

    const container = document.createElement("section");
    container.classList.add("confirmation-container");

    const heading = this.createHeading(order);
    container.appendChild(heading);

    const orderNumber = this.createOrderNumber(order);
    container.appendChild(orderNumber);

    const customerInfo = this.createCustomerInfo(order);
    container.appendChild(customerInfo);

    const orderProducts = this.createOrderProducts(order);
    container.appendChild(orderProducts);

    const shippingInfo = this.createShippingInfo(order, shippingMethods);
    container.appendChild(shippingInfo);

    const orderTotal = this.createOrderTotal(order, shippingMethods);
    container.appendChild(orderTotal);

    this.shadow.appendChild(container);
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

  createShippingInfo(order, shippingMethods) {
    const section = document.createElement("section");

    const heading = document.createElement("h3");
    heading.textContent = "Shipping information";
    section.appendChild(heading);

    const method = shippingMethods.find(
      // Finner fraktmetoden som har samme ID som bestillingen
      (item) => Number(item.id) === Number(order.shipping_id),
    );

    const shippingText = document.createElement("p");
    shippingText.textContent =
      "Shipping method: " + (method?.type ?? "Unknown");
    section.appendChild(shippingText);

    const estimatedDate = new Date(order.date);
    estimatedDate.setDate(estimatedDate.getDate() + 3);

    const shippingDate = document.createElement("p");
    shippingDate.textContent =
      "Estimated shipping date: " + estimatedDate.toLocaleDateString("en-GB");

    section.appendChild(shippingDate);

    return section;
  }

  createOrderTotal(order, shippingMethods) {
    const section = document.createElement("section");

    const heading = document.createElement("h3");
    heading.textContent = "Order total";
    section.appendChild(heading);

    const products = JSON.parse(order.content);

    const productTotal = products.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0,
    );

    const method = shippingMethods.find(
      (item) => Number(item.id) === Number(order.shipping_id),
    );

    const shippingPrice = Number(method?.price ?? 0);
    const total = productTotal + shippingPrice;

    const totalText = document.createElement("p");
    totalText.textContent = "Total: " + total + " kr";
    section.appendChild(totalText);

    return section;
  }
}

customElements.define("order-confirmation-view", OrderConfirmationView);
