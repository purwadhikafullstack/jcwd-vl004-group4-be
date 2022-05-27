const transactionController = require("../controllers/transactionController");
const router = require("express").Router();
const { auth } = require("../helper/authToken");

router.get(
  "/get-display-transaction",
  auth,
  transactionController.getDisplayTransaction
);
router.post("/update-transaction", auth, transactionController.modify_transaction);
router.post(
  "/approve-transaction/:id",
  transactionController.approveTransaction
);

module.exports = router;
