const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const authRoutes = require("./routes/user");
app.use("/api/v1", authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running succesfully at ${PORT}`);
})

const dbConnect = require("./config/databasse");
dbConnect();
app.get("/", (req, res) => {
    res.send(`<h1>This is Auth Homepage dude.</h1>`)
})