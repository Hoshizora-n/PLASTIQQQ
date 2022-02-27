const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/images/goods", express.static("images/goods"));

const adminRoute = require("./routes/admin");
const userRoute = require("./routes/user");
app.use("/admin", adminRoute);
app.use("/user", userRoute);

app.listen(3100, () => console.log("Server started on port 3100"));
