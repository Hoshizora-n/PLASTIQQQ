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
import UsersPage from "./components/UsersPage/usersPage";
import Loading from "./components/Loading/Loading";
import Profile from "./components/Profile/Profile";
import AddUser from "./components/UsersPage/AddUser/AddUser";
import AddAdmin from "./components/UsersPage/AddAdmin/AddAdmin";
import AddGoods from "./components/Goods/AddGoods/AddGoods";
import EditGoods from "./components/Goods/EditGoods/EditGoods";
import DetailSales from "./components/Sales/DetailedSales/DetailSales";

const GetToken = () => {
    if (!localStorage.getItem("token")) return <Login />;
    else return TokenValidation();
};

const TokenValidation = () => {
    const [tokenValid, setTokenValid] = useState();
    const [username, setUsername] = useState();
    let navigate = useNavigate();

    useEffect(() => {
        let route = [
            "/dashboard",
            "/goods",
            "/goods/add-new-goods",
            "/sales",
            "/users",
            "/users/admin",
            "/users/users",
            "/users/add-new-admin",
            "/users/add-new-user",
            "/profile",
        ];
        if (!route.includes(window.location.pathname)) navigate("/dashboard");
        setTimeout(() => {
            axios
                .post(`http://${process.env.REACT_APP_BASE_URL}:3100/admin/checkToken`, {
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

const App = (props) => {
    const [isHeaderOpen, setIsHeaderOpen] = useState(false);
    const [fakturClickedData, setFakturClickedData] = useState({});
    return (
        <div className="App">
            <Sidebar isHeaderOpen={isHeaderOpen} />
            <main>
                <Header onToggle={setIsHeaderOpen} username={props.username} />
                <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/goods" element={<Goods />} />
                    <Route path="/goods/add-new-goods" element={<AddGoods />} />
                    <Route path="/goods/edit" element={<EditGoods />} />
                    <Route path="/sales" element={<Sales setFakturClickedData={setFakturClickedData} />} />
                    <Route path="/sales/:id" element={<DetailSales fakturClickedData={fakturClickedData} />} />
                    <Route path="/users/:id" element={<UsersPage username={props.username} />} />
                    <Route path="/users/add-new-user" element={<AddUser />} />
                    <Route path="/users/add-new-admin" element={<AddAdmin />} />
                    <Route path="/profile" element={<Profile username={props.username} />} />
                </Routes>
            </main>
        </div>
    );
};

export default GetToken;
