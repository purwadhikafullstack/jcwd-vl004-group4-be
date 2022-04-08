const jwt = require("jsonwebtoken");

module.exports = {
  auth: (req, res, next) => {
    jwt.verify(req.token, "private123", (err, decode) => {
      if (err) {
        return res.status(401).send("user not authenticated");
      }

      req.user = decode;

      console.log("req.user:", req.user);
      // utk melanjutkan ke middleware berikutnya diteruskan ke controller
      next();
    });
  },
  keeplogin: (req, res, next) => {
    jwt.verify(req.token, "private123", (err, decode) => {
      if (err) {
        return res.status(500).send(err);
      }

      req.user = decode;

      next();
    });
  },
};
