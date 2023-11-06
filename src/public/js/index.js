// Login handler

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(loginForm);
    const obj = {};
    data.forEach((value, key) => (obj[key] = value));
    console.log(obj);
    const response = await fetch("/api/sessions/login", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // const responseData = await response.json();
    if (response.ok) window.location.replace("/");
    else alert("Ups! " + response.statusText);
  });
}

// Logout handler

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    const response = await fetch("/api/sessions/logout");
    const responseData = await response.json();
    if (responseData.status === "ok") window.location.replace("/login");
    else alert("Ups! " + responseData.message);
  });
}

// Register handler

const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(registerForm);
    const obj = {};
    data.forEach((value, key) => (obj[key] = value));
    const response = await fetch("api/sessions/register", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();
    if (responseData.status === "ok") window.location.replace("/login");
  });
}

// USER VISUALIZATION
// User role loader

const roleSelect = document.getElementById("roleSelect");

const getParam = () => {
  const url = window.location.href;
  const urlDivided = url.split("/");
  const param = urlDivided[urlDivided.length - 1];
  return param;
};

const getUser = async () => {
  const uid = getParam();
  const response = await fetch(`../api/users/${uid}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

if (roleSelect) {
  (async () => {
    const responseData = await getUser();
    const role = responseData.data.role;
    const optionToSelect = roleSelect.querySelector(`option[value=${role}]`);
    optionToSelect.selected = true;
  })();
}

// User role modifier
const updateUser = document.getElementById("updateUser");

if (updateUser) {
  updateUser.addEventListener("click", async () => {
    const uid = getParam();
    const response = await fetch(`../api/users/${uid}`, {
      method: "PUT",
      body: JSON.stringify({ newRole: roleSelect.value }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 204) alert("Usuario actualizado correctamente");
  });
}

// User delete
const deleteUser = document.getElementById("deleteUser");

if (deleteUser) {
  deleteUser.addEventListener("click", async () => {
    const uid = getParam();
    const response = await fetch(`../api/users/${uid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 204) {
      alert("Usuario eliminado correctamente");
      window.location.replace("/");
    }
  });
}

// PURCHASE
// Add to cart
const addToCartBtns = document.querySelectorAll(".addToCartBtn");

if (addToCartBtns.length !== 0) {
  const cartId = sessionStorage.getItem("cartId");
  const cartDOM = document.getElementById("cart");
  if (cartId) {
    cartDOM.innerHTML = `<a href="/carts/${cartId}">Carrito</a>`;
  }
  addToCartBtns.forEach((btn) => {
    btn.addEventListener("click", async (event) => {
      const product = event.currentTarget.parentElement;
      const productId = product.id;
      if (!cartId) {
        const newCart = { products: [{ product: productId, quantity: 1 }] };
        const response = await fetch(`../api/carts/`, {
          method: "POST",
          body: JSON.stringify(newCart),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const responseData = await response.json();
        if (responseData.status === "error") {
          return alert(
            "Debes iniciar sesión para agregar un producto al carrito"
          );
        }
        const newCartId = responseData.data._id;
        sessionStorage.setItem("cartId", newCartId);
        cartDOM.innerHTML = `<a href="/carts/${newCartId}">Carrito: 1</a>`;
      } else {
        const response = await fetch(
          `../api/carts/${cartId}/product/${productId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const responseData = await response.json();
        let amountOfProducts = 0;
        responseData.data.products.forEach((prod) => {
          if (prod.quantity) amountOfProducts += prod.quantity;
          else amountOfProducts++;
        });
        cartDOM.innerHTML = `<a href="/carts/${cartId}">Carrito: ${amountOfProducts}</a>`;
      }
      alert("Producto agregado correctamente");
    });
  });
}

// Purchase cart
const purchaseBtn = document.getElementById("purchaseBtn");
if (purchaseBtn) {
  purchaseBtn.addEventListener("click", async () => {
    const cid = getParam();
    const response = await fetch(`../api/carts/${cid}/purchase`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();
    if (responseData.status === "ok") {
      sessionStorage.removeItem("cartId");
      window.location.replace(`/ticket/${responseData.data.code}`);
    }
  });
}
