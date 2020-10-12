const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const secret = process.env.APP_SECRET;

module.exports = {
    async login(req, res, next) {

        const { email, password } = req.body;
        console.log(email);
        if (!email || !password || email == "undefined" || password == "undefined")
            return res.status(401).json({ message: "INVALID_CREDENTIALS" });

        const foundUser = await User.findOne({ email });
        if (!foundUser || foundUser == "undefined") return res.status(401).json({ message: "USER_NOT_FOUND" });

        const passMatched = await foundUser.comparePassword(password);
        if (!passMatched) return res.status(401).json({ message: "INVALID_CREDENTIALS" });

        const token = jwt.sign({ email }, secret, { expiresIn: 10000 });
        const response = { ...foundUser.toJSON(), ...{ token } };
        delete response.password;

        res.status(200).json(response);
    },

    logout(req, res, next) {
        res.status(200).json({ message: "logged in" })
    }
}