const socket = io("http://localhost:8000/", {
  transports: ["websocket", "polling"],
});
let audio = new Audio("web_whatsapp.mp3");
const inputmessage = document.getElementById("input_text");
const sendbtn = document.getElementById("send_button");
const name_place = document.querySelector(".name_place");
const message_place = document.querySelector(".text_place");
const message_container = document.querySelector(".messages_cont");
const append = (name, message, position) => {
  const messagebox = document.createElement("div");
  messagebox.classList.add("message");
  messagebox.classList.add(position);
  let markup = `
 <h4 class="name_h4">${name}</h4>
 <p class="message_p">${message}</p>`;
  messagebox.innerHTML = markup;
  message_container.append(messagebox);
  if (position == "left") {
    audio.play();
  }
};
sendbtn.addEventListener("click", () => {
  const message = inputmessage.value;
  append("you", message, "right");
  socket.emit("send", message);
  console.log(message);
  inputmessage.value = "";
});
let new_name;
do {
  new_name = prompt("Enter your name to join !");
} while (!new_name);
console.log(new_name);
socket.emit("user-joined", new_name);
socket.on("user-joined", (new_name) => {
  append(new_name, `😍joined in the chat room`, "left");
});
socket.on("receive", (data) => {
  // console.log(data);
  append(data.name, data.message, "left");
});
socket.on("left", (name) => {
  append(`🚫${name}`, `😒has left from chat room`, "left");
});
