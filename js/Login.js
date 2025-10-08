document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector(".login-form");
  const registerForm = document.querySelector(".register-form");
  const loginBtn = document.querySelector("#login");
  const registerBtn = document.querySelector("#register");

  const togglePasswordIcons = document.querySelectorAll(".togglePassword");
  const passwordFields = document.querySelectorAll("input[type='password']");

  // ---------- SWITCH BETWEEN FORMS ----------
  loginBtn.addEventListener("click", function () {
    loginBtn.style.backgroundColor = "#090c21";
    registerBtn.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
    loginForm.style.left = "50%";
    registerForm.style.left = "-50%";
    loginForm.style.opacity = 1;
    registerForm.style.opacity = 0;
    document.querySelector(".col-1").style.borderRadius = "0 30% 30% 0";
  });

  registerBtn.addEventListener("click", function () {
    registerBtn.style.backgroundColor = "#090c21";
    loginBtn.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
    loginForm.style.left = "150%";
    registerForm.style.left = "50%";
    loginForm.style.opacity = 0;
    registerForm.style.opacity = 1;
    document.querySelector(".col-1").style.borderRadius = "0 20% 20% 0";
  });

  // ---------- LOGIN LOGIC ----------
  const SubmitBtn = document.getElementById("Submit");
  SubmitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let user = document.getElementById("Username").value.trim();
    let pass = document.getElementById("Password").value.trim();

    if (!user || !pass) {
      alert("Please enter username and password!");
      return;
    }

    let storedUser = localStorage.getItem(user);
    if (!storedUser) {
      alert("Unauthorized Access: User does not exist!");
      return;
    }

    storedUser = JSON.parse(storedUser);
    if (storedUser.password !== pass) {
      alert("Incorrect password!");
      return;
    }

    // Save login state for header
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", user);

    alert("Login successful!");
    window.location.href = "index.html";
  });

  // ---------- REGISTER LOGIC ----------
  const SignSubmit = document.getElementById("SignSubmit");
  SignSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    const registerInputs = registerForm.querySelectorAll("input");
    let username = registerInputs[0].value.trim();
    let password = registerInputs[1].value.trim();
    let confirmPassword = document.getElementById("SignUpPassword").value.trim();

    if (!username || !password || !confirmPassword) {
      alert("All fields are required!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (localStorage.getItem(username)) {
      alert("User already exists!");
      return;
    }

    // Save user details
    localStorage.setItem(username, JSON.stringify({ password }));

    // Save login state for header
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", username);

    alert("Account created successfully! You are logged in.");
    window.location.href = "index.html";
  });

  // ---------- PASSWORD TOGGLE ----------
  togglePasswordIcons.forEach((icon, index) => {
    icon.addEventListener("click", () => {
      const field = passwordFields[index];
      if (field.type === "password") {
        field.type = "text";
        icon.classList.remove("bx-show");
        icon.classList.add("bx-hide");
      } else {
        field.type = "password";
        icon.classList.remove("bx-hide");
        icon.classList.add("bx-show");
      }
    });
  });

  // Show/hide eye icons when typing
  passwordFields.forEach((field, idx) => {
    field.addEventListener("input", () => {
      togglePasswordIcons[idx].style.display =
        field.value.length > 0 ? "block" : "none";
    });
  });
});
