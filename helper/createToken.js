require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = {
  createToken: (payload) => {
    return jwt.sign(payload, process.env.JWT_KEY, {
      expiresIn: "12h",
    });
  },
};
