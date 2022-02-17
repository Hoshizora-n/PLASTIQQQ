import React from "react";
import { useParams } from "react-router-dom";
import "./header.css";

function Header() {
    let { page } = useParams();
    return (
        <div className="header">
            <h1>Page: {page}</h1>
        </div>
    );
}

export default Header;
