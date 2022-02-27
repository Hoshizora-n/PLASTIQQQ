// import axios from "axios";
// import React, { useEffect, useState } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./goods.css";

function Goods() {
    const [goods, setGoods] = useState([]);

    useEffect(() => {
        axios
            .get(`http://${process.env.REACT_APP_BASE_URL}:3100/admin/goods`)
            .then((res) => {
                for (let i = 0; i < res.data.length; i++) {
                    setGoods(res.data);
                }
            })
            .catch((err) => console.log(err));
    }, []);

    const handleEditGoods = (e) => {
        const parentElement = e.target.parentElement.parentElement;
        const kodeBarang = parentElement.getAttribute("id");
        console.log(kodeBarang);
    };

    const handleDeleteGoods = (e) => {
        e.preventDefault();
        const parentElement = e.target.parentElement.parentElement;
        const id = parentElement.getAttribute("id");
        axios
            .delete(`http://${process.env.REACT_APP_BASE_URL}:3100/admin/goods/${id}`)
            .then((res) => {
                if (res.data.message === "Barang Deleted") {
                    alert(res.data.message);
                    window.location.reload();
                } else {
                    alert(res.data.message);
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
            {goods.map((good) => {
                const filePath = `http://${process.env.REACT_APP_BASE_URL}:3100/${good.foto_barang}`;
                return (
                    <div className="card" key={good.kode_barang} id={good.kode_barang}>
                        <div className="card-image">
                            <img src={filePath} alt="foto_barang"></img>
                        </div>
                        <div className="card-body">
                            <p className="kode-barang">Kode Barang : {good.kode_barang}</p>
                            <h3>{good.nama_barang}</h3>
                            <p className="deskripsi">{good.deskripsi}</p>
                            <p>Harga : Rp. {good.harga_barang}</p>
                            <p>Stok : {good.stok}</p>
                        </div>
                        <div className="card-action">
                            <Link to="/goods/edit" className="edit-btn" onClick={handleEditGoods}>
                                Edit
                            </Link>
                            <Link to="/goods/delete" className="delete-btn" onClick={handleDeleteGoods}>
                                Delete
                            </Link>
                        </div>
                    </div>
                );
            })}
            <Link to="/goods/add-new-goods" className="add-new">
                Add New Goods
            </Link>
        </div>
    );
}

export default Goods;
