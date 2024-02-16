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
      apiLogin(username, password);
      window.location.href='timeilne.html';
    }
});

async function apiLogin(username, password){
  try{
    const req = await fetch("http://localhost:3000/api/v1/auth/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "username": username,
        "password": password
      })
    });
    
    if(req.ok){
      const authToken = await req.text();
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('currentUser', username);
      console.log("Login successful. Username:", username)
      console.log('Token: ',authToken);
      window.location.href='timeline.html';
    }
    else{
      const reqError = await req.text();
      console.log('Login error: ',reqError);
      console.error(reqError);
    }
  }
  catch(reqError){
    console.error('Error occurred during login: ', reqError);
  }
}