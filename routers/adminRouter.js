const adminController = require("../controllers/adminController");
const { keepLogin, resetPassword } = require("../helper/authToken");
const router = require("express").Router();

router.post("/login", adminController.getAdmin);
router.post("/register", adminController.addAdmin);
router.post("/keep-login", keepLogin, adminController.adminKeepLogin);
router.post("/forgot-password", adminController.forgotPasswordAdmin);
router.patch(
  "/reset-password",
  resetPassword,
  adminController.resetPasswordAdmin
);
router.get("/get-all-user", adminController.getAllUser);
router.patch("/deactivate-user", adminController.deactivateUser);
router.patch("/activate-user", adminController.activateUser);

module.exports = router;
