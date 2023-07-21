// Login handler

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(loginForm);
    const obj = {};
    data.forEach((value, key) => (obj[key] = value));
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
    console.log(data);
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
