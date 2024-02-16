function regisPass() {
    const username = document.getElementById('username-regis').value;
    const password = document.getElementById('password-regis').value;
    register(username, password);
}

async function register(username, password) {
    const regisData = {
        "username": username,
        "password": password
    };
    try {
        const res = await fetch('http://localhost:3000/api/v1/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(regisData),
        });
        if (res.ok) {
            const resData = await res.json();
            console.log(resData);
        } else {
            const error = await res.json();
            console.error(error);
        }
    } catch (error) {
        console.error('Error Signing Up:', error);
    }
}