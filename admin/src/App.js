import React, { useState, useEffect } from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";
import Login from "./components/Login/login";
import Sidebar from "./components/Sidebar/sidebar";
import Header from "./components/Header/header";
import Dashboard from "./components/Dashboard/dashboard";
import Goods from "./components/Goods/goods";
import Sales from "./components/Sales/sales";
import Users from "./components/Users/users";
import Loading from "./components/Loading/Loading";

const GetToken = () => {
    if (!localStorage.getItem("token")) return <Login />;
    else return <TokenValidation />;
};

const TokenValidation = () => {
    const [tokenValid, setTokenValid] = useState();
    const [username, setUsername] = useState();
    let navigate = useNavigate();

    useEffect(() => {
        navigate("/dashboard");
        setTimeout(() => {
            axios
                .post("http://192.168.0.106:3100/admin/checkToken", {
                    token: localStorage.getItem("token"),
                })
                .then((res) => {
                    setUsername(res.data.username);
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

const App = (props) => {
    const [isHeaderOpen, setIsHeaderOpen] = useState(false);
    return (
        <div className="App">
            <Sidebar isHeaderOpen={isHeaderOpen} />
            <main>
                <Header onToggle={setIsHeaderOpen} username={props.username} />
                <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/goods" element={<Goods />} />
                    <Route path="/sales" element={<Sales />} />
                    <Route path="/users" element={<Users />} />
                </Routes>
            </main>
        </div>
    );
};

export default GetToken;
