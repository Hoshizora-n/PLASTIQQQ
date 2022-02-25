import React, { useState } from "react";
import "./AddAdmin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddAdmin = () => {
    let navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            username: username,
            password: password,
        };

        axios
            .post(`http://${process.env.REACT_APP_BASE_URL}:3100/admin/admin`, {
                data: data,
            })
            .then((res) => {
                if (res.status === 201) {
                    alert(res.data.message);
                    navigate("/users/admin");
                } else alert(res.data.message);
            });
    };
    return (
        <div>
            <form>
                <div className="add-user-input-username">
                    <label htmlFor="username">Username : </label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="add-user-input-password">
                    <label htmlFor="password">Password : </label>
                    <input
                        type="text"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" onClick={handleSubmit}>
                    Add Admin
                </button>
            </form>
        </div>
    );
};

export default AddAdmin;
