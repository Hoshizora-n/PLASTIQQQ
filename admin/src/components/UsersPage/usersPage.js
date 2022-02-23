import React from "react";
import { Link } from "react-router-dom";
import "./usersPage.css";

function UsersPage() {
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
                    <tr>
                        <td>1</td>
                        <td>admin</td>
                        <td>
                            <button>Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button className="add-new-user">
                <Link to="/users/add-new-user">Add New Users</Link>
            </button>
        </div>
    );
}

export default UsersPage;
