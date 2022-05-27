const db = require("../models");
const { sequelize } = require("../models");
const { QueryTypes } = require("sequelize");
const InvoiceHeaders = db.invoice_headers;
const InvoiceDetails = db.invoice_details;
const Products = db.products;
const Users = db.users;

const getDisplayReport = async (req, res) => {
  try {
    // by default limit is 5
    let limit = 10;
    if (req.query.limit) limit = +req.query.limit;

    // by default offset is 0
    let offset = 0;
    if (req.query.offset) offset = +req.query.offset;

    console.log(req.user);

    const rowCount = await InvoiceHeaders.count({
      where: {
        status: "completed",
      },
    });

    // Model.findAll() : read the whole products table
    let items = await InvoiceHeaders.findAll({
      limit: limit,
      offset: offset,
      order: [["createdAt", "DESC"]],
      include: [
        Users,
        {
          model: InvoiceDetails,
          include: [Products],
        },
      ],
      where: {
        status: "completed",
      },
    });

    res.status(200).send({
      pageCount: Math.ceil(rowCount / limit),
      rowCount,
      items,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Server error occured: " + err });
  }
};

const getSummaryReport = async (req, res) => {
  try {
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
      from invoice_details ID
      inner join invoice_headers IH on IH.id = ID.invoiceHeaderId
      where IH.createdAt > '${min}' and IH.createdAt < '${max}'
      and IH.status = 'completed';   
    `);

    let top3 = await db.sequelize.query(
      `
      select
      PR.name,
      PR.id,
      sum(qty) as qtySold
      from invoice_details ID
      inner join products PR on PR.id = ID.productId
      where ID.createdAt > '${min}' and ID.createdAt < '${max}'
      group by productId
      order by sum(qty) desc
      limit 3
      `,
      QueryTypes.SELECT
    );
    top3 = top3[0];
    console.log(top3);

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
    report.topProducts = top3;

    res.status(200).send(report);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Server error occured: " + err });
  }
};

const getRevenueChart = async (req, res) => {
  try {
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
  where createdAt > '${min}' and createdAt < '${max}' and status = 'completed'
  group by date(createdAt)
  order by date(createdAt);`,
      { type: QueryTypes.SELECT }
    );
    // We didn't need to destructure the result here - the results were returned directly

    res.status(200).send(revenueChart);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Server error occured: " + err });
  }
};

const getProfitChart = async (req, res) => {
  try {
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
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Server error occured: " + err });
  }
};

module.exports = {
  getDisplayReport,
  getSummaryReport,
  getRevenueChart,
  getProfitChart,
};
