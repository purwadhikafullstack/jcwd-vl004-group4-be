const db = require("../models");
const { createToken } = require("../helper/createToken");
const transporter = require("../helper/nodemailer");
const { sequelize } = require("../models");
const Crypto = require("crypto");

const User = db.users;
const Cart = db.carts

const addUser = async (req, res) => {
  let info = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
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
    res.status(500).send(err.message);
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
    include: Cart
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

module.exports = {
  addUser,
  verifUser,
  getUser,
  forgotPasswordUser,
  resetPasswordUser,
  userKeepLogin,
};
