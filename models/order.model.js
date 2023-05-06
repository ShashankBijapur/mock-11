const mongoose = require("mongoose")


const bookSchema = mongoose.Schema({
    title: String,
    author: String,
    category: String,
    price: Number,
    quantity: Number
},{
versionKey:false
})

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    isAdmin: Boolean
},{
    versionKey:false
})
const orderSchema = mongoose.Schema({
    user : { type: userSchema, ref: 'User' },
    books : [{ type: bookSchema, ref: 'Book' }],
    totalAmount: Number
},{
    versionKey:false
})

const OrderModel = mongoose.model("Order",orderSchema) 

module.exports={
    OrderModel
}
