import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./usersPage.css";

function UsersPage() {
    const [users, setUsers] = useState([]);
    const [admin, setAdmin] = useState([]);
    let { id } = useParams();
    useEffect(() => {
        axios.get(`http://${process.env.REACT_APP_BASE_URL}:3100/admin/admin`).then((res) => {
            setAdmin(res.data);
        });
        axios.get(`http://${process.env.REACT_APP_BASE_URL}:3100/admin/users`).then((res) => {
            setUsers(res.data);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className="users-page-nav">
                <Link to="/users/admin">Admin</Link>
                <Link to="/users/users">Users</Link>
            </div>

            {id === "users" ? (
                <>
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
                </>
            ) : (
                <>
                    <table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Username</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {admin.map((admin, index) => (
                                <tr key={admin.admin_id}>
                                    <td>{index + 1}</td>
                                    <td>{admin.username}</td>
                                    <td>
                                        <button disabled>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button className="add-new-admin">
                        <Link to="/users/add-new-admin">Add New Admin</Link>
                    </button>
                </>
            )}
        </>
    );
}

export default UsersPage;
