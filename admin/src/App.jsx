import React from "react";
import "./App.css";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./components/Login/login";
import Header from "./components/Header/header";
import Sidebar from "./components/Sidebar/sidebar";
import Dashboard from "./components/Dashboard/dashboard";
import Goods from "./components/Goods/goods";
import Sales from "./components/Sales/sales";
import Users from "./components/Users/users";

function App() {
    return (
        <div className="App">
            <Login/>
            {/* <main>
                <Router>
                    <Sidebar/>
                    <Routes>
                        <Route path="/" element={<Dashboard/>} />
                        <Route path="/goods" element={<Goods/>} />
                        <Route path="/sales" element={<Sales/>} />
                        <Route path="/users" element={<Users/>} />
                    </Routes>
                </Router>
            </main> */}
        </div>
    );
}

export default App;
