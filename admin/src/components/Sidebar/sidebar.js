import React from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

const Sidebar = ({ logout }) => {
    console.log("hello from sidebar");
    return (
        <aside>
            <nav>
                <ul>
                    <Link to={"/"}>Dashboard</Link>
                    <Link to={"/goods"}>Goods</Link>
                    <Link to={"/sales"}>Sales</Link>
                    <Link to={"/users"}>Users</Link>
                </ul>
            </nav>
            <div className="logout">
                <button onClick={logout}>Logout</button>
            </div>
        </aside>
    );
};

export default Sidebar;
