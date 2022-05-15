const reportController = require("../controllers/reportController");
const router = require("express").Router();

router.get("/get-display-report", reportController.getDisplayReport);
router.get("/get-filter-report", reportController.getSummaryReport);
router.get("/get-revenue-chart", reportController.getRevenueChart);
router.get("/get-profit-chart", reportController.getProfitChart);

module.exports = router;
