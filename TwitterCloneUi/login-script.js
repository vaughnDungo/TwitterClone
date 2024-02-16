async function logIn() {
    const username = document.getElementById('username-log').value;
    const password = document.getElementById('password-log').value;
    sendDatatoLS(username, password);
}

async function sendDatatoLS(username, password) {
    const res = await fetch("http://localhost:3000/api/v1/auth/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'username': username,
            'password': password
        })
    })
    if (res.ok) {
        const token = await res.text();
        localStorage.setItem('token', token);
        window.location.href = "timeline.html";
    } else {
        alert('Incorrect Username/Password.')
        const error = await res.json();
        console.error(error);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.getElementById("login-button");

    loginButton.addEventListener("click", async function (event) {
        event.preventDefault(); // Prevent the default form submission
        await logIn(); // Call the login function when the button is clicked
    });
});