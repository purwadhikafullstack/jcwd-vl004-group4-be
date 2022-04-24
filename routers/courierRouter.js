const router = require('express').Router()
const courierController = require('../controllers/courierController')

// Route

router.post('/add-courier', courierController.addCourier)

router.get('/get-all-courier', courierController.getAllCourier)

module.exports = router