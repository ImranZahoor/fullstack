const passport = require("passport");
const AuthController = require("./controllers/Auth/AuthController");
const HomeController = require("./controllers/HomeController");
const TodoController = require("./controllers/TodoController");
const UserController = require("./controllers/UserController");
const router = require("express").Router();

router.get('/', passport.authenticate('jwt', { session: false }), HomeController.index);

// api routes
router.get('/api/user/create', UserController.store);

router.use('/api/', passport.authenticate('jwt', { session: false }))
router.get('/api/todo', TodoController.index);
router.get('/api/todo/:Id', TodoController.view);
router.post('/api/todo', TodoController.store);
router.put('/api/todo/:Id', TodoController.update);
router.delete('/api/todo/:Id', TodoController.delete);

// authentication routes
router.post("/auth/login", AuthController.login);
router.get("/auth/logout", AuthController.logout);

module.exports = router