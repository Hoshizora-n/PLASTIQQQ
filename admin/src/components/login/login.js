import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import Swal from "sweetalert2";

const Login = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
    });

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            username: username,
            password: password,
        };

        axios
            .post(`http://${process.env.REACT_APP_BASE_URL}:3100/admin/login`, data)
            .then((res) => {
                if (res.data.message === "Login Success") {
                    localStorage.setItem("token", res.data.token);
                    window.location.href = "/";
                } else {
                    Toast.fire({
                        icon: "error",
                        title: res.data.message,
                    });
                }
            })
            .catch((err) => {
                alert(err);
            });
    };

    const handleUsernameArrowDown = (e) => {
        e.preventDefault();
        if (e.key === "ArrowDown") {
            document.getElementById("password").focus();
            return false;
        }
    };

    const handlePasswordArrowDown = (e) => {
        e.preventDefault();
        if (e.key === "ArrowDown") {
            document.getElementById("submit").focus();
            return false;
        }
    };

    return (
        <div className="login">
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div className="inputForm">
                    <div className="usernameInput">
                        <label htmlFor="username">Username : </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            onChange={handleUsernameChange}
                            onKeyUp={handleUsernameArrowDown}
                        />
                    </div>
                    <div className="passwordInput">
                        <label htmlFor="password">Password : </label>
                        <input
                            type="text"
                            id="password"
                            name="password"
                            onChange={handlePasswordChange}
                            onKeyUp={handlePasswordArrowDown}
                        ></input>
                    </div>
                </div>
                <button type="submit" id="submit">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
