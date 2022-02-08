const express = require("express");
const mysql = require("mysql");

const app = express();

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "warung",
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("SELECT * FROM `admin`", function (err, result) {
        if (err) throw err;
        console.log(JSON.stringify(result));
    });
});

app.listen(3100, () => console.log("Server started on port 3100"));
