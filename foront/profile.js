document.getElementById('login-form').addEventListener('submit', function(event) {
   event.preventDefault();
   var username = document.getElementById('login-username').value;
   var password = document.getElementById('login-password').value;
  
   // You may want to send the username and password to the server for validation instead of hardcoding them in the client-side script.
   // Example credentials
   var correctUsername = "user";
   var correctPassword = "password";
  
   if (username === correctUsername && password === correctPassword) {
      // Simulate a successful login
      var user = {
        username: username,
        isLoggedIn: true
      };
      localStorage.setItem('user', JSON.stringify(user));
      alert('Login successful!');
      closeModal('login-modal'); // Close the login modal
      window.location.href = "index.html"; // Redirect to index.html
   } else {
      alert('Incorrect username or password.');
   }
});
