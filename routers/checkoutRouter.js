const checkoutController = require('../controllers/checkoutController')
const router = require('express').Router()

router.post('/invoice/add', checkoutController.addInvoice)

module.exports = router