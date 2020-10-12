const Todo = require("../models/Todo");
const Types = require("mongoose").Types;

module.exports = {
    async index(req, res, next) {
        try {
            const todos = await Todo.find();
            if (!todos || todos.length == 0) {
                return res.status(401).json({ message: 'TODO_NOT_FOUND' })
            }
            res.status(200).json({ todos });
        } catch (error) {
            return res.status(500).json({ error });
        }
    },

    async view(req, res, next) {
        const id = req.params.Id;

        if (!id || id == "undefined") {
            return res.status(401).json({ message: 'TODO_INVALID_PARAM' })
        }
        try {
            const _id = Types.ObjectId(id);
            const todo = await Todo.find({ _id });

            if (!todo || todo == "undefined") {
                return res.status(401).json({ message: 'TODO_NOT_FOUND' })
            }

            res.status(200).json({ todo });
        } catch (error) {
            return res.status(500).json({ error });
        }
    },

    store(req, res, next) {
        const { title, completed } = req.body;
        const userId = Types.ObjectId(req.user);
        try {
            const todo = new Todo({
                title,
                userId,
                completed
            });
            todo.save(err => {
                if (err) throw err;
                return res.status(200).json({ message: "TODO_CREATED" });
            });
        } catch (error) {
            return res.status(500).json({ error });
        }

    },

    async update(req, res, next) {
        const id = req.params.Id;
        const { title,completed } = req.body;

        if (!id || id == "undefined") {
            return res.status(404).json({ message: 'TODO_INVALID_PARAM' })
        }
        try {
            const _id = Types.ObjectId(id)
            const todo = await Todo.findOneAndUpdate(
                { _id },
                { title, completed },
                { useFindAndModify: false }
            );

            if (todo.equals(null)) {
                return res.status(404).json({ message: 'TODO_NOT_FOUND' })
            }
            res.status(200).json({ todo });
        } catch (error) {
            return res.status(422).json({ error });
        }

    },

    async delete(req, res, next) {
        const id = req.params.Id;
        try {
            const _id = Types.ObjectId(id)
            const result = await Todo.deleteOne({ _id });

            if (result.deletedCount > 0)
                res.status(200).json({ message: "TODO_DELETED" });

        } catch (error) {
            return res.status(500).json({ error });
        }
    }
}