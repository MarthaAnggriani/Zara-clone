if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}
const express = require('express')
const app = express()
// const port = 3000
const PORT = process.env.PORT || 3000
const router = require("./routes");
const customerRouter = require("./routes/customer");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(customerRouter);
// app.use(router);
app.use(errorHandler);

module.exports = app;

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})