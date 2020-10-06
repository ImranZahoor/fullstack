const express = require("express")
const passport = require("passport")
const app = express()
const routes = require("./routes")
// define constants
const PORT = process.env.PORT || 3000
// configure application
app.use(passport.initialize())
app.use(routes)
// server 
app.listen(PORT,()=>{
    console.log(`listening on ${PORT}`)
})