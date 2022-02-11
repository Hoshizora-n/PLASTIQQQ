const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "warung",
});

con.connect(function (err) {
    if (err) throw err;
    else console.log("Connected!");
});

app.post("/admin", (req, res) => {
    const { username, password } = req.body;

    const auth = con.query("SELECT * FROM `admin` WHERE username = ?", [username], function (err, result) {
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
