const User = require("../models/User");
module.exports = {
    index(req, res, next) {

    },

    view(req, res, next) {

    },

    store(req, res, next) {
        var user = new User({
            name:"Imran Zahoor",
            username:"imran-zahoor",
            email:"imran-zahoor@outlook.com",
            password:"admin1234"
        });
        
        user.save(err=>{
            if (err) throw err;
            res.status(200).json({message:"USER_CREATED"})
        })
    },

    update(req, res, next) {

    }
    ,
    delete(req, res, next) {

    }
}
