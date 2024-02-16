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

//Register
async function regis(username, password){
    try{
      const req = await fetch("http://localhost:3000/api/v1/auth/register", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "username": username,
          "password": password
        })
      });
      if (req.ok){
        const reqData = await req.json();
        console.log("User created: ", reqData);
        window.location.href='login-index.html';
      }
      else{
        const reqError = await req.json();
        throw(reqError);
      }
    }
    catch(reqError){
      console.error('Error occurred during registration: ', reqError);
    }
  }