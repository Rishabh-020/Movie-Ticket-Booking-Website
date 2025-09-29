document.addEventListener("DOMContentLoaded", () => {
    const loginFrom = document.querySelector(".login-form");
    const registerFrom = document.querySelector(".register-form");
    const loginBtn = document.querySelector("#login");
    const registerBtn = document.querySelector("#register");

    const togglePasswordIcons = document.querySelectorAll(".togglePassword");
    const passwordFields = document.querySelectorAll("input[type='password']");
    const lockIcons = document.querySelectorAll(".lockIcon");

    // Switch to login form
    loginBtn.addEventListener("click", function () {
        loginBtn.style.backgroundColor = "#090c21";
        registerBtn.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
        loginFrom.style.left = "50%";
        registerFrom.style.left = "-50%";
        loginFrom.style.opacity = 1;
        registerFrom.style.opacity = 0;
        document.querySelector(".col-1").style.borderRadius = "0 30% 30% 0";
    });

    // Switch to register form
    registerBtn.addEventListener("click", function () {
        registerBtn.style.backgroundColor = "#090c21";
        loginBtn.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
        loginFrom.style.left = "150%";
        registerFrom.style.left = "50%";
        loginFrom.style.opacity = 0;
        registerFrom.style.opacity = 1;
        document.querySelector(".col-1").style.borderRadius = "0 20% 20% 0";
    });

    // Login logic
    const Submitbtn = document.getElementById("Submit");
    Submitbtn.addEventListener("click", (e) => {
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

        alert("Login successful!");
        window.location.href = "index.html";
    });

    // Register logic
    const SignSubmit = document.getElementById("SignSubmit");
    SignSubmit.addEventListener("click", (e) => {
        e.preventDefault();
        const registerInputs = registerFrom.querySelectorAll("input");
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

        localStorage.setItem(username, JSON.stringify({ password }));
        alert("Account created successfully! You can now sign in.");
        window.location.href = "index.html";
    });

    // Password toggle for all fields
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

    // Show/hide lock & eye icon while typing
    passwordFields.forEach((field, idx) => {
        field.addEventListener("input", () => {
            if (field.value.length > 0) {
                togglePasswordIcons[idx].style.display = "block";
            } else {
                togglePasswordIcons[idx].style.display = "none";
            }
        });
    });
});
