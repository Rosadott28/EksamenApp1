export class LoginView extends HTMLElement {
constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
        
        const loginStyle = document.createElement("style");
        const loginform = document.createElement("form");
        const loginBox = document.createElement("div");
        const loginHeading = document.createElement("h2");
        const usernameLabel = document.createElement("label");
        const usernameInput = document.createElement("input");
        const passwordLabel = document.createElement("label");
        const passwordInput = document.createElement("input");
        const loginButton = document.createElement("button");
        const cancelButton = document.createElement("button");

        usernameLabel.textContent = "Username";
        passwordLabel.textContent = "Password";
        loginButton.textContent = "Login";
        cancelButton.textContent = "Cancel";
        loginHeading.textContent = "Login";
        loginStyle.textContent = ` 
            #loginBox button {
                background-color: #8EA7C1;
                color: white;
                padding: 14px 20px;
                margin: 8px 0;
                border: none;
                cursor: pointer;
                width: 100%;
            }

            #loginBox button:hover {
                opacity: 0.8;
            }

           #loginForm {
                width: 80%;
                max-width: 500px;
                margin: 100px auto;
                padding: 16px;
            }

            #loginBox {
                padding: 50px;
                background-color: var(--ivory);
                border-radius: 12px;
                display: flex;
                flex-direction: column;
                gap: 12px;
            }

            #loginBox input {
                height: 40px;
                width: 100%;
                font-size: 16px;
                box-sizing: border-box;
                color: var(--truffle);
            }

            #loginBox h2 {
                font-size: 24px;
                font-weight: bold;
                text-align: center;
                margin-bottom: 20px;
                color: var(--espresso);
            }

            #loginBox label {
                font-size: 16px;
                color: var(--espresso);
            }
        }`;

        loginform.id = "loginForm";
        loginBox.id = "loginBox";
        usernameInput.id = "username";
        usernameInput.name = "username";
        usernameInput.type = "email";
        usernameInput.required = true;
        passwordInput.id = "password";
        passwordInput.name = "password";
        passwordInput.type = "password";
        passwordInput.required = true;
        usernameLabel.htmlFor = "username";
        passwordLabel.htmlFor = "password"
        loginButton.type = "submit";
        cancelButton.type = "button"

        loginform.appendChild(loginBox);
        loginBox.appendChild(loginHeading);
        loginBox.appendChild(usernameLabel);
        loginBox.appendChild(usernameInput);
        loginBox.appendChild(passwordLabel);
        loginBox.appendChild(passwordInput);
        loginBox.appendChild(loginButton);
        loginBox.appendChild(cancelButton);

        this.shadow.appendChild(loginform);
        this.shadow.appendChild(loginStyle);
        
        const loginForm = this.shadow.querySelector("#loginForm");

        loginForm.addEventListener("submit", (evt) => {
            evt.preventDefault();

            const username = usernameInput.value;
            const password = passwordInput.value;

            const loginUser= new CustomEvent("loginuser");
            loginUser.username = username;
            loginUser.password = password;
            
            this.dispatchEvent(loginUser);
            // sender username og password til api funksjonen
        });

        cancelButton.addEventListener("click", (evt) => {
            loginForm.reset();
            this.dispatchEvent(new CustomEvent("cancelLogin"));
        });

    };

    resetForm() {
        this.shadow.querySelector("#loginForm").reset();

    }
}
customElements.define("login-view", LoginView);




