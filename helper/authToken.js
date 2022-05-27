require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = {
  auth: (req, res, next) => {
    jwt.verify(req.token, process.env.JWT_KEY, (err, decode) => {
      if (err) {
        return res.status(401).send("user not authenticated");
      }

      req.user = decode;
      // console.log("authToken => req.user:", req.user);

      next();
    });
  },
  resetPassword: (req, res, next) => {
    jwt.verify(req.token, process.env.JWT_KEY, (err, decode) => {
      if (err) {
        return res.status(401).send("password reset failed");
      }

      req.user = decode;
      // console.log("resetPassword => req.user:", req.user);

      next();
    });
  },
  keepLogin: (req, res, next) => {
    jwt.verify(req.token, process.env.JWT_KEY, (err, decode) => {
      if (err) {
        return res.status(500).send(err);
      }

      req.user = decode;
      // console.log("keepLogin => req.user:", req.user);

      next();
    });
  },
};
