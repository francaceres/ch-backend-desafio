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
