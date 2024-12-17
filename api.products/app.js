const express = require("express");
const app = express();
const productsRouter = require("./routes/products");

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Go to /api/products");
});

const _URL_PREFIX = "/api/products";
app.use(_URL_PREFIX, productsRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
});

const PORT = process.env.PORT || 5002;
if (process.env.NODE_ENV !== "test") {
    app.listen(PORT, () => {
        console.log(`Products API running on port ${PORT}`);
    });
}

module.exports = app;
