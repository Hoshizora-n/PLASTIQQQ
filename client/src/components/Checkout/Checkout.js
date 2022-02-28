import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Checkout.css";

const Checkout = (props) => {
    const [item, setItem] = useState([]);
    const [total, setTotal] = useState({
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
    });
    let [quantity, setQuantity] = useState({
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
    });

    const subTotal = total[0] + total[1] + total[2] + total[3] + total[4] + total[5] + total[6] + total[7] + total[8];

    useEffect(() => {
        for (let i = 0; i < props.cart.length; i++) {
            axios
                .get(`http://${process.env.REACT_APP_BASE_URL}:3100/user/cart/${props.cart[i]}`)
                .then((res) => {
                    setItem((prevState) => [...prevState, res.data]);
                })
                .catch((err) => console.log(err));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCheckout = (e) => {
        e.preventDefault();
        console.log(e.target);
    };

    return (
        <div className="checkout-container">
            <h1>Checkout</h1>
            <div className="checkout-items">
                {item.map((item, index) => {
                    const { foto_barang, nama_barang, harga_barang, kode_barang } = item[0];
                    return (
                        <div className="checkout-item" key={index} id={kode_barang}>
                            <div className="checkout-item-img">
                                <img
                                    src={`http://${process.env.REACT_APP_BASE_URL}:3100/${foto_barang}`}
                                    alt={nama_barang}
                                />
                            </div>
                            <div className="checkout-item-info">
                                <h3>{nama_barang}</h3>
                                <p>Harga: Rp. {harga_barang}</p>
                                <input
                                    type="number"
                                    name="quantity"
                                    id="quantity"
                                    min="0"
                                    value={quantity[index]}
                                    onChange={(e) => {
                                        setQuantity((prevState) => {
                                            return {
                                                ...prevState,
                                                [index]: e.target.value,
                                            };
                                        });
                                        setTotal((prevState) => {
                                            return {
                                                ...prevState,
                                                [index]: harga_barang * e.target.value,
                                            };
                                        });
                                    }}
                                    required
                                />
                            </div>
                            <div className="checkout-item-total">
                                <p>Total : Rp. {total[index]}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="checkout-subtotal">
                <h3>Subtotal :</h3>
                <h3>Rp. {subTotal}</h3>
            </div>
            <div className="checkout-button">
                <button className="checkout" onClick={handleCheckout}>
                    Checkout
                </button>
            </div>
        </div>
    );
};

export default Checkout;
