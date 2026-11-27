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
        .message-card .reply-text {
            background-color: var(--pearl);
            border-left: 3px solid var(--truffle);
            padding: 10px;
            margin: 8px 0 8px 20px;
            border-radius: 4px;
        }
            .reply-delete-button {
            background-color: transparent;
            color: var(--espresso);
            border: none;
            text-align: left;
            padding: 10px 8px;
            font-weight: normal;
            display: block;
            margin-left: auto;
        }

        .reply-delete-button:hover {
            color: #B42318;
            text-decoration: underline;
        }
        .author-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 8px; 
            flex-wrap: wrap; 
        }
        .star-button {
            background: none;
            border: none;
            padding: 2px;
            cursor: pointer;
            color: var(--espresso);
            font-size: 24px;
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
        this.shadow.appendChild(messageContainer);
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
            const authorRow = document.createElement("div");
            const messageHeading = document.createElement("h3");
            const line = document.createElement("hr");
            const messageText = document.createElement("p");
            const deleteButton = document.createElement("button");
            const messageAuthor = document.createElement("small");
            const messageRating = document.createElement("small");
            const replyForm = document.createElement("form");
            const replyInput = document.createElement("input"); 
            const threadMessages = messages.filter((item) => item.thread === message.thread);
            const firstMessage = threadMessages[threadMessages.length - 1];

             if (message.id !== firstMessage.id) {
                return;
            }
            
            deleteButton.classList.add("delete-button");
            messageCard.classList.add("message-card");
            authorRow.classList.add("author-row");
            
            messageHeading.textContent = message.heading;
            messageText.textContent = message.message;
            deleteButton.textContent = "Delete";

            const author = users.find((user) => user.id === message.user_id);
            messageAuthor.textContent = author.username;
            messageRating.textContent = author.beenz + "/5";
            if(author.beenz === null){
                messageRating.textContent = "Not rated yet"
            }

            replyInput.type = "text";
            replyInput.placeholder = "Reply...";
            replyInput.required = true;  

            const isOwnMessage = myMessages.some((myMessage) => myMessage.id === message.id);
            
            authorRow.appendChild(messageAuthor);
            authorRow.appendChild(messageRating);
            messageCard.appendChild(authorRow);
            messageCard.appendChild(messageHeading);
            messageCard.appendChild(line);
            messageCard.appendChild(messageText);

            if(!isOwnMessage){
                messageCard.appendChild(this.createUserRating());
            }


            threadMessages.reverse().forEach((reply) => {
                if (reply.id !== message.id) {
                    const replyText = document.createElement("p");
                    replyText.classList.add("reply-text");
                    const replyAuthor = users.find((user) => user.id === reply.user_id);
                    replyText.textContent = replyAuthor.username + " replied: " + reply.message;

                    const isOwnReply = myMessages.some((myMessage) => myMessage.id === reply.id);
                    if (isOwnReply) {
                        const replyDeleteButton = document.createElement("button");

                        replyDeleteButton.classList.add("reply-delete-button");
                        replyDeleteButton.textContent = "Delete";

                        replyText.appendChild(replyDeleteButton);

                        replyDeleteButton.addEventListener("click", () => {
                            const deleteReply = new CustomEvent("deletemessage", {
                                detail: reply
                            });
                            this.dispatchEvent(deleteReply);
                        });
                    }
                    messageCard.appendChild(replyText);
                }
            });
            
            replyForm.appendChild(replyInput);
            messageCard.appendChild(replyForm);

           
            if (isOwnMessage) {
                messageCard.appendChild(deleteButton);
                deleteButton.addEventListener("click", (evt) => {
                    const deleteMessage = new CustomEvent("deletemessage", {
                        detail: message
                    });
                    
                        this.dispatchEvent(deleteMessage);
                });
            }
            replyForm.addEventListener("submit", (evt) => {
                        evt.preventDefault();

                        const replyMessage = new CustomEvent("replymessage", {
                            detail: {
                                heading: message.heading,
                                message_text: replyInput.value.trim(),
                                thread: message.thread
                            }
                        });

                    if (replyInput.value.trim() === "") { //slik at man ikke kan sende tom mld
                            return;
                        }

                        this.dispatchEvent(replyMessage);
                    });                    
            this.messageContainer.appendChild(messageCard);
                
        });
    }

        createUserRating() {
            const ratingContainer = document.createElement("div");

            const ratings = [1, 2, 3, 4, 5];

            ratings.forEach((rating) => {
            const starButton = document.createElement("button");
            starButton.classList.add("star-button");
            starButton.type = "button";
            starButton.value = rating;
            starButton.textContent = "☆"; //lager 5 klikkbare knapper
            ratingContainer.appendChild(starButton);

                ratingContainer.addEventListener("click", (evt) => {
                    if (!evt.target.classList.contains("star-button")) {
                        return;
                    }

                    const selectedRating = Number(evt.target.value);

                    ratingContainer.querySelectorAll(".star-button").forEach((button) => {
                        if (Number(button.value) <= selectedRating) {
                            button.textContent = "★";
                        } else {
                            button.textContent = "☆";
                        }
                    });
                });
            });

            return ratingContainer;
        }
    
    resetForm() {
        this.shadow.querySelector("form").reset();
        this.shadow.querySelector("form").hidden = true;
    }
}
customElements.define("user-forum-view", UserForumView);