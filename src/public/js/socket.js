const socket = io();

socket.on("productUpdate", (data) => {
  const productsContainer = document.querySelector(".productsContainer");
  let products = "";
  data.forEach((prod) => {
    products += `<div class="product">
    <h2>${prod.id} - ${prod.title}</h2>
    <p>${prod.description}</p>
    <h3>$${prod.price}</h3>
    <h3>Code: ${prod.code}</h3>
    <h3>Stock: ${prod.stock}</h3></div>`;
  });
  productsContainer.innerHTML = products;
});

let user;
let chatBox = document.getElementById("chatBox");
let chatBoxInput = document.getElementById("chatBoxInput");

Swal.fire({
  title: "Por favor ingresá tu email",
  input: "email",
  text: "Email:",
  inputValidator: (value) => {
    if (!value) {
      return "El email no debe estar vacío";
    }
  },
  allowOutsideClick: false,
}).then((result) => {
  user = result.value;
  socket.emit("login", {});
});

chatBox.addEventListener("submit", (e) => {
  e.preventDefault();
  socket.emit("message", { user, message: chatBoxInput.value });
  chatBoxInput.value = "";
});

socket.on("messageLogs", (data) => {
  let messageLogs = document.getElementById("messageLogs");
  let messages = "";
  data.forEach((message) => {
    messages += `<p><strong>${message.user}: </strong>${message.message}</p>`;
  });
  messageLogs.innerHTML = messages;
});
