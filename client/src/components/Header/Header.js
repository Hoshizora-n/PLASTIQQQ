import React from "react";
import { Link } from "react-router-dom";
import { FiUser, FiShoppingCart, FiHome } from "react-icons/fi";
import "./Header.css";

const Header = () => {
    return (
        <div className="header-container">
            <h2>Plastiqqq.</h2>
            <Link to="/home" className={window.location.pathname === "/home" ? "active" : ""}>
                <FiHome />
            </Link>
            <Link to="/checkout" className={window.location.pathname === "/checkout" ? "active" : ""}>
                <FiShoppingCart />
            </Link>
            <Link to="/profile" className={window.location.pathname === "/profile" ? "active" : ""}>
                <FiUser />
            </Link>
        </div>
    );
};

export default Header;
