




export class UserView extends HTMLElement {

    //-----------------------------
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });


        const heading = document.createElement("h2");
        heading.textContent = "Users";
        this.shadow.appendChild(heading);
    }
}
customElements.define("user-view", UserView);