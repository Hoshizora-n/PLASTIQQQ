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

router.get("/", (req, res) => {
    res.send("Login Page");
});

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

const createJwt = (username, password) => {
    let token = jwt.sign({ username, password }, "secret");
    return token;
};

module.exports = router;
