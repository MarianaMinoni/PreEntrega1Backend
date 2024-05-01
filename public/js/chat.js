const socket = io();

const textInput = document.querySelector("#text-input");
const showText = document.querySelector("#show-text");
const chatInput = document.querySelector("#chat-message");
const allMessages = document.querySelector("#all-messages");

textInput.addEventListener("input", () => {
    socket.emit("message", textInput.value);
});

socket.on("messageShow", data => {
    showText.textContent = data;
});

socket.on("allMessages", data => {
    let chat = "";

    for (let item of data) {
        chat += `<b>${item.socketId}:</b> ${item.message}<br>`
    }

    allMessages.innerHTML = chat;
});

function send() {
    socket.emit("chatMessage", chatInput.value);
    chatInput.value = "";
}





//chat viejo


//chat2


// const textInput = document.querySelector("#text-input");
// const showText = document.querySelector("#show-text");
// //const chatInput = document.querySelector("#chat-message");
// const allMessages = document.querySelector("#all-messages");
// const chatInput = document.querySelector("#chat-message");



// textInput.addEventListener("input", () => {
//     socket.emit("message", textInput.value);
//     console.log(textInput.value);
// });


// socket.on("messageShow", data => {
//     showText.textContent = data;
// });

// socket.on("allMessages", data => {
//     let chat = "";

//     for (let item of data) {
//         chat += `<b>${item.socketId}:</b> ${item.message}<br>`;
//     }

//     allMessages.innerHTML = chat;
// });

//  function send() {
//    socket.emit("chatMessage", chatInput.value);
//    chatInput.value = "";
// }

// document.addEventListener("DOMContentLoaded", function() {
//           document.querySelector("#button-chat").addEventListener("click", send());
//       });

