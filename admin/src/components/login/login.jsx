import React from "react";
import "./login.css";

function Login() {

    const handleSubmitForm = (e) => {
        e.preventDefault();
    }

    const handleUsernameEnter = (e) => {
        e.preventDefault();
        if (e.key === 'ArrowDown') {
            document.getElementById('password').focus();
            return false
        }
    }

    const handlePasswordEnter = (e) => {
        e.preventDefault()
        if (e.key === 'ArrowDown') {
            document.getElementById('submit').focus();
            return false
        }
    }

    const handleClick = (e) => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        if (username === 'admin' && password === 'admin') {
            window.location.href = '/dashboard';
        } else {
            e.preventDefault();
            console.log('Wrong username or password');
        }
    }

    return (
        <div className="login">
            <form onSubmit={ handleSubmitForm }>
                <h1>Login</h1>
                <div className="inputForm">
                    <div className="usernameInput" >
                        <label htmlFor="username">Username : </label>
                        <input type="text" id="username" name="username" onKeyUp={ handleUsernameEnter } />
                    </div>
                    <div className="passwordInput" >
                        <label htmlFor="password">Password : </label>
                        <input type="text" id="password" name="password" onKeyUp={ handlePasswordEnter }></input>
                    </div>
                </div>
                <button id="submit" onClick={ handleClick }>Login</button>
            </form>
        </div>
    );
}

export default Login;
