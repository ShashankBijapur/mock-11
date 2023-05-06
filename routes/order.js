const express  = require("express");
const orderRoute = express.Router();
const { OrderModel} = require("../models/order.model")
const jwt = require("jsonwebtoken")

orderRoute.get("/",async(req,res)=>{
    const token = req.headers.authorization.split(" ")[1]
    const decoded = jwt.verify(token,"mock-11")
    try {
        if(decoded){
            const post = await  OrderModel.find({"userID":decoded.user._id})
            res.status(200).send(post)
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
})

orderRoute.post("/", async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, "mock-11");

        if (decoded) {
            const userId = decoded.User._id;
            const bookData = req.body;
            if (bookData.user === userId) {
                const post = new  OrderModel(bookData);
                await post.save();
                res.status(200).send("New book added into your account");
            } else {
                res.status(401).send("Unauthorized user");
            }
        }
    } catch (error) {
        res.status(400).send(error.message);
    }

});

module.exports={
    orderRoute
}