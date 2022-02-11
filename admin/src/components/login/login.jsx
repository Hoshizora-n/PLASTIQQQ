import React from "react";
import "./login.css";
import axios from "axios";

function Login() {

    const handleSubmit = (e) => {
        e.preventDefault()
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const data = {
            username: username,
            password: password
        };

        axios.post("http://localhost:3100/admin", data)
        .then(res => {
            alert(res.data.message);
        })
        .catch(err => {
            alert(err);
        })
    }

    const handleUsernameArrowDown = (e) => {
        e.preventDefault();
        if (e.key === 'ArrowDown') {
            document.getElementById('password').focus();
            return false
        }
    }

    const handlePasswordArrowDown = (e) => {
        e.preventDefault()
        if (e.key === 'ArrowDown') {
            document.getElementById('submit').focus();
            return false
        }
    }

    return (
        <div className="login">
            <form method="POST" onSubmit={ handleSubmit }>
                <h1>Login</h1>
                <div className="inputForm">
                    <div className="usernameInput" >
                        <label htmlFor="username">Username : </label>
                        <input type="text" id="username" name="username" onKeyUp={ handleUsernameArrowDown } />
                    </div>
                    <div className="passwordInput" >
                        <label htmlFor="password">Password : </label>
                        <input type="text" id="password" name="password" onKeyUp={ handlePasswordArrowDown }></input>
                    </div>
                </div>
                <button type="submit" id="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
