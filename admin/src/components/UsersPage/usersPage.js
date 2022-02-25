import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./usersPage.css";

function UsersPage() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        axios.get(`http://${process.env.REACT_APP_BASE_URL}:3100/admin/users`).then((res) => {
            setUsers(res.data);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Username</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.user_id}>
                            <td>{index + 1}</td>
                            <td>{user.username}</td>
                            <td>
                                <button>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="add-new-user">
                <Link to="/users/add-new-user">Add New Users</Link>
            </button>
        </div>
    );
}

export default UsersPage;
