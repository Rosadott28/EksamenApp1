export class UserSettingsView extends HTMLElement {
constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });

        const heading = document.createElement("h2");
        heading.textContent = "User settings";
        this.shadow.appendChild(heading);  

        
        const userSettingsStyle = document.createElement("style");
        const theForm = document.createElement("form");
        const usernameLabel = document.createElement("label");
        const usernameInput = document.createElement("input");
        const passwordLabel = document.createElement("label");
        const passwordInput = document.createElement("input");
        const fullnameLabel = document.createElement("label");
        const fullnameInput = document.createElement("input");
        const streetLabel = document.createElement("label");
        const streetInput = document.createElement("input");
        const cityLabel = document.createElement("label");
        const cityInput = document.createElement("input");
        const zipcodeLabel = document.createElement("label");
        const zipcodeInput = document.createElement("input");
        const countryLabel = document.createElement("label");
        const countryInput = document.createElement("input");
        const profilePictureLabel = document.createElement("label");
        const profilePicture = document.createElement("input");
        const submitButton = document.createElement("input");

        userSettingsStyle.textContent = `
            :host {
                display: block;
                max-width: 1200px;
                width: calc(100% - 32px);
                margin: 24px auto;
                padding: 32px;
                background-color: var(--ivory);
                color: var(--espresso);
                border-radius: 8px;
                box-sizing: border-box;
                font-size: 16px;
            }

            h2 {
                font-size: 24px;
            }

            input:not([type="submit"]):not([type="file"]),
            textarea {
                width: 100%;
                padding: 10px 12px;
                font-size: 16px;
                box-sizing: border-box;
            }

            label {
                display: inline-block;
                margin-top: 12px;
                margin-bottom: 5px;
                font-weight: 600;
            }

            button[type="submit"],
            input[type="submit"] {
                border-radius: 999px;
                padding: 10px 20px;
                font-size: 16px;
                cursor: pointer;
                margin-top: 12px;
            }

            button[type="submit"] {
                background-color: var(--ivory);
                color: var(--espresso);
                border: 2px solid var(--truffle);
                margin-right: 8px;
            }

            input[type="submit"] {
                background-color: var(--powder);
                color: var(--espresso);
                border: 2px solid var(--powder);
                font-weight: 600;
            }
        `;
        

        theForm.id = "userSettingsForm";

        usernameLabel.textContent = "Email/Username";
        usernameLabel.htmlFor = "username";

        usernameInput.name = "username";
        usernameInput.id = "username";
        usernameInput.type = "email";

        passwordLabel.textContent = "Password";
        passwordLabel.htmlFor = "password";

        passwordInput.name = "password";
        passwordInput.id = "password";
        passwordInput.type = "password";

        fullnameLabel.textContent = "Full name";
        fullnameLabel.htmlFor = "fullname";

        fullnameInput.name = "fullname";
        fullnameInput.id = "fullname";
        fullnameInput.type = "text";

        streetLabel.textContent = "Street";
        streetLabel.htmlFor = "street";

        streetInput.name = "street";
        streetInput.id = "street";
        streetInput.type = "text";

        cityLabel.textContent = "City";
        cityLabel.htmlFor = "city";

        cityInput.name = "city";
        cityInput.id = "city";
        cityInput.type = "text";

        zipcodeLabel.textContent = "Zip code";
        zipcodeLabel.htmlFor = "zipcode";

        zipcodeInput.name = "zipcode";
        zipcodeInput.id = "zipcode";
        zipcodeInput.type = "text";

        countryLabel.textContent = "Country";
        countryLabel.htmlFor = "country";

        countryInput.name = "country";
        countryInput.id = "country";
        countryInput.type = "text";

        profilePictureLabel.textContent = "Image";
        profilePictureLabel.htmlFor = "profilePicture";

        profilePicture.name = "img_file";
        profilePicture.id = "profilePicture";
        profilePicture.type = "file";
        profilePicture.accept = ".png, .jpg, .jpeg";

        submitButton.type = "submit";
        submitButton.value = "Save changes";

        this.shadow.appendChild(theForm);
        this.shadow.appendChild(userSettingsStyle);

        theForm.appendChild(usernameLabel);
        theForm.appendChild(document.createElement("br"));
        theForm.appendChild(usernameInput);
        theForm.appendChild(document.createElement("br"));

        theForm.appendChild(passwordLabel);
        theForm.appendChild(document.createElement("br"));
        theForm.appendChild(passwordInput);
        theForm.appendChild(document.createElement("br"));

        theForm.appendChild(fullnameLabel);
        theForm.appendChild(document.createElement("br"));
        theForm.appendChild(fullnameInput);
        theForm.appendChild(document.createElement("br"));

        theForm.appendChild(streetLabel);
        theForm.appendChild(document.createElement("br"));
        theForm.appendChild(streetInput);
        theForm.appendChild(document.createElement("br"));

        theForm.appendChild(cityLabel);
        theForm.appendChild(document.createElement("br"));
        theForm.appendChild(cityInput);
        theForm.appendChild(document.createElement("br"));

        theForm.appendChild(zipcodeLabel);
        theForm.appendChild(document.createElement("br"));
        theForm.appendChild(zipcodeInput);
        theForm.appendChild(document.createElement("br"));

        theForm.appendChild(countryLabel);
        theForm.appendChild(document.createElement("br"));
        theForm.appendChild(countryInput);
        theForm.appendChild(document.createElement("br"));

        theForm.appendChild(profilePictureLabel);
        theForm.appendChild(document.createElement("br"));
        theForm.appendChild(profilePicture);
        theForm.appendChild(document.createElement("br"));

        theForm.appendChild(submitButton);
    }

     prepareEdit(user) {

        this.shadow.querySelector("#fullname").value = user.full_name;
        this.shadow.querySelector("#username").value = user.username;
        this.shadow.querySelector("#street").value = user.street;
        this.shadow.querySelector("#city").value = user.city;
        this.shadow.querySelector("#zipcode").value = user.zipcode;
        this.shadow.querySelector("#country").value = user.country;

        this.shadow.querySelector('input[type="submit"]').value = "Save changes";
    }
};
customElements.define("user-settings-view", UserSettingsView);