const db = require("../models");
const { createToken } = require("../helper/createToken");
const transporter = require("../helper/nodemailer");

const User = db.users;

const addUser = async (req, res) => {
  let info = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  };

  const user = await User.create(info);
  try {
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  addUser,
};
