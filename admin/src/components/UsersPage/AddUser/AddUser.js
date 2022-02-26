import React, { useState } from "react";
import "./AddUser.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
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
            .post(`http://${process.env.REACT_APP_BASE_URL}:3100/admin/users`, {
                data: data,
            })
            .then((res) => {
                if (res.status === 201) {
                    alert(res.data.message);
                    navigate("/users/users");
                } else alert(res.data.message);
            });
    };
    return (
        <div>
            <div>
                <h2>Add New User</h2>
            </div>
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
                    Add User
                </button>
            </form>
        </div>
    );
};

export default AddUser;
