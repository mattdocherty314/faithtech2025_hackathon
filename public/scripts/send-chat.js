const HOSTNAME = "http://localhost:3000";

window.addEventListener("load", loadPage);

function loadPage() {
    let sendChatButton = document.getElementById("send-chat");
    sendChatButton.addEventListener("click", sendChat);
}

function getCookie(name) {
    let cookies = document.cookie.split("; ");

    let value = null;
    cookies.forEach(element => {
        if (element.startsWith(`${name}=`)) {
            value = element.split(`${name}=`)[1];
            return;
        }
    });
    return value;
}

function sendChat() {
    let chatsElement = document.getElementById("chat");

    let sessionID = getCookie("session");
    let chatBody = {
        session: sessionID,
        chat: document.getElementById("latest-chat").value
    }
    document.getElementById("latest-chat").value = "";

    chatsElement.innerHTML += `<div class="message user">${chatBody.chat}</div>`;
    chatsElement.innerHTML += `<div class="message bot">Thinking...</div>`;
    
    fetch(`${HOSTNAME}/api/chat`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(chatBody)
    })
    .then(response => response.json())
    .then((data) => {
        chatsElement.innerHTML = "";
        data.message.forEach((chat,i) => {
            console.log(chat);
            chatsElement.innerHTML += `<div class="message ${(i%2==0)?'user':'bot'}">${chat}</div>`;
        });
    })
}