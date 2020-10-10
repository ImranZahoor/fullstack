const mongoose = require("mongoose");
const Schema = mongoose.Schema;


TodoSchema = new Schema({
    title: {
        type: String,
        requried: [true, 'Todo title required']
    },
    completed: {
        type: Boolean,
        default: false
    },
    userId: {
        type: mongoose.ObjectId,
        // required: [true, 'todo user required']
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }
});

TodoSchema.pre('save', function (next) {
    this.set({ createdAt: new Date() });
    next();
});

TodoSchema.pre('findOneAndUpdate', function (next) {
    this.set({ updatedAt: new Date() });
    next();
});

const Todo = mongoose.model('todo', TodoSchema);
module.exports = Todo;