import React from "react";
import { useParams } from "react-router-dom";
import "./header.css";

function Header() {
    let { page } = useParams();
    page = page.slice(0, 1).toUpperCase() + page.slice(1);
    return (
        <div className="header">
            <h1>Page: {page}</h1>
        </div>
    );
}

export default Header;
