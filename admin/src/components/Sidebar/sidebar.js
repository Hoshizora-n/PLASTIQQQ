import React from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";
import { MdDashboard } from "react-icons/md";
import { FiPackage, FiUsers } from "react-icons/fi";
import { IoMdCart } from "react-icons/io";
import { RiLogoutBoxLine } from "react-icons/ri";

const Sidebar = (props) => {
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };
    return (
        <div className="sidebar">
            <aside id={props.isHeaderOpen ? "menuOpen" : ""}>
                <div className="sidebar-header">
                    <Link to="#">PLASTIQQQ.</Link>
                </div>
                <nav>
                    <ul>
                        <Link to={"/dashboard"} id={window.location.pathname.includes("/dashboard") ? "active" : ""}>
                            <MdDashboard /> Dashboard
                        </Link>
                        <Link to={"/goods"} id={window.location.pathname.includes("/goods") ? "active" : ""}>
                            <FiPackage /> Goods
                        </Link>
                        <Link to={"/sales"} id={window.location.pathname.includes("/sales") ? "active" : ""}>
                            <IoMdCart /> Sales
                        </Link>
                        <Link to={"/users/admin"} id={window.location.pathname.includes("/users") ? "active" : ""}>
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
        </div>
    );
};

export default Sidebar;
