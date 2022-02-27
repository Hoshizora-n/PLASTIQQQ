const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const db = require("../db");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
require("dotenv").config();

router.use(
    cors({
        origin: `http://${process.env.BASE_URL}:3200`,
    })
);

router.post("/login", (req, res) => {
    const { username, password } = req.body;
    db.query("SELECT * FROM `admin` WHERE username = ?", [username], function (err, result) {
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
        "SELECT * FROM `admin` WHERE username = ? AND password = ?",
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
            "UPDATE `admin` SET username = ?, password = ? WHERE username = ? AND password = ?",
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
            "UPDATE `admin` SET username = ? WHERE username = ? AND password = ?",
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
                    res.status(200).send({ message: "Username Exist, Username and password not changed" });
                }
            }
        );
    }
});

router.get("/admin", (req, res) => {
    db.query("SELECT username, admin_id FROM `admin` ORDER BY `admin_id` ASC", (err, result) => {
        if (err) throw err;
        else {
            res.status(200).send(result);
        }
    });
});

router.post("/admin", (req, res) => {
    const { username, password } = req.body.data;
    if (username !== "" && password !== "") {
        db.query("INSERT INTO `admin` (username, password) VALUES (?, ?)", [username, password], (err, result) => {
            if (err) res.status(200).send({ message: "Username Exist" });
            else {
                res.status(201).send({ message: "Admin Created" });
            }
        });
    } else {
        res.status(200).send({ message: "Username or Password cannot be empty" });
    }
});

router.get("/users", (req, res) => {
    db.query("SELECT username, user_id FROM `users` ORDER BY `users`.`user_id` ASC", (err, result) => {
        if (err) throw err;
        else {
            res.status(200).send(result);
        }
    });
});

router.post("/users", (req, res) => {
    const { username, password } = req.body.data;
    if (username !== "" && password !== "") {
        db.query("INSERT INTO `users` (username, password) VALUES (?, ?)", [username, password], (err, result) => {
            if (err) res.status(200).send({ message: "Username Exist" });
            else {
                res.status(201).send({ message: "User Created" });
            }
        });
    } else {
        res.status(200).send({ message: "Username or Password cannot be empty" });
    }
});

router.delete("/admin/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM `admin` WHERE admin_id = ?", [id], (err, result) => {
        if (err) throw err;
        else {
            if (result.affectedRows === 1) {
                res.status(202).send({ message: "Admin Deleted" });
            } else {
                res.status(200).send({ message: "Admin with that id is not found" });
            }
        }
    });
});

router.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM `users` WHERE user_id = ?", [id], (err, result) => {
        if (err) throw err;
        else {
            if (result.affectedRows === 1) {
                res.status(202).send({ message: "User Deleted" });
            } else {
                res.status(200).send({ message: "User with that id is not found" });
            }
        }
    });
});

const goodsStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./images/goods");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.kodeBarang + "-" + file.originalname);
    },
});

// Goods API
const uploadGoodsFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg") {
        cb(null, true);
    } else {
        cb(new Error("insert png/jpg/jpeg file"), false);
    }
};
const uploadGoods = multer({
    storage: goodsStorage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter: uploadGoodsFilter,
}).single("file");
router.post("/goods", uploadGoods, (req, res) => {
    const { kodeBarang, namaBarang, hargaBarang, stok, deskripsi } = req.body;
    const filePath = req.file.path;
    db.query(
        "INSERT INTO `barang` (kode_barang, nama_barang, harga_barang, stok, deskripsi, foto_barang) VALUES (?, ?, ?, ?, ?, ?)",
        [kodeBarang, namaBarang, hargaBarang, stok, deskripsi, filePath],
        (err, result) => {
            if (err) {
                res.status(200).send({ err: err, message: "Kode Barang Exist" });
            } else {
                res.status(201).send({ message: "Barang Created" });
            }
        }
    );
});

router.get("/goods", (req, res) => {
    db.query("SELECT * FROM `barang` ORDER BY `barang`.`id_barang` ASC", (err, result) => {
        if (err) throw err;
        else {
            res.status(200).send(result);
        }
    });
});

router.delete("/goods/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM `barang` WHERE kode_barang = ?", [id], (err, result) => {
        if (err) console.log(err);
        else {
            if (result.affectedRows === 1) {
                res.status(202).send({ message: "Barang Deleted" });
            } else {
                res.status(200).send({ message: "Barang with that kode_barang is not found" });
            }
        }
    });
});

router.put("/goods/:id", (req, res) => {
    const { id } = req.params;
    console.log(id);
});
// end Goods API

const createJwt = (username, password) => {
    let token = jwt.sign({ username, password }, "secret");
    return token;
};

module.exports = router;
