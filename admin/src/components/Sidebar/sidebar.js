import React from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";
import { MdDashboard } from "react-icons/md";
import { FiPackage, FiUsers } from "react-icons/fi";
import { IoMdCart } from "react-icons/io";
import { RiLogoutBoxLine } from "react-icons/ri";

const Sidebar = () => {
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };
    return (
        <aside>
            <nav>
                <ul>
                    <Link to={"/dashboard"}>
                        <MdDashboard /> Dashboard
                    </Link>
                    <Link to={"/goods"}>
                        <FiPackage /> Goods
                    </Link>
                    <Link to={"/sales"}>
                        <IoMdCart /> Sales
                    </Link>
                    <Link to={"/users"}>
                        <FiUsers /> Users
                    </Link>
                </ul>
            </nav>
            <div className="logout">
                <button onClick={handleLogout}>
                    <RiLogoutBoxLine /> Logout
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
