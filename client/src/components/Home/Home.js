import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FiShoppingCart } from "react-icons/fi";
import "./Home.css";

const Home = (props) => {
    const [goods, setGoods] = useState([]);

    useEffect(() => {
        axios
            .get(`http://${process.env.REACT_APP_BASE_URL}:3100/user/home`)
            .then((res) => {
                for (let i = 0; i < res.data.length; i++) {
                    setGoods(res.data);
                }
            })
            .catch((err) => console.log(err));
    }, []);

    const Toast = Swal.mixin({
        toast: true,
        position: "top-start",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
    });

    const addToCart = (e) => {
        const { id } = e.target;
        props.setCart((prevState) => {
            if (prevState.includes(id)) {
                Toast.fire({
                    icon: "error",
                    title: "Item already in cart",
                });
                return prevState;
            } else {
                Toast.fire({
                    icon: "success",
                    title: "Added to cart",
                });
                return [...prevState, id];
            }
        });

        localStorage.setItem("cart", JSON.stringify(props.cart));
    };

    return (
        <>
            <h2>Welcome, {props.username}</h2>
            <div className="home-container">
                {goods.map((good) => {
                    const filePath = `http://${process.env.REACT_APP_BASE_URL}:3100/${good.foto_barang}`;
                    const stok = good.stok;
                    return (
                        <div className="card" key={good.kode_barang}>
                            <div className="card-image">
                                <img src={filePath} alt={good.foto_barang}></img>
                            </div>
                            <div className="card-body">
                                <p className="kode-barang">Kode Barang : {good.kode_barang}</p>
                                <h3>{good.nama_barang}</h3>
                                <p>{good.deskripsi}</p>
                                <p>Harga : Rp. {good.harga_barang}</p>
                                <p className="stok">Stok : {stok}</p>
                                <button onClick={addToCart} id={good.kode_barang} disabled={stok === 0 ? true : false}>
                                    <FiShoppingCart /> Add to Cart
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default Home;
