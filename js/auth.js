document.addEventListener("DOMContentLoaded", () => {
  const loginBtns = document.querySelectorAll(".login-btn");
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  loginBtns.forEach(btn => {
    btn.textContent = "";

    if (isLoggedIn === "true") {
      btn.textContent = "LogOut";
      btn.onclick = () => {
        localStorage.setItem("isLoggedIn", "false");
        localStorage.removeItem("username");
        window.location.reload();
      };
    } else {
      btn.textContent = "Login";
      btn.onclick = () => {
        window.location.href = "login.html";
      };
    }
  });
});