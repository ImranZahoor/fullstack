const passport = require("passport");
const AuthController = require("./controllers/Auth/AuthController");
const HomeController = require("./controllers/HomeController");
const UserController = require("./controllers/UserController");
const router =require("express").Router();

router.get('/', passport.authenticate('jwt', { session: false }),HomeController.index);

// api routes
router.get('/api/user/create',UserController.store);

// authentication routes
router.post("/auth/login",AuthController.login);
router.get("/auth/logout",AuthController.logout);

module.exports = router