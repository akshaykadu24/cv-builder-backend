const express = require("express")
const router = require("./routes/AllRoutes")
const dotenv = require('dotenv');
const connectDB = require("./config/db");
const cors = require('cors');

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
app.use(router)

app.listen(8080, () => {
    console.log("server is running on port 8080")
    connectDB()
})
