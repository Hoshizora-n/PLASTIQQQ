import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./usersPage.css";

function UsersPage(props) {
    let [users, setUsers] = useState([]);
    let [admin, setAdmin] = useState([]);
    let { id } = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://${process.env.REACT_APP_BASE_URL}:3100/admin/admin`).then((res) => {
            setAdmin((previousValue) => {
                return (previousValue = res.data);
            });
        });
        axios.get(`http://${process.env.REACT_APP_BASE_URL}:3100/admin/users`).then((res) => {
            setUsers((previousValue) => {
                return (previousValue = res.data);
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = (e) => {
        const parentElement = e.target.parentElement.parentElement;
        const id = parentElement.getAttribute("id");
        // const name = parentElement.getAttribute("name");
        const role = parentElement.getAttribute("role");
        axios.delete(`http://${process.env.REACT_APP_BASE_URL}:3100/admin/${role}/${id}`).then((res) => {
            if (res.data.message === "User Deleted" || res.data.message === "Admin Deleted") {
                alert(res.data.message);
                window.location.reload();
            } else {
                alert(res.data.message);
            }
        });
    };

    return (
        <>
            <div className="users-page-nav">
                <Link to="/users/admin">Admin</Link>
                <Link to="/users/users">Users</Link>
            </div>

            {id === "admin" ? (
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
                                // eslint-disable-next-line jsx-a11y/aria-role
                                <tr key={admin.admin_id} role="admin" id={admin.admin_id} name={admin.username}>
                                    <td>{index + 1}</td>
                                    <td>{admin.username}</td>
                                    <td>
                                        <button
                                            disabled
                                            // disabled={props.username === admin.username ? false : true}
                                            onClick={handleDelete}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button className="add-new-admin">
                        <Link to="/users/add-new-admin">Add New Admin</Link>
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
                            {users.map((user, index) => (
                                // eslint-disable-next-line jsx-a11y/aria-role
                                <tr key={user.user_id} role="users" id={user.user_id} name={user.username}>
                                    <td id={user.user_id}>{index + 1}</td>
                                    <td id={user.username}>{user.username}</td>
                                    <td>
                                        <button onClick={handleDelete}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button className="add-new-user">
                        <Link to="/users/add-new-user">Add New Users</Link>
                    </button>
                </>
            )}
        </>
    );
}

export default UsersPage;
