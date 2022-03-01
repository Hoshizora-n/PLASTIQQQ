import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./sales.css";

function Sales(props) {
    const [sales, setSales] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://${process.env.REACT_APP_BASE_URL}:3100/admin/sales`)
            .then((res) => {
                setSales(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const clickSaleItem = (e) => {
        const parentElement = e.target.parentElement;
        const id = parentElement.id;
        const user = parentElement.querySelector("#user").innerText;
        const tanggal = parentElement.querySelector("#tanggal").innerText;
        const subTotal = parentElement.querySelector("#subtotal").getAttribute("value");

        const data = {
            kode_faktur: id,
            user: user,
            tanggal: tanggal,
            subTotal: parseInt(subTotal),
        };

        props.setFakturClickedData(data);
        navigate(`/sales/${id}`);
    };

    return (
        <div className="sales-container">
            <h1>Daftar Penjualan</h1>
            <div className="sales-items">
                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>kode_faktur</th>
                            <th>user</th>
                            <th>tanggal</th>
                            <th>subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.map((sale, index) => {
                            return (
                                <tr key={index} id={sale.kode_faktur} onClick={clickSaleItem}>
                                    <td>{index + 1}</td>
                                    <td>{sale.kode_faktur}</td>
                                    <td id="user">{sale.user}</td>
                                    <td id="tanggal">{sale.tanggal}</td>
                                    <td id="subtotal" value={sale.subtotal}>
                                        Rp. {sale.subtotal}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Sales;
