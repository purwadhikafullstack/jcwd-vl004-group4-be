const { createOrUpdate } = require("../helper/sqlhelper");
const db = require("../models");
const Cart = db.carts;
const User = db.users
const Product = db.products
const Category = db.categories
const InvoiceHeader = db.invoice_headers

const getCartByUserId = async (req, res) => {
  console.log(req.path);
  console.log(req.query);
  if (!req.query.userId)
    return res.status(400).send({ message: "userId is required" });
  let cart = await Cart.findAll({
    where: {
      userId: req.query.userId,
      productId: req.query.productId,
    },
  });
  res.status(200).send(cart);
};

const updateCartRow = async (req, res) => {
  const id = req.query.userId;
  if (!req.query.userId || !req.query.productId) {
    return res
      .status(400)
      .send({ message: "userId and productId is required" });
  }
  let cart = createOrUpdate(
    {
      ...req.body,
      userId: req.query.userId,
      productId: req.query.productId,
    },
    {
      userId: req.query.userId,
      productId: req.query.productId,
    },
    Cart
  );

  res.status(200).send(cart);
};

// Daffa
const DFGetCartItems = async (req, res) => {
  const userId = +req.params.id
  const { rows, count } = await Cart.findAndCountAll({ where: { userId: userId }, include: { model: Product, include: Category, } })
  const cartCount = await Cart.sum('qty', { where: { userId: userId } })
  const unpaidInvoice = await InvoiceHeader.findOne({ where: { userId: userId, status: 'unpaid' } })
  console.log(unpaidInvoice)
  const cartPrice = () => {
    let totalPrice = 0
    rows.forEach(item => {
      totalPrice += item.product.sell_price * item.qty
    })
    return totalPrice
  }
  const result = { rows, count, cartCount, totalPrice: cartPrice() }
  if (unpaidInvoice) {
    result.unpaidInvoice = unpaidInvoice
  }
  res.status(200).send(result)
}

const DFAddcart = async (req, res) => {
  const data = {
    qty: req.body.qty,
    userId: req.body.userId,
    productId: req.body.productId,
  };

  const productData = await Product.findByPk(req.body.productId);
  const existingCart = await Cart.findOne({
    where: { userId: req.body.userId, productId: req.body.productId },
  });

  if (existingCart) {
    if (existingCart.qty + req.body.qty > productData.stock) {
      res.send({
        conflict: `Cannot add more item in your cart as you already have ${existingCart.qty}`,
        warning: `${productData.name} stock : ${productData.stock}`,
      });
    } else {
      existingCart.qty = existingCart.qty + req.body.qty;
      await existingCart.save();
      res
        .status(200)
        .send({ message: `${productData.name} quantity  has been increased` });
    }
  } else {
    if (req.body.qty > productData.stock) {
      res.send({
        conflict: `Input quantity exceeds stock! ${productData.name} stock: ${productData.stock}`,
      });
    } else {
      const cart = await Cart.create(data);
      const count = await Cart.count({ where: { userId: req.body.userId } });
      res.status(200).send({
        message: "One item has been added to your cart",
        cart: cart,
        count,
      });
    }
  }
};

const DFDeleteCart = async (req, res) => {
  const id = +req.params.id
  const userId = +req.params.userId
  await Cart.destroy({ where: { id: id } })
  const remainingCart = await Cart.findAll({ where: { userId: userId }, include: { model: Product, include: Category } })
  // res.status(200).send({ message: `Item with id: ${id} has been deleted`, items: remainingCart, count: remainingCart.length })
  const { rows, count } = await Cart.findAndCountAll({ where: { userId: userId }, include: { model: Product, include: Category } })
  const totalQty = await Cart.sum('qty', { where: { userId, userId } })
  const subTotal = () => {
    let total = 0
    remainingCart.forEach(item => {
      total += item.product.sell_price * item.qty
    })
    return total
  }
  res.status(200).send({ count: totalQty, subTotal: subTotal(), remainingCart: remainingCart, length: remainingCart.length })
}

const DFUpdate = async (req, res) => {
  const id = +req.params.id;
  const userId = +req.params.userId;
  const productId = +req.params.productId;
  const update = await Cart.update(
    { qty: req.body.qty },
    { where: { id: id } }
  );
  const { rows, count } = await Cart.findAndCountAll({
    where: { userId: userId },
    include: Product,
  });
  console.log(id, userId, req.body.qty);

  const totalQty = await Cart.sum("qty", { where: { userId: userId } });

  const subTotal = () => {
    let total = 0;
    rows.forEach((item) => {
      total += item.product.sell_price * item.qty;
    });
    return total;
  };

  console.log(totalQty, subTotal());
  res.status(200).send({ count: totalQty, subTotal: subTotal() });
};

module.exports = {
  getCartByUserId,
  updateCartRow,
  DFGetCartItems,
  DFAddcart,
  DFDeleteCart,
  DFUpdate,
};
