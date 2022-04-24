// it will update the database tables to match models so dont need to manually make changes in db

const db = require("../models");

const User = db.users;
const InvoiceHeader = db.invoice_headers;
const InvoiceDetails = db.invoice_details;
const Admins = db.admins;

async function sync() {
  await User.sync({ alter: true });
  await Admins.sync({ alter: true });
  await InvoiceHeader.sync({ alter: true });
  await InvoiceDetails.sync({ alter: true });
}

sync();
