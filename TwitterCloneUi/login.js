const loginForm = document.getElementById('loginform');

loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === '' || password === '') {
        alert('Please fill in all fields');
        return;
    }
    else{
      login(username, password);
    }
});

async function login(username, password) {
  try {
    const response = await fetch("http://localhost:3000/api/v1/auth/login", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    if (response.ok) {
      const authToken = await response.text();
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('currentUser', username);
      console.log("Login successful. Username:", username);
      console.log('Token: ', authToken);
      window.location.href = 'timeline.html';
    } else {
      const errorMessage = await response.text();
      console.error('Login error:', errorMessage);
    }
  } catch (error) {
    console.error('Error occurred during login:', error);
  }
}
