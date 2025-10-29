document.addEventListener("DOMContentLoaded", () => {
  const loginBtns = document.querySelectorAll(".login-btn");
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const username = localStorage.getItem("username");
  const justLoggedIn = localStorage.getItem("justLoggedIn");

  // Show welcome message only once after login
  if (justLoggedIn === "true" && username && typeof showSuccessAlert === 'function') {
    showSuccessAlert(`Welcome back, ${username}!`);
    localStorage.removeItem("justLoggedIn");
  }

  loginBtns.forEach(btn => {
    btn.textContent = "";

    if (isLoggedIn === "true") {
      btn.textContent = "LogOut";
      btn.onclick = () => {
        // Logout immediately without confirmation
        if (typeof showSuccessAlert === 'function') {
          showSuccessAlert(`Goodbye, ${username}! You have been logged out.`, () => {
            localStorage.setItem("isLoggedIn", "false");
            localStorage.removeItem("username");
            window.location.reload();
          });
        } else {
          localStorage.setItem("isLoggedIn", "false");
          localStorage.removeItem("username");
          alert(`Goodbye, ${username}! You have been logged out.`);
          window.location.reload();
        }
      };
    } else {
      btn.textContent = "Login";
      btn.onclick = () => {
        window.location.href = "login.html";
      };
    }
  });
});