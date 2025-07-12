document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const errorMsg = document.getElementById("error");

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    console.log("Username:", username);  // Debug output
    console.log("Password:", password);  // Debug output

    if (username === "admin" && password === "1234") {
      errorMsg.textContent = "";
      alert("Login successful!");
    } else {
      errorMsg.textContent = "Invalid username or password.";
    }
  });
});
