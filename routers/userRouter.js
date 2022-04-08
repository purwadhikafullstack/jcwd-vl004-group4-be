const userController = require("../controllers/userController");
const router = require("express").Router();

router.post("/register", userController.addUser);

module.exports = router;
