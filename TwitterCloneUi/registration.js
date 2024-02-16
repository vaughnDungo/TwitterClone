const signupForm = document.getElementById('regisform');

signupForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === '' || password === '') {
        alert('Please fill in all fields');
        return;
    }
    else{
      regis(username, password);
      console.log('register');
    }
});
async function regis(username, password) {
  try {
    const response = await fetch("http://localhost:3000/api/v1/auth/register", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      if (response.ok) {
        const data = await response.json();
        console.log("User created:", data);
        window.location.href = 'login-index.html';
      } else {
        const error = await response.text();
        console.error('Registration error:', error);
      }
    } else {
      const message = await response.text();
      console.log(message);
    }
  } catch (error) {
    console.error('Error occurred during registration:', error);
  }
}
