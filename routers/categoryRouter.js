const categoryController = require('../controllers/categoryController')
const router = require('express').Router()


router.post('/add-category', categoryController.addCategory)

module.exports = router