const router = require('express').Router()
const paymentController = require('../controllers/paymentController')

// routers

router.post('/add-payment/:userId', paymentController.upload, paymentController.add)

router.post('/get-header-id/:userId', paymentController.getinvoiceheaderId)

module.exports = router
