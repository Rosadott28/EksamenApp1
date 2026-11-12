


export class OrderView extends HTMLElement {

    //-----------------------------
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });


        const heading = document.createElement("h2");
        heading.textContent = "Orders";
        this.shadow.appendChild(heading);
    }
}
customElements.define("order-view", OrderView);