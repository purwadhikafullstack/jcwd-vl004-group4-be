const reportController = require("../controllers/reportController");
const router = require("express").Router();
const { auth } = require("../helper/authToken");




router.get("/get-display-report", auth, reportController.getDisplayReport);
router.get("/get-filter-report", auth, reportController.getSummaryReport);
router.get("/get-revenue-chart",  reportController.getRevenueChart);
router.get("/get-profit-chart",  reportController.getProfitChart);

module.exports = router;
