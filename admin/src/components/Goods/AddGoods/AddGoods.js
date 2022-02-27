import React, { useState } from "react";
import "./AddGoods.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddGoods = () => {
    let navigate = useNavigate();

    const [kodeBarang, setKodeBarang] = useState("");
    const [namaBarang, setNamaBarang] = useState("");
    const [hargaBarang, setHargaBarang] = useState("");
    const [stok, setStok] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [foto, setFoto] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const allData = [kodeBarang, namaBarang, hargaBarang, stok, deskripsi];
        const check = allData.every((data) => data !== "");

        if (check && foto !== null && foto !== undefined) {
            const data = new FormData();
            data.append("kodeBarang", kodeBarang);
            data.append("namaBarang", namaBarang);
            data.append("hargaBarang", hargaBarang);
            data.append("stok", stok);
            data.append("deskripsi", deskripsi);
            data.append("file", foto);

            axios
                .post(`http://${process.env.REACT_APP_BASE_URL}:3100/admin/goods`, data)
                .then((res) => {
                    if (res.data.message === "Barang Created") {
                        alert(res.data.message);
                        navigate("/goods");
                    } else alert(res.data.message + " " + res.data.err);
                })
                .catch((error) => {
                    const { response } = error;
                    alert(response.statusText);
                });
        } else alert("All field must be filled");
    };
    return (
        <div className="add-container">
            <form>
                <h2>Add New Goods</h2>
                <div className="add-admin-input-kodeBarang">
                    <label htmlFor="kodeBarang">kodeBarang : </label>
                    <input
                        type="text"
                        name="kodeBarang"
                        id="kodeBarang"
                        value={kodeBarang}
                        onChange={(e) => setKodeBarang(e.target.value)}
                        required
                    />
                </div>
                <div className="add-admin-input-namaBarang">
                    <label htmlFor="namaBarang">namaBarang : </label>
                    <input
                        type="text"
                        name="namaBarang"
                        id="namaBarang"
                        value={namaBarang}
                        onChange={(e) => setNamaBarang(e.target.value)}
                        required
                    />
                </div>
                <div className="add-admin-input-hargaBarang">
                    <label htmlFor="hargaBarang">hargaBarang : </label>
                    <input
                        type="number"
                        name="hargaBarang"
                        id="hargaBarang"
                        value={hargaBarang}
                        onChange={(e) => setHargaBarang(e.target.value)}
                        required
                    />
                </div>
                <div className="add-admin-input-stok">
                    <label htmlFor="stok">stok : </label>
                    <input
                        type="number"
                        name="stok"
                        id="stok"
                        value={stok}
                        onChange={(e) => setStok(e.target.value)}
                        required
                    />
                </div>
                <div className="add-admin-input-deskripsi">
                    <label htmlFor="deskripsi">deskripsi : </label>
                    <input
                        type="text"
                        name="deskripsi"
                        id="deskripsi"
                        value={deskripsi}
                        onChange={(e) => setDeskripsi(e.target.value)}
                        required
                    />
                </div>
                <div className="add-admin-input-foto">
                    <label htmlFor="foto">foto : </label>
                    <input
                        type="file"
                        alt="foto"
                        name="foto"
                        accept="image/png, image/jpeg, image/jpg"
                        id="foto"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            setFoto(file);
                        }}
                        required
                    />
                </div>
                <button type="submit" onClick={handleSubmit}>
                    Add Goods
                </button>
            </form>
        </div>
    );
};

export default AddGoods;
