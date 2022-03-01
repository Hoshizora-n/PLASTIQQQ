import React, { useEffect, useState } from "react";
import { FiPackage, FiUser, FiShoppingBag } from "react-icons/fi";
import "./dashboard.css";
import axios from "axios";

function Dashboard() {
    const [dashboard, setDashboard] = useState([]);

    useEffect(() => {
        axios
            .get(`http://${process.env.REACT_APP_BASE_URL}:3100/admin/dashboard`)
            .then((res) => {
                setDashboard(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="dashboard-container">
            <h1>Dashboard Page</h1>
            <div className="dashboard-summary">
                <div className="total-admin">
                    <h2>Admin</h2>
                    <FiUser className="icon" />
                    <h2>{dashboard.totalAdmin}</h2>
                </div>
                <div className="total-kasir">
                    <h2>Kasir</h2>
                    <FiUser className="icon" />
                    <h2>{dashboard.totalUsers}</h2>
                </div>
                <div className="total-barang">
                    <h2>Total Barang</h2>
                    <FiPackage className="icon" />
                    <h2>{dashboard.totalBarang}</h2>
                </div>
                <div className="total-penjualan">
                    <h2>Total Penjualan</h2>
                    <FiShoppingBag className="icon" />
                    <h2>{dashboard.totalPenjualan}</h2>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
