const transactionController = require("../controllers/transactionController");
const router = require("express").Router();

router.get(
  "/get-display-transaction",
  transactionController.getDisplayTransaction
);
router.post("/update-transaction", transactionController.modify_transaction);

module.exports = router;
