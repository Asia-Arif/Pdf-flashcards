const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");

connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend server is running");
});

app.use("/api/pdf", require("./routes/pdfRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});