import React from "react";
import "./login.css";

function Login() {

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
            <form action="http://localhost:3100/admin" method="POST">
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
                <button id="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
