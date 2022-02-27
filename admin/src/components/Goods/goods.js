import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./goods";

function Goods() {
    let [admin, setAdmin] = useState([]);

    useEffect(() => {
        axios.get(`http://${process.env.REACT_APP_BASE_URL}:3100/admin/admin`).then((res) => {
            setAdmin((previousValue) => {
                return (previousValue = res.data);
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = (e) => {
        const parentElement = e.target.parentElement.parentElement;
        console.log(parentElement);
    };

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
                    {admin.map((admin, index) => (
                        // eslint-disable-next-line jsx-a11y/aria-role
                        <tr key={admin.admin_id}>
                            <td>{index + 1}</td>
                            <td>{admin.username}</td>
                            <td>
                                <button onClick={handleDelete}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="add-new-goods">
                <Link to="/goods/add-new-goods">Add New Goods</Link>
            </button>
        </div>
    );
}

export default Goods;
