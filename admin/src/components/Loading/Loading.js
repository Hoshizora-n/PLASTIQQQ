import React from "react";
import "./loading.css";

function Loading() {
    return (
        <div className="loadingContainer">
            <div className="loading"></div>
            <div>Authenticating</div>
        </div>
    );
}

export default Loading;
