export class UserForumView extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });

        const heading = document.createElement("h2");
        heading.textContent = "Sukkergris Forum";
        this.shadow.appendChild(heading);

    }
}
customElements.define("use-forum-view", UserForumView);