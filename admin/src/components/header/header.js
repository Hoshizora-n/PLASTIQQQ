import React, { useState } from "react";
import "./header.css";
import { FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";

const Header = (props) => {
    let [isOpen, setIsOpen] = useState(false);

    const menuOpen = () => {
        props.onToggle(!isOpen);
        setIsOpen(!isOpen);
    };

    return (
        <div className="header">
            <h2> Hello, {props.username}</h2>
            <div className="user-icon">
                <Link to="/profile">
                    <FiUser />
                </Link>
            </div>
            <div className="menu-bar-container">
                <div className="menu-bar" onClick={menuOpen}>
                    <span className={isOpen ? "open" : ""}></span>
                    <span></span>
                    <span className={isOpen ? "open" : ""}></span>
                </div>
            </div>
        </div>
    );
};

export default Header;
