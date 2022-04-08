const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nodemailer.purwadhika@gmail.com",
    pass: "mlzmsuxnpfqhmgde",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = transporter;
