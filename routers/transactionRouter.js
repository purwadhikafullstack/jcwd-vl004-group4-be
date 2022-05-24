const transactionController = require("../controllers/transactionController");
const router = require("express").Router();
const { auth } = require("../helper/authToken");




router.get(
  "/get-display-transaction", auth,
  transactionController.getDisplayTransaction
);
router.post("/update-transaction", transactionController.modify_transaction);

module.exports = router;
