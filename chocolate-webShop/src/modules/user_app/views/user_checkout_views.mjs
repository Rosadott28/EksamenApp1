export class CheckoutView extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  //-----------------------------
  refresh(shippingMethods, cart) {
    this.shadow.replaceChildren();

    const styleLink = document.createElement("link");
    styleLink.rel = "stylesheet";
    styleLink.href = "./user.css";
    this.shadow.appendChild(styleLink);

    const heading = document.createElement("h2");
    heading.classList.add("checkout-heading");
    heading.textContent = "Checkout";

    this.shadow.appendChild(heading);

    const customerForm = this.createCustomerForm();
    this.shadow.appendChild(customerForm);

    const shippingSection = this.createShippingSection(shippingMethods);
    this.shadow.appendChild(shippingSection);

    const orderSummary = this.createOrderSummary(cart, shippingMethods);
    this.shadow.appendChild(orderSummary);

    const placeOrderButton = this.createPlaceOrderButton();
    this.shadow.appendChild(placeOrderButton);
  }

  createCustomerForm() {
    const form = document.createElement("form");
    form.classList.add("checkout-form");

    const heading = document.createElement("h3");
    heading.textContent = "Customer information";
    form.appendChild(heading);

    //---Navn---
    const nameLabel = document.createElement("label");
    nameLabel.textContent = "Full name: ";
    nameLabel.htmlFor = "customerName";

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.id = "customerName";
    nameInput.name = "customerName";
    nameInput.required = true;

    form.appendChild(nameLabel);
    form.appendChild(nameInput);

    //---E-post---
    const emailLabel = document.createElement("label");
    emailLabel.textContent = "Email: ";
    emailLabel.htmlFor = "customerEmail";

    const emailInput = document.createElement("input");
    emailInput.type = "email";
    emailInput.id = "customerEmail";
    emailInput.name = "customerEmail";
    emailInput.required = true;

    form.appendChild(emailLabel);
    form.appendChild(emailInput);

    //---telefon nummer---
    const phoneLabel = document.createElement("label");
    phoneLabel.textContent = "Phone: ";
    phoneLabel.htmlFor = "customerPhone";

    const phoneInput = document.createElement("input");
    phoneInput.type = "tel";
    phoneInput.id = "customerPhone";
    phoneInput.name = "customerPhone";

    form.appendChild(phoneLabel);
    form.appendChild(phoneInput);

    //---Adresse---
    const streetLabel = document.createElement("label");
    streetLabel.textContent = "Street: ";
    streetLabel.htmlFor = "customerStreet";

    const streetInput = document.createElement("input");
    streetInput.type = "text";
    streetInput.id = "customerStreet";
    streetInput.name = "customerStreet";
    streetInput.required = true;

    form.appendChild(streetLabel);
    form.appendChild(streetInput);

    //---Postnummer---
    const zipLabel = document.createElement("label");
    zipLabel.textContent = "Zip code: ";
    zipLabel.htmlFor = "customerZip";

    const zipInput = document.createElement("input");
    zipInput.type = "text"; //Et tekstfelt bevarer evt 0 i starten
    zipInput.id = "customerZip";
    zipInput.name = "customerZip";
    zipInput.required = true;

    form.appendChild(zipLabel);
    form.appendChild(zipInput);

    //---By---
    const cityLabel = document.createElement("label");
    cityLabel.textContent = "City: ";
    cityLabel.htmlFor = "customerCity";

    const cityInput = document.createElement("input");
    cityInput.type = "text";
    cityInput.id = "customerCity";
    cityInput.name = "customerCity";
    cityInput.required = true;

    form.appendChild(cityLabel);
    form.appendChild(cityInput);

    //---Land---
    const countryLabel = document.createElement("label");
    countryLabel.textContent = "Country: ";
    countryLabel.htmlFor = "customerCountry";

    const countryInput = document.createElement("input");
    countryInput.type = "text";
    countryInput.id = "customerCountry";
    countryInput.name = "customerCountry";
    countryInput.required = true;

    form.appendChild(countryLabel);
    form.appendChild(countryInput);

    return form;
  }

  createShippingSection(shippingMethods) {
    const section = document.createElement("section");
    section.classList.add("shipping-section");

    const heading = document.createElement("h3");
    heading.textContent = "Shipping method";

    section.appendChild(heading);

    shippingMethods.forEach((method) => {
      const label = document.createElement("label");

      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "shippingMethod";
      radio.value = method.id; //gjør at vi senere kan sende riktig frakt-ID til API-et

      if (method.id === shippingMethods[0].id) {
        //den første fraktmetoden er valgt automatisk.
        radio.checked = true;
      }

      // Oppdaterer fraktprisen og totalsummen når kunden velger en annen fraktmetode
      radio.addEventListener("change", () => {
        const shippingText = this.shadow.querySelector(".shipping-price"); //querySelector til å finne HTML-elementer vi allerede har opprettet
        const grandTotal = this.shadow.querySelector(".order-total");

        const productTotal = Number(
          this.shadow.querySelector(".products-total").dataset.total,
        );
        const shippingPrice = Number(method.price);

        shippingText.textContent = "Shipping: " + shippingPrice + " kr";
        grandTotal.textContent =
          "Total: " + (productTotal + shippingPrice) + " kr";
      });

      label.appendChild(radio);
      label.appendChild(
        document.createTextNode(
          " " + method.type + " - " + method.price + " kr",
        ),
      );

      section.appendChild(label);
    });

    return section;
  }

  createOrderSummary(cart, shippingMethods) {
    const section = document.createElement("section");
    section.classList.add("order-summary");

    const heading = document.createElement("h3");
    heading.textContent = "Order summary";
    section.appendChild(heading);

    const productTotal = cart.reduce((sum, product) => {
      //reduce() beregner summen av alle produktene, inkl antall.
      return sum + product.price * product.quantity;
    }, 0);

    const totalText = document.createElement("p");
    totalText.classList.add("products-total");
    totalText.dataset.total = productTotal;
    totalText.textContent = "Products total: " + productTotal + " kr";
    section.appendChild(totalText);

    const shippingPrice = Number(shippingMethods[0]?.price ?? 0);

    const shippingText = document.createElement("p");
    shippingText.classList.add("shipping-price");
    shippingText.textContent = "Shipping: " + shippingPrice + " kr";
    section.appendChild(shippingText);

    const grandTotal = document.createElement("p");
    grandTotal.classList.add("order-total");
    grandTotal.textContent = "Total: " + (productTotal + shippingPrice) + " kr";
    section.appendChild(grandTotal);

    return section;
  }

  createPlaceOrderButton() {
    const button = document.createElement("button");
    button.textContent = "Place order";
    button.classList.add("place-order-button");

    return button;
  }
}

customElements.define("checkout-view", CheckoutView);
