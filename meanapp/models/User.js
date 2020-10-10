const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const { use } = require("passport");


const UserSchema = new Schema({
    name: String,
    email: {
        type: String,
        lowercase: true,
        required: [true, 'email required']
    },
    username: {
        type: String,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'password required']
    }
});

UserSchema.pre('save', async function (next) {
    try {
        const user = this;
        if (!user.isModified('password')) return next();
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
        console.log("hased");
        next();
    } catch (error) {
        next(error);
    }
});

UserSchema.methods.comparePassword = async function(newPass){
    try {

        const user = this;        
        const matched = await bcrypt.compare(newPass, user.password);
        console.log(matched);
        return matched;
    } catch (err) {
        throw new Error(err);
    }
}

const User = mongoose.model('user', UserSchema);
module.exports = User;