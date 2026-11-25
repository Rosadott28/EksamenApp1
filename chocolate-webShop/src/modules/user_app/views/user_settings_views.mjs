export class UserSettingsView extends HTMLElement {
constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });

        const heading = document.createElement("h2");
        heading.textContent = "User settings";
        this.shadow.appendChild(heading);  
    }
};
customElements.define("user-settings-view", UserSettingsView);