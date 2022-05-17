const db = require("../models");
const { sequelize } = require("../models");
const { QueryTypes, Op } = require("sequelize");
const InvoiceHeaders = db.invoice_headers;
const InvoiceDetails = db.invoice_details;
const Products = db.products;
const Users = db.users;
const Admins = db.admins;
const PaymentConfirm = db.payment_confirmations;

const getDisplayReport = async (req, res) => {
  if (!req.query.adminId)
    return res.status(400).send({ message: "adminId is required" });

  // by default limit is 5
  let limit = 10;
  if (req.query.limit) limit = +req.query.limit;

  // by default offset is 0
  let offset = 0;
  if (req.query.offset) offset = +req.query.offset;

  const rowCount = await InvoiceHeaders.count({
    where: {
      status: "paid",
    },
  });

  // Model.findAll() : read the whole products table
  let items = await InvoiceHeaders.findAll({
    limit: limit,
    offset: offset,
    include: [
      Users,
      {
        model: InvoiceDetails,
        include: [Products],
      },
    ],
    where: {
      status: "paid",
    },
  });

  res.status(200).send({
    pageCount: Math.ceil(rowCount / limit),
    rowCount,
    items,
  });
};

const getSummaryReport = async (req, res) => {
  if (!req.query.adminId)
    return res.status(400).send({ message: "adminId is required" });

  let date = new Date();
  let max = date.toISOString().slice(0, 19).replace("T", " ");

  date.setDate(date.getDate() - 30);

  let min = date.toISOString().slice(0, 19).replace("T", " ");
  console.log(min, max);

  if (req.query.min) min = req.query.min;
  if (req.query.max) max = req.query.max;

  // don't remove metadata even it is not used bcs it's array so it needs more than one data
  let [report, metadata] = await db.sequelize.query(`
    select 
    sum(qty) as number_of_sales,
    sum(price) as revenue
    from invoice_details
    where createdAt > '${min}' and createdAt < '${max}'
  `);

  report = report[0];
  report.numberOfSales = +report.number_of_sales;
  report.revenue = +report.revenue;
  report.fixedCost =
    ((new Date(max).getTime() - new Date(min).getTime()) /
      (1000 * 60 * 60 * 24)) *
    300000;
  report.operationalCost = report.revenue * 0.25; // calculate operational cost based percentage of revenue
  report.cost = report.fixedCost + report.operationalCost;
  report.profit = report.revenue - report.fixedCost - report.operationalCost;

  res.status(200).send(report);
};

const getRevenueChart = async (req, res) => {
  let date = new Date();
  let max = date.toISOString().slice(0, 19).replace("T", " ");

  date.setDate(date.getDate() - 30); // set min date to 30 days before ago
  let min = date.toISOString().slice(0, 19).replace("T", " ");
  console.log(min, max);

  if (req.query.min) min = req.query.min;
  if (req.query.max) max = req.query.max;

  const revenueChart = await sequelize.query(
    `
  select
  date(createdAt) as date,
  CAST(sum(total_price) As UNSIGNED) as revenue
  from invoice_headers
  where createdAt > '${min}' and createdAt < '${max}'
  group by date(createdAt)
  order by date(createdAt);`,
    { type: QueryTypes.SELECT }
  );
  // We didn't need to destructure the result here - the results were returned directly

  res.status(200).send(revenueChart);
};

const getProfitChart = async (req, res) => {
  let date = new Date();
  let max = date.toISOString().slice(0, 19).replace("T", " ");

  date.setDate(date.getDate() - 30); // set min date to 30 days before ago
  let min = date.toISOString().slice(0, 19).replace("T", " ");
  console.log(min, max);

  if (req.query.min) min = req.query.min;
  if (req.query.max) max = req.query.max;

  const profitChart = await sequelize.query(
    `
  select
  date(createdAt) as date,
  ((sum(total_price) * 0.75) - 300000) as profit
  from invoice_headers
  where createdAt > '${min}' and createdAt < '${max}'
  group by date(createdAt)
  order by date(createdAt);`,
    { type: QueryTypes.SELECT }
  );
  // We didn't need to destructure the result here - the results were returned directly

  res.status(200).send(profitChart);
};

module.exports = {
  getDisplayReport,
  getSummaryReport,
  getRevenueChart,
  getProfitChart,
};
