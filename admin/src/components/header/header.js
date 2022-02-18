import React, { useState } from "react";
import "./header.css";

const Header = (props) => {
    let [isOpen, setIsOpen] = useState(false);

    const menuOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="header">
            <h1>Hello, {props.username}</h1>
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
