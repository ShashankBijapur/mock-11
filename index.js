const express = require("express")
const app = express()
const mongoose = require("mongoose")
require("dotenv").config();
const {userRoute} = require("./routes/login")
const {booksRoute} = require("./routes/books")
const {orderRoute} = require("./routes/order")

app.use(express.json())
app.use("/login",userRoute)
app.use("/books",booksRoute)
app.use("/order",orderRoute)

app.listen(process.env.PORT,async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connected to DB")
    } catch (error) {
        console.log(error.message)
    }
})
