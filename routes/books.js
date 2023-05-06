const express  = require("express");
const booksRoute = express.Router();
const {BookModel} = require("../models/books.model")
const jwt = require("jsonwebtoken")

booksRoute.get("/",async(req,res)=>{
    const token = req.headers.authorization.split(" ")[1]
    const decoded = jwt.verify(token,"mock-11")
    try {
        if(decoded){
            const post = await BookModel.find({"userID":decoded.user._id})
            res.status(200).send(post)
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
})

booksRoute.post("/", async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, "mock-11");

        if (decoded) {
            const userId = decoded.User._id;
            const bookData = req.body;
            if (bookData.user === userId) {
                const post = new BookModel(bookData);
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

booksRoute.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, "mock-11");
        const userId = decoded.user._id;

        const post = await BookModel.findOne({ _id: id, user: userId });
        if (post) {
            const updatedPost = await BookModel.findByIdAndUpdate(
                { _id: id },
                payload,
                { new: true }
            );
            res.status(200).send(updatedPost);
        } else {
            res.status(401).send("Unauthorized user");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});

booksRoute.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, "mock-11");
        const userId = decoded.user._id;

        const post = await BookModel.findOne({ _id: id, user: userId });
        if (post) {
            await BookModel.findByIdAndDelete({ _id: id });
            res.status(200).send("Book deleted Successfully");
        } else {
            res.status(401).send("Unauthorized user");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports={
    booksRoute
}