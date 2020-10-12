module.exports = {
    index(req, res, next) {
        console.log(req.user);
        res.status(200).json({ message: "Hello, World" })
    }
}

