const userController = require("../controllers/userController");
const { auth, keepLogin, resetPassword } = require("../helper/authToken");
const router = require("express").Router();

router.post("/register", userController.addUser);
router.patch("/verified", auth, userController.verifUser);
router.post("/login", userController.getUser);
router.post("/keep-login", keepLogin, userController.userKeepLogin);
router.post("/forgot-password", userController.forgotPasswordUser);
router.patch(
  "/reset-password",
  resetPassword,
  userController.resetPasswordUser
);
router.get("/get-user-byId/:id", userController.getUserById);
router.get("/get-address-byUserId/:id", userController.getAddressById);
router.patch("/edit-user/:id", userController.editUserData);
router.post("/check-password/:id", userController.checkPassword);
router.patch("/change-password/:id", userController.changePassword);
router.post("/add-user-address/:id", userController.addUserAddress);
router.patch("/edit-user-address/:id", userController.editUserAddress);
router.delete("/delete-user-address/:id", userController.deleteAddress);

module.exports = router;
