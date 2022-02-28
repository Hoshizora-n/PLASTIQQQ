import React, { useState } from "react";
import axios from "axios";
import { FiUser } from "react-icons/fi";
import "./Profile.css";

const Profile = (props) => {
    const [editUsername, setEditUsername] = useState(props.username);
    const [password, setPassword] = useState("");
    const [editPassword, setEditPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            username: props.username,
            editedUsername: editUsername,
            password: password,
            editedPassword: editPassword,
        };

        axios
            .post(`http://${process.env.REACT_APP_BASE_URL}:3100/user/editprofile`, {
                data: data,
            })
            .then((res) => {
                if (res.status === 201) {
                    alert(res.data.message);
                    localStorage.setItem("token", res.data.token);
                    window.location.reload();
                } else alert(res.data.message);
            });
    };
    return (
        <div className="profile-page">
            <div className="profile-header">
                <FiUser />
            </div>
            <h1>{props.username}</h1>
            <div className="profile-edit">
                <form>
                    <div className="profile-edit-input-username">
                        <label htmlFor="username">Username : </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            value={editUsername}
                            onChange={(e) => setEditUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="profile-edit-input-password">
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
                    <div className="profile-edit-input-newPassword">
                        <label htmlFor="newPassword">New Password : </label>
                        <input
                            type="text"
                            name="newPassword"
                            id="newPassword"
                            placeholder="Optional"
                            value={editPassword}
                            onChange={(e) => setEditPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" onClick={handleSubmit}>
                        Save Changes
                    </button>
                </form>
            </div>
            <div className="logout">
                <button
                    onClick={() => {
                        localStorage.removeItem("token");
                        window.location.reload();
                    }}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Profile;
