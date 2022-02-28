import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Login from "./components/Login/login";
import Loading from "./components/Loading/Loading";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import Checkout from "./components/Checkout/Checkout";

const GetToken = () => {
    if (!localStorage.getItem("token")) return <Login />;
    else return TokenValidation();
};

const TokenValidation = () => {
    const [tokenValid, setTokenValid] = useState();
    const [username, setUsername] = useState();
    let navigate = useNavigate();

    useEffect(() => {
        let route = ["/home", "/profile", "/checkout"];
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

function App(props) {
    const [cart, setCart] = useState([]);

    return (
        <div className="App">
            <Header />
            <main>
                <Routes>
                    <Route path="/home" element={<Home username={props.username} setCart={setCart} />} />
                    <Route path="/profile" element={<Profile username={props.username} />} />
                    <Route path="/checkout" element={<Checkout cart={cart} username={props.username} />} />
                </Routes>
            </main>
        </div>
    );
}

export default GetToken;
