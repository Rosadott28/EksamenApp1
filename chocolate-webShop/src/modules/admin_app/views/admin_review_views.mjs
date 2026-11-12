




export class ReviewView extends HTMLElement {

    //-----------------------------
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });


        const heading = document.createElement("h2");
        heading.textContent = "Reviews";
        this.shadow.appendChild(heading);
    }
}
customElements.define("review-view", ReviewView);