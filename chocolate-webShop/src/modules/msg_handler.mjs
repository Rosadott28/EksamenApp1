
//-----------------------------------------------------------

let messageTimer = null;
let activeMessage = null;

export function showMessage(msg) {

    clearTimeout(messageTimer)
    if (activeMessage) {
        activeMessage.remove();
    }
    const message = document.createElement("p");
    message.classList.add("notification-message");
    message.textContent = msg;
    message.setAttribute("role", "status");
    document.body.appendChild(message);
    activeMessage = message;


    messageTimer = setTimeout(() => {
        message.remove();
        activeMessage = null;
    }, 4000);

}

//-----------------------------------------------------------

// add more functions below for handling messages when needed