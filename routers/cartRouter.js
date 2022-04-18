const cartController = require("../controllers/cartController");
const router = require("express").Router();

router.put("/", cartController.replaceCart);
router.patch("/", cartController.updateCartRow);
router.get("/", cartController.getCartByUserId);

module.exports = router;
