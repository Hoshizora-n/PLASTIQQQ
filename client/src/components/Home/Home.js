import axios from "axios";
import React, { useEffect, useState } from "react";
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

    const addToCart = (e) => {
        const { id } = e.target;
        props.setCart((prevState) => {
            if (prevState.includes(id)) return prevState;
            else return [...prevState, id];
        });
    };

    return (
        <>
            <h2>Welcome, {props.username}</h2>
            <h3>Here is the Home Page</h3>
            <div className="home-container">
                {goods.map((good) => {
                    const filePath = `http://${process.env.REACT_APP_BASE_URL}:3100/${good.foto_barang}`;
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
                                <p className="stok">Stok : {good.stok}</p>
                                <p onClick={addToCart} id={good.kode_barang}>
                                    <FiShoppingCart /> Add to Cart
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default Home;
