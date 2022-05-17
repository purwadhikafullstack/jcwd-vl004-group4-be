const db = require("../models");
const { createToken } = require("../helper/createToken");
const transporter = require("../helper/nodemailer");
const { sequelize, invoice_headers } = require("../models");
const Crypto = require("crypto");

const User = db.users;
const Cart = db.carts;
const Address = db.addresses;
const InvoiceDetails = db.invoice_details;
const InvoiceHeaders = db.invoice_headers;
const Products = db.products;
const Payments = db.payment_confirmations;

const addUser = async (req, res) => {
  let info = {
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    phone: req.body.phone,
  };

  try {
    const user = await User.create(info);
    //   res.status(200).send(user);
    if (user.dataValues.id) {
      const userSuccess = await User.findByPk(user.dataValues.id);
      let {
        id,
        name,
        email,
        username,
        password,
        phone,
        status,
        is_active,
        createdAt,
        updatedAt,
      } = user.dataValues;

      let token = createToken({
        id,
        name,
        email,
        username,
        password,
        phone,
        status,
        is_active,
        createdAt,
        updatedAt,
      });

      // res.status(200).send(token);

      let mail = {
        from: `ADMIN <nodemailer.purwadhika@gmail.com>`,
        to: `${email}`,
        subject: `Account Verification`,
        html: `<a href='http://localhost:3000/verification/${token}'>Click here for verification</a>`,
      };

      transporter.sendMail(mail, (err, result) => {
        if (err) {
          res.status(500).send({
            message: "Registration Failed",
            success: false,
            err,
          });
          console.log(err);
        }
        res.status(200).send({
          message: "Registration Success, Check Your Email",
          success: true,
        });
        console.log(result);
      });
    }
  } catch (err) {
    res.status(500).send({ message: err.errors[0].message });
  }
};

const verifUser = async (req, res) => {
  //   console.log(`VerifUser => ${req.user.id}`);
  const updateVerif = await sequelize.query(
    `Update users set status = 'verified' where id = ${req.user.id};`
  );
  res.status(200).send({ message: "Account verified", success: true });
};

const getUser = async (req, res) => {
  let info = {
    email: req.body.email,
    password: req.body.password,
  };

  info.password = Crypto.createHmac("sha1", "hash123")
    .update(info.password)
    .digest("hex");

  const user = await User.findOne({
    where: {
      email: info.email,
      password: info.password,
    },
    include: Cart,
  });

  if (user === null) {
    res.status(406).send({ message: "Invalid email / password" });
  } else {
    // res.status(200).send(user);
    let {
      id,
      name,
      email,
      username,
      password,
      phone,
      status,
      is_active,
      createdAt,
      updatedAt,
    } = user;

    let token = createToken({
      id,
      name,
      email,
      username,
      password,
      phone,
      status,
      is_active,
      createdAt,
      updatedAt,
    });

    if (status !== "verified") {
      res.status(500).send({ message: "Your account is not verified" });
    }
    if (!is_active) {
      res.status(500).send({ message: "Your account is banned" });
    } else {
      res
        .status(200)
        .send({ dataLogin: user, token, message: "Login success" });
    }
  }
};

const forgotPasswordUser = async (req, res) => {
  let email = req.body.email;

  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (user === null) {
    res.status(406).send({ message: "Email address not found" });
  } else {
    let token = createToken({ email });

    // res.status(200).send({ dataLogin: user, token });

    let mail = {
      from: `ADMIN <nodemailer.purwadhika@gmail.com>`,
      to: `${email}`,
      subject: `Reset Password`,
      html: `<a href='http://localhost:3000/reset-password/${token}'>Click here for reset password</a>`,
    };

    transporter.sendMail(mail, (err, result) => {
      if (err) {
        res.status(500).send({
          message: "Password reset failed",
          success: false,
          err,
        });
        console.log(err);
      }
      res.status(200).send({
        message: "Check Your Email",
        success: true,
      });
      console.log(result);
    });
  }
};
const resetPasswordUser = async (req, res) => {
  try {
    const resetPassword = await User.update(
      { password: req.body.password },
      {
        where: { email: req.user.email },
      }
    );
    res.status(200).send({ success: true, message: "password reset success" });
  } catch (err) {
    res.status(500).send({ message: "reset failed" });
  }
};

