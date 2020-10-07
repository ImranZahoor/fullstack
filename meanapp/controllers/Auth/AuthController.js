const jwt = require("jsonwebtoken");
const User = require("../../models/User");

module.exports = {
    async login(req, res, next) {
        const {email,password} = req.body;
        console.log(email);
        // const email = "imran-zahoor@outlook.com";
        const foundUser = await User.findOne({ email });
        if (foundUser && foundUser.email) {
            const passMatched = foundUser.comparePassword("admin1234");
            if (passMatched) {
                const token = jwt.sign({ email }, "12345678", { expiresIn: 1000000 });
                const response = { ...foundUser.toJSON(), ...{ token } };
                delete response.password;
                res.status(200).json(response);
            }
        }
    },
    
    logout(req, res, next) {
        res.status(200).json({ message: "logged in" })
    }
}