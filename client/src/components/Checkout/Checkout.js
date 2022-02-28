import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

const Checkout = (props) => {
    let navigate = useNavigate();
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
        const checkoutItems = document.querySelector(".checkout-items");
        let condition = true;
        while (condition) {
            if (checkoutItems.firstChild) {
                checkoutItems.removeChild(checkoutItems.firstChild);
            } else {
                condition = false;
            }
        }

        setTotal({
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

        for (let i = 0; i < props.cart.length; i++) {
            axios
                .get(`http://${process.env.REACT_APP_BASE_URL}:3100/user/cart/${props.cart[i]}`)
                .then((res) => {
                    setItem((prevState) => [...prevState, res.data]);
                })
                .catch((err) => console.log(err));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.cart]);

    const handleCheckout = (e) => {
        e.preventDefault();
        const cart = e.target.parentElement.parentElement;
        const cartItems = cart.getElementsByClassName("checkout-item");

        let checkoutItems = [];
        for (let i = 0; i < cartItems.length; i++) {
            const cartInfo = cartItems[i].getElementsByClassName("checkout-item-info")[0];
            const cartTotal = cartItems[i].getElementsByClassName("checkout-item-total")[0];

            const kode_barang = cartItems[i].id;
            const quantity_barang = cartInfo.getElementsByTagName("input")[0].value;
            const total_harga = cartTotal.getElementsByTagName("p")[0].getAttribute("total");
            const updated_stok = cartInfo.getElementsByTagName("input")[0].getAttribute("max");

            const data = {
                kode_barang: kode_barang,
                quantity: quantity_barang,
                total_harga: total_harga,
                updated_stok: updated_stok - quantity_barang,
            };

            checkoutItems.push(data);
        }

        const data = {
            username: props.username,
            checkoutItems: checkoutItems,
        };

        axios
            .post(`http://${process.env.REACT_APP_BASE_URL}:3100/user/checkout`, data)
            .then((res) => {
                if (res.data.message === "Checkout Success") {
                    props.setCart([]);
                    navigate("/home");
                } else {
                    console.log(res);
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="checkout-container">
            <h1>Checkout</h1>
            <div className="checkout-items">
                {item.map((item, index) => {
                    const { foto_barang, nama_barang, harga_barang, kode_barang, stok } = item[0];
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
                                    min="1"
                                    max={stok}
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
                                <button
                                    className="delete-cart-item"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        props.setCart((prevState) => prevState.filter((item) => item !== kode_barang));
                                        setTotal((prevState) => {
                                            return {
                                                ...prevState,
                                                [index]: 0,
                                            };
                                        });
                                    }}
                                >
                                    Delete
                                </button>
                                <p total={total[index]}>Total : Rp. {total[index]}</p>
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