const userKeepLogin = async (req, res) => {
  try {
    const keepLogin = await User.findByPk(req.user.id, { include: Cart });
    // res.status(200).send(keepLogin);
    let {
      id,
      name,
      email,
      username,
      password,
      phone,
      status,
      is_active,
      createdAt,
      updatedAt,
    } = keepLogin;

    let token = createToken({
      id,
      name,
      email,
      username,
      password,
      phone,
      status,
      is_active,
      createdAt,
      updatedAt,
    });

    res
      .status(200)
      .send({ dataLogin: keepLogin, token, message: "Login success" });
  } catch (error) {
    res.status(500).send(error);
  }
};

const getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    let user = await User.findOne({ where: { id: id } });
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const editUserData = async (req, res) => {
  const id = +req.params.id;
  try {
    let { name, username, phone } = req.body;
    let dataUpdate = [];

    for (let prop in req.body) {
      dataUpdate.push(`${prop} = '${req.body[prop]}'`);
    }
    let user = await sequelize.query(
      `UPDATE users set ${dataUpdate} where id = ${id};`
    );
    let updatedUser = await User.findOne({
      where: { id: id },
      include: Address,
    });
    res.status(200).send({ user: updatedUser, message: "Profile updated" });
    // console.log(user);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
};

const checkPassword = async (req, res) => {
  const id = +req.params.id;

  password = Crypto.createHmac("sha1", "hash123")
    .update(req.body.password)
    .digest("hex");
  try {
    const check = await User.findOne({
      where: {
        id: id,
        password: password,
      },
    });

    if (check === null) {
      res
        .status(406)
        .send({ success: "false", message: "Password does not match" });
    } else {
      res.status(200).send({ success: "true" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const changePassword = async (req, res) => {
  const id = +req.params.id;

  try {
    let changeUserPassword = await User.update(
      {
        password: req.body.newPassword,
      },
      { where: { id: id } }
    );
    res.status(200).send({ success: true, message: "Password changed" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const addUserAddress = async (req, res) => {
  const userId = +req.params.id;

  try {
    let info = {
      street: req.body.street,
      district: req.body.district,
      city: req.body.city,
      province: req.body.province,
      postal_code: req.body.postal_code,
      userId: +req.params.id,
    };

    const address = await Address.create(info);
    let newAddress = await Address.findAll({ where: { userId: userId } });
    res.status(200).send(newAddress);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const editUserAddress = async (req, res) => {
  const userId = +req.params.id;
  const addressId = req.body.id;
  try {
    let { street, district, city, province, postal_code } = req.body;

    let address = await Address.update(req.body, {
      where: { userId: userId, id: addressId },
    });
    let updatedAddress = await Address.findOne({
      where: { userId: userId, id: addressId },
    });

    res.status(200).send(updatedAddress);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteAddress = async (req, res) => {
  const userId = +req.params.id;
  const addressId = +req.body.id;

  try {
    let address = await Address.destroy({
      where: { id: addressId, userId: userId },
    });
    let newAddress = await Address.findAll({ where: { userId: userId } });
    res.status(200).send({ message: "Address deleted", dataNew: newAddress });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getAddressById = async (req, res) => {
  const userId = +req.params.id;

  try {
    let address = await Address.findAll({ where: { userId: userId } });
    res.status(200).send(address);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getTransactionHistory = async (req, res) => {
  const userId = +req.params.id;
  try {
    let invoice = await InvoiceHeaders.findAll({
      where: { userId: userId },
      include: [
        {
          model: InvoiceDetails,
          include: { model: Products },
        },
        { model: Payments },
      ],
    });
    res.status(200).send(invoice);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  addUser,
  verifUser,
  getUser,
  forgotPasswordUser,
  resetPasswordUser,
  userKeepLogin,
  getUserById,
  editUserData,
  checkPassword,
  changePassword,
  addUserAddress,
  editUserAddress,
  deleteAddress,
  getAddressById,
  getTransactionHistory,
};
