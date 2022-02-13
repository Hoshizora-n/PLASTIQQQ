const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const db = require("./db.js");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/admin", (req, res) => {
    const { username, password } = req.body;

    db.query("SELECT * FROM `admin` WHERE username = ?", [username], function (err, result) {
        if (err) throw err;
        else {
            const data = result[0];
            if (data) {
                if (data.password === password) {
                    res.status(200).send({
                        message: "Login Success",
                        data: data,
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

app.listen(3100, () => console.log("Server started on port 3100"));
