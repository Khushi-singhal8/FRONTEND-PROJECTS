
document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault(); 

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  const validUsername = "admin";
  const validPassword = "1234";

  const errorElement = document.getElementById("error");
  errorElement.textContent = ""; 

  if (!username || !password) {
    errorElement.textContent = "Please enter both username and password.";
    return;
  }

  if (username === validUsername && password === validPassword) {
    alert("Login successful!");
    
  } else {
    errorElement.textContent = "Invalid username or password.";
  }
});

