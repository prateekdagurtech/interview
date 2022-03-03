const router = require("express").Router();
const userController = require("../Controller/userCtrl");

//Route url to register user.
router.post("/register", userController.register);
//Route url to login user.
router.post("/login", userController.login);

module.exports = router;
