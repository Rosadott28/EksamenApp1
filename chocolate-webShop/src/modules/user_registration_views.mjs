

export class RegistrationView extends HTMLElement {
    //-----------------------------
    constructor() {
        super();

        this.shadow = this.attachShadow({ mode: "open" });

        const registrationStyle = document.createElement("style");
        const heading = document.createElement("h2");
        const line = document.createElement("hr");
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
        const cancelRegistration = document.createElement("button");
        const submitButton = document.createElement("input");

        registrationStyle.textContent = `
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

            button[type="button"],
            input[type="submit"] {
                border-radius: 999px;
                padding: 10px 20px;
                font-size: 16px;
                cursor: pointer;
                margin-top: 12px;
            }

            button[type="button"] {
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

        heading.textContent = "Create account";
        theForm.id = "theForm";

        usernameLabel.textContent = "Email/Username";
        usernameLabel.htmlFor = "username";

        usernameInput.name = "username";
        usernameInput.id = "username";
        usernameInput.type = "email";
        usernameInput.required = true;

        passwordLabel.textContent = "Password";
        passwordLabel.htmlFor = "password";

        passwordInput.name = "password";
        passwordInput.id = "password";
        passwordInput.type = "password";
        passwordInput.required = true;

        fullnameLabel.textContent = "Full name";
        fullnameLabel.htmlFor = "fullname";

        fullnameInput.name = "fullname";
        fullnameInput.id = "fullname";
        fullnameInput.type = "text";
        fullnameInput.required = true;

        streetLabel.textContent = "Street";
        streetLabel.htmlFor = "street";

        streetInput.name = "street";
        streetInput.id = "street";
        streetInput.type = "text";
        streetInput.required = true;

        cityLabel.textContent = "City";
        cityLabel.htmlFor = "city";

        cityInput.name = "city";
        cityInput.id = "city";
        cityInput.type = "text";
        cityInput.required = true;

        zipcodeLabel.textContent = "Zip code";
        zipcodeLabel.htmlFor = "zipcode";

        zipcodeInput.name = "zipcode";
        zipcodeInput.id = "zipcode";
        zipcodeInput.type = "text";
        zipcodeInput.required = true;

        countryLabel.textContent = "Country";
        countryLabel.htmlFor = "country";

        countryInput.name = "country";
        countryInput.id = "country";
        countryInput.type = "text";
        countryInput.required = true;

        profilePictureLabel.textContent = "Image";
        profilePictureLabel.htmlFor = "profilePicture";

        profilePicture.name = "img_file";
        profilePicture.id = "profilePicture";
        profilePicture.type = "file";
        profilePicture.accept = ".png, .jpg, .jpeg";

        cancelRegistration.textContent = "Cancel";
        cancelRegistration.type = "button";
        cancelRegistration.id = "cancelRegistration";

        submitButton.type = "submit";
        submitButton.value = "Create account";


        this.shadow.appendChild(registrationStyle);
        this.shadow.appendChild(heading);
        this.shadow.appendChild(line);
        this.shadow.appendChild(theForm);

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

       theForm.appendChild(document.createElement("hr")); 
        theForm.appendChild(cancelRegistration);
        theForm.appendChild(submitButton);

        theForm.addEventListener("submit", (evt) => {
            evt.preventDefault();

            const formData = new FormData(theForm);

            const registerUser = new CustomEvent("registeruser");
            registerUser.userForm = formData;
            this.dispatchEvent(registerUser);
            // sender skjema data til user_main.mjs
        });

        this.shadow.querySelector("#cancelRegistration").addEventListener("click", (evt) => {
            theForm.reset();
            this.dispatchEvent(new CustomEvent("cancelRegistration"));
        });

    }
    
    resetForm() {
        this.shadow.querySelector("#theForm").reset();

    }
};
//===============================================
customElements.define("registration-view", RegistrationView);
