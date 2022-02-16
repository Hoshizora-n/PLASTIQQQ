import React, { useState, useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Login from "./components/Login/login";
import Sidebar from "./components/Sidebar/sidebar";
import Dashboard from "./components/Dashboard/dashboard";
import Goods from "./components/Goods/goods";
import Sales from "./components/Sales/sales";
import Users from "./components/Users/users";

function GetToken() {
    if (!localStorage.getItem("token")) return <Login />;
    else return <TokenValidation />;
}

function TokenValidation() {
    const [tokenValid, setTokenValid] = useState();
    useEffect(() => {
        axios
            .post("http://localhost:3100/admin/checkToken", {
                token: localStorage.getItem("token"),
            })
            .then((res) => {
                setTokenValid(res.data.message);
            })
            .catch((err) => console.log(err));
    }, []);

    if (tokenValid === "Token Valid") return <App />;
    else return <Login />;
}

function App() {
    return (
        <div className="App">
            <Sidebar />
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/goods" element={<Goods />} />
                <Route path="/sales" element={<Sales />} />
                <Route path="/users" element={<Users />} />
            </Routes>
        </div>
    );
}

export default GetToken;
