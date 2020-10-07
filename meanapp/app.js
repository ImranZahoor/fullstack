const express = require("express");
const passport = require("passport")
const passportConfig = require("./middleware/passport")
const app = express();
const mongoose = require('mongoose');

// custom modules
const routes = require("./routes")

// define constants
const PORT = process.env.PORT || 3000
const DB_STRING = "mongodb://localhost:27017/todos";

// database connection 
mongoose.connect(DB_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) throw err;
    console.log('Successfully connected to database');
})

// configure application
app.use(passport.initialize())
app.use(routes)

// server 
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})