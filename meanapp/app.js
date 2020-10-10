const express = require("express");
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
const passport = require("passport");
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');

// custom modules
dotenv.config();
const routes = require("./routes");
const passportConfig = require("./middleware/passport");


// define constants
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_DATABASE = process.env.DB_DATABASE;
const DB_STRING = `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;

// database connection 
mongoose.connect(DB_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) throw err;
    console.log('Successfully connected to database');
})

// configure application
app.use(morgan("dev"));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(passport.initialize());
app.use(routes);

// server 
app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
})