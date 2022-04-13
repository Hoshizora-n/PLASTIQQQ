import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./EditGoods.css";

const EditGoods = () => {
    let navigate = useNavigate();
    const [hargaBarang, setHargaBarang] = useState("");
    const [stok, setStok] = useState("");
    const [deskripsi, setDeskripsi] = useState("");

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
        const getData = async () => {
            const id = sessionStorage.getItem("kodeBarang-edit");
            const res = await axios.get(`http://${process.env.REACT_APP_BASE_URL}:3100/admin/goods/${id}`);
            setHargaBarang(res.data.harga);
            setStok(res.data.stok);
            setDeskripsi(res.data.deskripsi);
        };
        getData();
    }, []);

    const handleUpdate = (e) => {
        e.preventDefault();
        const id = sessionStorage.getItem("kodeBarang-edit");
        const data = {
            harga: hargaBarang,
            stok: stok,
            deskripsi: deskripsi,
        };
        axios
            .put(`http://${process.env.REACT_APP_BASE_URL}:3100/admin/goods/${id}`, data)
            .then((res) => {
                if (res.data.message === "Barang Updated") {
                    Toast.fire({
                        icon: "success",
                        title: "Barang Updated",
                    });
                    navigate("/goods");
                } else {
                    Toast.fire({
                        icon: "error",
                        title: res.data.message,
                    });
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
            <form>
                <h2>Update Barang</h2>
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
                <button onClick={handleUpdate}>Update</button>
            </form>
        </div>
    );
};

export default EditGoods;
