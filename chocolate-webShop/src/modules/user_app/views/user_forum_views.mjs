import { showMessage } from "../../msg_handler.mjs";

export class UserForumView extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });

        const heading = document.createElement("h2");
        heading.textContent = "Sukkergris Forum";
        this.shadow.appendChild(heading);

        const newPostButton = document.createElement("button");
        newPostButton.textContent = "New Post";
        newPostButton.type = "button";
        this.shadow.appendChild(newPostButton);

        const messageContainer = document.createElement("div");
        this.messageContainer = messageContainer;
        this.shadow.appendChild(messageContainer);

        const forumStyle = document.createElement("style")
        const theForm = document.createElement("form");
        const headingLabel = document.createElement("label");
        const headingInput = document.createElement("input");
        const messageLabel = document.createElement("label");
        const messageInput = document.createElement("textarea");
        const publishButton = document.createElement("button");

        forumStyle.textContent = `
            
            form[hidden] {
            display: none;
        }

        form input,
        form textarea {
            width: 100%;
            padding: 8px;
            font: inherit;
            box-sizing: border-box;
            background-color: var(--ivory);
            color: var(--espresso);
            border: 1px solid var(--truffle);
            border-radius: var(--radius);
        }

        form textarea {
            min-height: 120px;
            resize: vertical;
        }
        .message-card {
            background-color: var(--ivory);
            border: 1px solid var(--truffle);
            border-radius: var(--radius);
            padding: 16px;
            margin: 16px 0;
        }

        .message-card h3 {
            color: var(--cocoa);
            font-size: 24px;
            margin: 0 0 8px;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
        }

        .message-card p {
            color: var(--espresso);
            margin: 0;
            flex: 1;
        }
        .delete-button {
            border-radius: 999px;
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
            margin-top: 12px;
            margin-right: 8px;
            background-color: var(--ivory);
            border: 2px solid #B42318;
            color: #B42318 ;
            display: block;
            margin-left: auto;
        }

        `;

        theForm.hidden = true;
        headingInput.name = "heading";
        messageInput.name = "message_text";
        headingInput.required = true;
        messageInput.required = true;
        publishButton.type = "submit";

        headingLabel.htmlFor = "heading";
        messageLabel.htmlFor = "message";
        headingInput.id = "heading"
        messageInput.id = "message";

        headingLabel.textContent = "Heading";
        messageLabel.textContent = "Message";
        publishButton.textContent = "Publish";

        theForm.appendChild(headingLabel);
        theForm.appendChild(headingInput);
        theForm.appendChild(messageLabel);
        theForm.appendChild(messageInput);
        theForm.appendChild(publishButton);
        this.shadow.appendChild(theForm);
        this.shadow.appendChild(forumStyle);

        newPostButton.addEventListener("click",(evt) => { 
            theForm.hidden = !theForm.hidden;

        })

        theForm.addEventListener("submit", (evt) => {
            evt.preventDefault();

            const formData = new FormData(theForm);    

            const publishMessage = new CustomEvent("publishmessage");
            publishMessage.messageForm = formData;
            this.dispatchEvent(publishMessage);
        });
    }

        refresh(messages, myMessages, users) {
            this.messageContainer.replaceChildren(); //slik at nettsiden kun viser mld en gang
            if (messages.length === 0) {
            const noMessages = document.createElement("p");
            noMessages.textContent = "No messages yet. Be the first to post!"
            this.messageContainer.appendChild(noMessages);
            return;
            }

            messages.forEach((message) => {
            const messageCard = document.createElement("div");
            const messageHeading = document.createElement("h3");
            const line = document.createElement("hr");
            const messageText = document.createElement("p");
            const deleteButton = document.createElement("button");
            const messageAuthor = document.createElement("small");
            
            deleteButton.classList.add("delete-button");
            messageCard.classList.add("message-card");
            
            messageHeading.textContent = message.heading;
            messageText.textContent = message.message;
            deleteButton.textContent = "Delete";

            const author = users.find((user) => user.id === message.user_id);
            messageAuthor.textContent = author.username ;
        
            
            messageCard.appendChild(messageAuthor);
            messageCard.appendChild(messageHeading);
            messageCard.appendChild(line);
            messageCard.appendChild(messageText);

            const isOwnMessage = myMessages.some((myMessage) => myMessage.id === message.id);
            if (isOwnMessage) {
                messageCard.appendChild(deleteButton);
                deleteButton.addEventListener("click", (evt) => {
                    const deleteMessage = new CustomEvent("deletemessage", {
                        detail: message
                    });
                    this.dispatchEvent(deleteMessage);
                });
            }
            this.messageContainer.appendChild(messageCard);
                
        });
    }
    resetForm() {
        this.shadow.querySelector("form").reset();
        this.shadow.querySelector("form").hidden = true;
    }
}
customElements.define("user-forum-view", UserForumView);