const db = require("../models");
const { createToken } = require("../helper/createToken");
const Crypto = require("crypto");
const transporter = require("../helper/nodemailer");

const Admin = db.admins;

const getAdmin = async (req, res) => {
  let info = {
    email: req.body.email,
    password: req.body.password,
  };

  info.password = Crypto.createHmac("sha1", "hash123")
    .update(info.password)
    .digest("hex");

  const admin = await Admin.findOne({
    where: {
      email: info.email,
      password: info.password,
    },
  });

  if (admin === null) {
    res.status(406).send({ message: "Invalid email / password" });
  } else {
    // res.status(200).send(admin);
    let { id, username, email, password, createdAt, updatedAt } = admin;

    let token = createToken({
      id,
      username,
      email,
      password,
      createdAt,
      updatedAt,
    });

    res.status(200).send({ dataLogin: admin, token, message: "Login success" });
  }
};

const addAdmin = async (req, res) => {
  let info = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  };

  const admin = await Admin.create(info);
  res.status(200).send(admin);
};

const forgotPasswordAdmin = async (req, res) => {
  let email = req.body.email;

  const admin = await Admin.findOne({
    where: { email },
  });

  if (admin === null) {
    res.status(406).send({ message: "Admin Email address not found" });
  } else {
    let token = createToken({ email });
    let mail = {
      from: `ADMIN <nodemailer.purwadhika@gmail.com>`,
      to: `${email}`,
      subject: `Admin Reset Password`,
      html: `<a href='http://localhost:3000/admin/reset-password/${token}'>Click here for reset password</a>`,
    };

    transporter.sendMail(mail, (err, result) => {
      if (err) {
        res.status(406).send({
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

const resetPasswordAdmin = async (req, res) => {
  try {
    const resetPassword = await Admin.update(
      { password: req.body.password },
      { where: { email: req.user.email } }
    );
    res
      .status(200)
      .send({ success: true, message: "Admin password reset success" });
  } catch (err) {
    res.status(500).send({ message: "admin reset failed" });
  }
};

const adminKeepLogin = async (req, res) => {
  try {
    const keepLogin = await Admin.findByPk(req.user.id);
    // res.status(200).send(keepLogin);
    let { id, username, email, password, createdAt, updatedAt } = keepLogin;

    let token = createToken({
      id,
      username,
      email,
      password,
      createdAt,
      updatedAt,
    });

    res
      .status(200)
      .send({ dataLogin: keepLogin, token, message: "Login success" });
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  getAdmin,
  addAdmin,
  forgotPasswordAdmin,
  resetPasswordAdmin,
  adminKeepLogin,
};
