const User = require("../models/User");
module.exports = {
    index(req, res, next) {
        try {
            const users = await User.find();
            if (!users || users.length == 0) {
                return res.status(401).json({ message: 'USER_NOT_FOUND' })
            }
            res.status(200).json({ users });
        } catch (error) {
            return res.status(500).json({ error });
        }
    },

    view(req, res, next) {
        const id = req.params.Id;

        if (!id || id == "undefined") {
            return res.status(401).json({ message: 'USER_INVALID_PARAM' })
        }
        try {
            const _id = mongoose.Types.ObjectId(id);
            const user = await User.find({ _id });

            if (!user || user == "undefined") {
                return res.status(401).json({ message: 'USER_NOT_FOUND' })
            }

            res.status(200).json({ user });
        } catch (error) {
            return res.status(500).json({ error });
        }
    },

    store(req, res, next) {
        const { name, username, email, password } = req.body;
        const user = new User({
            name,
            username,
            email,
            password
        })        
        user.save(err => {
            if (err) throw err;
            res.status(200).json({ message: "USER_CREATED" })
        })
    },

    update(req, res, next) {

    }
    ,
    delete(req, res, next) {

    }
}
