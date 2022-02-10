import React from "react";
import "./login.css";

function Login() {
    return (
        <div className="login">
            <form>
                <h1>Login</h1>
                <div className="inputForm">
                    <div className="usernameInput">
                        <label htmlFor="username">Username : </label>
                        <input type="text" id="username" name="username" />
                    </div>
                    <div className="passwordInput">
                        <label htmlFor="password">Password : </label>
                        <input type="text" id="password" name="password"></input>
                    </div>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
