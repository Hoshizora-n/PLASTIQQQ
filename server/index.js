const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

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

app.get("/admin", (req, res) => {
    const data = con.query("SELECT * FROM `admin`", function (err, result) {
        if (err) throw err;
        else {
            res.status(200).send(result);
        }
    });
});

app.listen(3100, () => console.log("Server started on port 3100"));
