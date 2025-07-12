document.addEventListener("DOMContentLoaded", () => {
  const loginBox = document.getElementById("loginBox");
  const loginForm = document.getElementById("loginForm");

  loginBox.addEventListener("click", () => {
    loginForm.classList.add("active");
  });
});
