const { createOrUpdate } = require("../helper/sqlhelper");
const db = require("../models");
const Cart = db.carts;
const User = db.users

const getCartByUserId = async (req, res) => {
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

// if want to remove all cart and add new items. Not being used for now
const replaceCart = async (req, res) => {
    const id = req.query.userId;
    if (!id) return res.status(400).send({ message: "userId is required" });
    await Cart.destroy({ where: { userId: id } });
    let cart = await Cart.bulkCreate(req.body);
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

module.exports = {
    getCartByUserId,
    replaceCart,
    updateCartRow,
};
