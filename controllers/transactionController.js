const db = require("../models");
const { sequelize, invoice_details } = require("../models");
const { Op } = require("sequelize");
const InvoiceHeaders = db.invoice_headers;
const InvoiceDetails = db.invoice_details;
const Products = db.products;
const Users = db.users;
const Admins = db.admins;
const PaymentConfirm = db.payment_confirmations;

const modify_transaction = async (req, res) => {
  console.log(req.body);
  if (!req.body.headerId)
    return res.status(400).send({ message: "headerId is required" });

  try {
    // set is_confirmed and adminId in payment_confirmation
    let result = await PaymentConfirm.update(
      { is_confirmed: req.body.is_confirmed, adminId: req.user.id },
      {
        where: {
          invoiceHeaderId: req.body.headerId,
        },
      }
    );
    // set adminId in order_headers
    result = await InvoiceHeaders.update(
      { status: req.body.is_confirmed ? "on process" : "rejected" },
      {
        where: {
          id: req.body.headerId,
        },
      }
    );

    const paidProducts = await InvoiceDetails.findAll({
      where: { invoiceHeaderId: req.body.headerId },
      include: [{ model: Products }],
    });
    await paidProducts.map((product) => {
      Products.update(
        { stock: product.product.stock - product.qty },
        { where: { id: product.product.id } }
      );
    });

    return res.status(200).send({ message: "Success", paidProducts });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Server error occured: " + err });
  }
};

const getDisplayTransaction = async (req, res) => {
  let date = new Date();
  let max = date.toISOString().slice(0, 19).replace("T", " ");

  date.setDate(date.getDate() - 30);

  let min = date.toISOString().slice(0, 19).replace("T", " ");
  console.log(min, max);

  try {
    if (req.query.min) min = req.query.min;
    if (req.query.max) max = req.query.max;

    // by default limit is 5
    let limit = 10;
    if (req.query.limit) limit = +req.query.limit;

    // by default offset is 0
    let offset = 0;
    if (req.query.offset) offset = +req.query.offset;

    console.log("user", req.user);

    const rowCount = await InvoiceHeaders.count({
      where: {
        createdAt: {
          [Op.gt]: min, // less than
          [Op.lt]: max, // greater than
        },
      },
    });

    // Model.findAll() : read the whole products table
    let items = await InvoiceHeaders.findAll({
      limit: limit,
      offset: offset,
      order: [["createdAt", "DESC"]],
      include: [
        Users,
        { model: PaymentConfirm, include: Admins },
        {
          model: InvoiceDetails,
          include: [Products],
        },
      ],
      where: {
        createdAt: {
          [Op.gt]: min, // less than
          [Op.lt]: max, // greater than
        },
      },
    });

    res.status(200).send({
      pageCount: Math.ceil(rowCount / limit),
      rowCount,
      items,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Server error occured: " + err });
  }
};

const approveTransaction = async (req, res) => {
  const userId = +req.params.id;
  try {
    let approved = await InvoiceHeaders.update(
      { status: "completed" },
      {
        where: {
          userId: userId,
          id: req.body.id,
        },
      }
    );

    res
      .status(200)
      .send({
        success: true,
        message: "Thank you for shopping at Pharmadika, enjoy our products",
      });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getDisplayTransaction,
  modify_transaction,
  approveTransaction,
};
