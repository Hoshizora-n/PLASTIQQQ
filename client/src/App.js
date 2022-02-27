import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Login from "./components/Login/login";
import Loading from "./components/Loading/Loading";

const GetToken = () => {
    if (!localStorage.getItem("token")) return <Login />;
    else return TokenValidation();
};

const TokenValidation = () => {
    const [tokenValid, setTokenValid] = useState();
    const [username, setUsername] = useState();
    let navigate = useNavigate();

    useEffect(() => {
        let route = ["/home", "/profile", "checkout"];
        if (!route.includes(window.location.pathname)) navigate("/home");
        setTimeout(() => {
            axios
                .post(`http://${process.env.REACT_APP_BASE_URL}:3100/user/checkToken`, {
                    token: localStorage.getItem("token"),
                })
                .then((res) => {
                    let username = res.data.username;
                    setUsername(username);
                    setTokenValid(res.data.message);
                })
                .catch((err) => console.log(err));
        }, 1000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (tokenValid === undefined) return <Loading />;
    if (tokenValid === "Token Valid") return <App username={username} />;
    else return <Login />;
};

function App() {
    return (
        <div className="App">
            <h3>Yo</h3>
        </div>
    );
}

export default GetToken;
