const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const adminRoute = require("./routes/admin");
app.use("/admin", adminRoute);

app.listen(3100, () => console.log("Server started on port 3100"));
