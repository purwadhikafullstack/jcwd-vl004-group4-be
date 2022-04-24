const productController = require("../controllers/productController");
const router = require("express").Router();

router.post(
  "/add-product",
  productController.upload,
  productController.addProduct
);

router.get("/get-all-products", productController.getAllProducts);

router.get("/get-product-byId/:id", productController.getProductById);

router.patch("/update-product/:id", productController.updateProduct);

router.delete("/delete-product/:id", productController.deleteProduct);

router.post("/restore-product/:id", productController.restoreProduct);

module.exports = router;
