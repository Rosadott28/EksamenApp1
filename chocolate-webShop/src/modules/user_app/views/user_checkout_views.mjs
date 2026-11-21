export class CheckoutView extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  //-----------------------------
  refresh() {
    this.shadow.replaceChildren();

    const styleLink = document.createElement("link");
    styleLink.rel = "stylesheet";
    styleLink.href = "./user.css";
    this.shadow.appendChild(styleLink);

    const heading = document.createElement("h2");
    heading.textContent = "Checkout";

    this.shadow.appendChild(heading);

    const customerForm = this.createCustomerForm();
    this.shadow.appendChild(customerForm);

    const shippingSection = this.createShippingSection();
    this.shadow.appendChild(shippingSection);
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

    //---By---
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

  createShippingSection() {
    const section = document.createElement("section");

    const heading = document.createElement("h3");
    heading.textContent = "Shipping method";

    section.appendChild(heading);

    return section;
  }
}

customElements.define("checkout-view", CheckoutView);
