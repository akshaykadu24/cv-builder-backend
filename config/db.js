const mongoose = require("mongoose")

const connectDB = async()=>{
    try {
        const connection  = mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connected")
    } catch (error) {
        console.log("mongo not connect",error)
    }
}
module.exports = connectDB;
