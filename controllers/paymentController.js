const db = require('../models')
const multer = require('multer')
const path = require('path')

const paymentConfirmation = db.payment_confirmations
const Cart = db.carts
const InvoiceHeader = db.invoice_headers

const add = async (req, res) => {

    const data = {
        image: req.file.path,
        invoiceHeaderId: req.body.invoiceHeaderId,
        adminId: req.body.adminId
    }

    const userId = +req.params.userId

    const payment = await paymentConfirmation.create(data)
    await Cart.destroy({ where: { userId: userId } })
    res.status(201).send('Your payment has been recorded')
    console.log(payment)
}

// get invoiceHeader id for payment
const getinvoiceheaderId = async (req, res) => {
    const userId = +req.params.userId

    const invoiceHeader = await InvoiceHeader.findOne({ where: { userId: userId } })
    res.status(200).send(invoiceHeader)
}

const storage = multer.diskStorage({
    // folder to which the file has been saved
    destination: (req, file, cb) => {
        cb(null, "public/paymentConfirmation");
    },
    // name of the file within destination
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: "5000000" },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const mimeType = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(path.extname(file.originalname));

        if (mimeType && extname) {
            return cb(null, true);
        }
        cb("Please Give a proper file format to upload!");
    },
}).single("image");

module.exports = {
    add,
    getinvoiceheaderId,
    upload

}
