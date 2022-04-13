import React, { useState } from "react";
import "../add.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddAdmin = () => {
    let navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
    });

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
                    Toast.fire({
                        icon: "success",
                        title: res.data.message,
                    });
                    navigate("/users/admin");
                } else {
                    Toast.fire({
                        icon: "error",
                        title: res.data.message,
                    });
                }
            });
    };
    return (
        <div className="add-container">
            <form>
                <h2>Add New Admin</h2>
                <div className="add-admin-input-username">
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
                <div className="add-admin-input-password">
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
