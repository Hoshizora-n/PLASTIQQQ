const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const db = require("../db");
const cors = require("cors");
const multer = require("multer");
require("dotenv").config();

router.use(
    cors({
        origin: `http://${process.env.BASE_URL}:3300`,
    })
);

router.post("/login", (req, res) => {
    const { username, password } = req.body;
    db.query("SELECT * FROM `users` WHERE username = ?", [username], function (err, result) {
        if (err) throw err;
        else {
            const data = result[0];
            if (data) {
                if (data.password === password) {
                    let token = createJwt(username, password);

                    res.status(200).send({
                        message: "Login Success",
                        token,
                    });
                } else {
                    res.status(200).send({ message: "Wrong Password" });
                }
            } else {
                res.status(200).send({ message: "Username not found" });
            }
        }
    });
});

router.post("/checkToken", (req, res) => {
    const token = req.body.token;
    let decoded;
    try {
        decoded = jwt.verify(token, "secret");
    } catch (error) {
        decoded = error;
    }
    db.query(
        "SELECT * FROM `users` WHERE username = ? AND password = ?",
        [decoded.username, decoded.password],
        (err, result) => {
            if (err) throw err;
            else {
                const data = result[0];
                if (data) {
                    res.status(200).send({
                        message: "Token Valid",
                        username: decoded.username,
                    });
                } else {
                    res.status(200).send({ message: "Token not valid" });
                }
            }
        }
    );
});

router.post("/editprofile", (req, res) => {
    const { username, editedUsername, password, editedPassword } = req.body.data;
    if (editedPassword !== "") {
        db.query(
            "UPDATE `users` SET username = ?, password = ? WHERE username = ? AND password = ?",
            [editedUsername, editedPassword, username, password],
            (err, result) => {
                try {
                    if (err) throw err;
                    else {
                        const data = result.affectedRows;
                        if (data === 1) {
                            const token = createJwt(editedUsername, editedPassword);
                            if (editedUsername === username) {
                                res.status(201).send({
                                    message: "Password Changed",
                                    token: token,
                                });
                            } else {
                                res.status(201).send({
                                    message: "Username and Password Changed",
                                    token: token,
                                });
                            }
                        } else {
                            res.status(200).send({
                                message:
                                    "Username and Password not Changed, make sure you enter the password correctly",
                            });
                        }
                    }
                } catch (error) {
                    console.log(error);
                    res.status(200).send({
                        message: "Username Exist, Username and password not changed",
                    });
                }
            }
        );
    } else {
        db.query(
            "UPDATE `users` SET username = ? WHERE username = ? AND password = ?",
            [editedUsername, username, password],
            (err, result) => {
                try {
                    if (err) throw err;
                    else {
                        const data = result.affectedRows;
                        if (data === 1) {
                            const token = createJwt(editedUsername, password);
                            res.status(201).send({
                                message: "Username Changed",
                                token: token,
                            });
                        } else {
                            res.status(200).send({
                                message: "Username not Changed, make sure you enter the password correctly ",
                            });
                        }
                    }
                } catch (error) {
                    console.log(error);
                    res.status(200).send({ message: "Username Exist, Username not changed" });
                }
            }
        );
    }
});

router.get("/home", (req, res) => {
    db.query("SELECT * FROM `barang` ORDER BY `barang`.`id_barang` ASC", (err, result) => {
        if (err) throw err;
        else {
            res.status(200).send(result);
        }
    });
});

router.get("/cart/:id", (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM `barang` WHERE kode_barang = ?", [id], (err, result) => {
        if (err) throw err;
        else {
            res.status(200).send(result);
        }
    });
});

router.post("/checkout", (req, res) => {
    const tanggal = new Date();
    const bulan =
        (tanggal.getMonth() + 1).toString().length === 1 ? "0" + (tanggal.getMonth() + 1) : tanggal.getMonth() + 1;
    const hari = tanggal.getDate().toString().length === 1 ? "0" + tanggal.getDate() : tanggal.getDate();
    const jam = tanggal.getHours().toString().length === 1 ? "0" + tanggal.getHours() : tanggal.getHours();
    const menit = tanggal.getMinutes().toString().length === 1 ? "0" + tanggal.getMinutes() : tanggal.getMinutes();
    const detik = tanggal.getSeconds().toString().length === 1 ? "0" + tanggal.getSeconds() : tanggal.getSeconds();

    const { username, checkoutItems } = req.body;
    const kode_faktur = "F-" + Date.now();
    const tanggal_faktur = `${tanggal.getFullYear()}-${bulan}-${hari} ${jam}:${menit}:${detik}`;
    let subtotal = 0;

    for (let i = 0; i < checkoutItems.length; i++) {
        subtotal += parseInt(checkoutItems[i].total_harga);
        db.query(
            "INSERT INTO `pembelian` (kode_faktur, kode_barang, quantity, total) VALUES (?,?,?,?)",
            [kode_faktur, checkoutItems[i].kode_barang, checkoutItems[i].quantity, checkoutItems[i].total_harga],
            (err, result) => {
                if (err) throw err;
                else {
                    console.log(result.affectedRows);
                }
            }
        );
    }

    db.query(
        "INSERT INTO `faktur_pembelian` VALUES (?,?,?,?)",
        [kode_faktur, username, tanggal_faktur, subtotal],
        (err, result) => {
            if (err) throw err;
            else {
                if (result.affectedRows === 1) {
                    res.status(201).send({ message: "Checkout Success" });
                }
            }
        }
    );
});

const createJwt = (username, password) => {
    let token = jwt.sign({ username, password }, "secret");
    return token;
};

module.exports = router;
