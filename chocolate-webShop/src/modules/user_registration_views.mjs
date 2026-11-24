// ny fil fordi det er lettere å jobbe samtidig når vi har hver vår hovedfil

export class RegistrationView extends HTMLElement {
    //-----------------------------
    constructor() {
        super();

        this.shadow = this.attachShadow({ mode: "open" });
        this.shadow.innerHTML = `
        <style>
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
        }
        </style>
            <h2>Create account</h2>
            <hr>
            <form id="theForm">
                <label for="username">Email/Username</label><br>
                <input name="username" id="username" type="email" required><br>

                <label for="password">Password</label><br>
                <input name="password" id="password" type="password" required><br>

                <label for="fullname">Full name</label><br>
                <input name="fullname" id="fullname" type="text" required><br>

                <label for="street">Street</label><br>
                <input name="street" id="street" type="text" required><br>

                <label for="city">City</label><br>
                <input name="city" id="city" type="text" required><br>

                <label for="zipcode">Zip code</label><br>
                <input name="zipcode" id="zipcode" type="text" required><br>

                <label for="country">Country</label><br>
                <input name="country" id="country" type="text" required><br>

                <label for="profilePicture">Image</label><br>
                <input name="img_file" id="profilePicture" type="file" accept=".png, .jpg, .jpeg"><br><hr>
                
                <button type="button" id="cancelRegistration">Cancel</button>
                <input type="submit" value="Create account">
            </form>
        `;
        const theForm = this.shadow.querySelector("#theForm");

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
