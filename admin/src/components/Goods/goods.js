// import axios from "axios";
// import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./goods.css";

function Goods() {
    // let [admin, setAdmin] = useState([]);

    // useEffect(() => {
    //     axios.get(`http://${process.env.REACT_APP_BASE_URL}:3100/admin/admin`).then((res) => {
    //         setAdmin((previousValue) => {
    //             return (previousValue = res.data);
    //         });
    //     });
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    // const handleDelete = (e) => {
    //     const parentElement = e.target.parentElement.parentElement;
    //     console.log(parentElement);
    // };

    return (
        <div>
            <div className="card">
                <div className="card-image">
                    <img
                        src="http://localhost:3100/images/goods/sddsf-Screenshot%20(1).png"
                        alt="foto_barang"
                        width="200px"
                    ></img>
                </div>
                <div className="card-body">
                    <p className="kode-barang">DFjka1</p>
                    <h3>Nama Barang</h3>
                    <p className="deskripsi">Deskripsi ini adalah barang jualan</p>
                    <p>Harga : Rp. 100.000</p>
                    <p>Stok : 99</p>
                </div>
                <div className="card-action">
                    <Link to="/goods/edit" className="edit-btn">
                        Edit
                    </Link>
                    <Link to="/goods/delete" className="delete-btn">
                        Delete
                    </Link>
                </div>
            </div>
            <div className="card">
                <div className="card-image">
                    <img
                        src="http://localhost:3100/images/goods/sddsf-Screenshot%20(1).png"
                        alt="foto_barang"
                        width="200px"
                    ></img>
                </div>
                <div className="card-body">
                    <p className="kode-barang">DFjka1</p>
                    <h3>Nama Barang</h3>
                    <p className="deskripsi">Deskripsi ini adalah barang jualan</p>
                    <p>Harga : Rp. 100.000</p>
                    <p>Stok : 99</p>
                </div>
                <div className="card-action">
                    <Link to="/goods/edit" className="edit-btn">
                        Edit
                    </Link>
                    <Link to="/goods/delete" className="delete-btn">
                        Delete
                    </Link>
                </div>
            </div>
            <Link to="/goods/add-new-goods" className="add-new">
                Add New Goods
            </Link>
        </div>
    );
}

export default Goods;
