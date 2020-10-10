const Todo = require("../models/Todo");
const mongoose = require("mongoose");

module.exports = {
    index(req, res, next) {

    },
    view(req, res, next) {

    },
    store(req, res, next) {
        const { title } = req.body;

        const todo = new Todo({
            title: title,
            completed: false
        });
        todo.save(err => {
            if (err) throw err;
            return res.status(200).json({ message: "TODO_CREATED" });
        });
    },
    async update(req, res, next) {
        const id = req.params.Id;
        // console.log(id);
        // const todo = await (await Todo.findById(mongoose.Types.ObjectId(id)));

        // if (!todo) return res.status(401).json({ message: "TODO_NOT_FOUND" });

        const todo = await Todo.findOneAndUpdate(
            { _id: mongoose.Types.ObjectId(id) },
            { completed: true }
        );

        res.status(200).json({ todo });
        // todo.findOneAndUpdate({ completed: true }, (err, todo) => {
        //     if (!err) return res.status(400).json({ err });
        //     res.status(200).json({ todo });
        // });

    },
    delete(req, res, next) {

    }
}