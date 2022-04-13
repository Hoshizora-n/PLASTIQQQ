import React, { useEffect, useState } from "react";
import "./DetailSales.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const DetailSales = (props) => {
    let navigate = useNavigate();
    let { id } = useParams();
    const [barang, setBarang] = useState([]);

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

    useEffect(() => {
        axios
            .get(`http://${process.env.REACT_APP_BASE_URL}:3100/admin/sales/${id}`)
            .then((res) => {
                setBarang(res.data);
            })
            .catch((err) => console.log(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="detail-sales-container">
            <h1>Detail Penjualan</h1>
            <div className="detail-sales-item">
                <h3 className="kode-faktur">Kode Faktur : {id}</h3>
                <h3 className="user">Kasir : {props.fakturClickedData.user}</h3>
                <div className="barang-container">
                    {barang.map((item, index) => {
                        return (
                            <div className="barang-item" key={index}>
                                <div className="barang-item-img">
                                    <img
                                        src={`http://${process.env.REACT_APP_BASE_URL}:3100/${item.foto_barang}`}
                                        alt={item.nama_barang}
                                    />
                                </div>
                                <div className="barang-item-info">
                                    <div className="barang-item-detail">
                                        <h4>{item.nama_barang}</h4>
                                        <h4>Harga: Rp. {item.harga_barang}</h4>
                                    </div>

                                    <div className="barang-item-qty">
                                        <h4>Qty: {item.quantity}</h4>
                                    </div>

                                    <div className="barang-item-total">
                                        <h4>Total: Rp. {item.total}</h4>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <h3 className="subtotal">Subtotal : Rp. {props.fakturClickedData.subTotal}</h3>
                <h3 className="tanggal">Tanggal : {props.fakturClickedData.tanggal}</h3>
                <div className="detail-sales-action">
                    <button className="back" onClick={() => navigate("/sales")}>
                        Back
                    </button>
                    <button
                        className="delete"
                        onClick={() => {
                            axios
                                .delete(`http://${process.env.REACT_APP_BASE_URL}:3100/admin/sales/${id}`)
                                .then((res) => {
                                    if (res.data.message === "Deleted") {
                                        Toast.fire({
                                            icon: "success",
                                            title: `${id} ${res.data.message}`,
                                        });
                                        navigate("/sales");
                                    }
                                })
                                .catch((err) => console.log(err));
                        }}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DetailSales;
