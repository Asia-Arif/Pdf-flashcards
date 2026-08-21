const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");
const pdfRoutes = require("./routes/pdfRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/pdf", pdfRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "PDF Flashcards Backend is running"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});