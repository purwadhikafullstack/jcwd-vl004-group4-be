const cartController = require("../controllers/cartController");
const router = require("express").Router();

router.put("/", cartController.replaceCart);
router.patch("/", cartController.updateCartRow);
router.get("/", cartController.getCartByUserId);

// daffa
router.get('/user/:id', cartController.DFGetCartItems)
router.post('/add-cart', cartController.DFAddcart)
router.delete('/delete-cart/:id/user/:userId', cartController.DFDeleteCart)
router.patch('/update/:id/user/:userId', cartController.DFUpdate)



module.exports = router;
