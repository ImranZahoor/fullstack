const AuthController = require("./controllers/Auth/AuthController")
const HomeController = require("./controllers/HomeController")
const router =require("express").Router()

router.get('/', HomeController.index)

// api routes

// authentication routes
router.get("/auth/login",AuthController.login)
module.exports = router