import React from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };
    return (
        <aside>
            <nav>
                <ul>
                    <Link to={"/dashboard"}>Dashboard</Link>
                    <Link to={"/goods"}>Goods</Link>
                    <Link to={"/sales"}>Sales</Link>
                    <Link to={"/users"}>Users</Link>
                </ul>
            </nav>
            <div className="logout">
                <button onClick={handleLogout}>Logout</button>
            </div>
        </aside>
    );
};

export default Sidebar;
