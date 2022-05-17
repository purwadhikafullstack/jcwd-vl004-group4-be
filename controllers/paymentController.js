const db = require('../models')
const multer = require('multer')
const path = require('path')

const paymentConfirmation = db.payment_confirmations
const Cart = db.carts
const InvoiceHeader = db.invoice_headers
const InvoiceDetail = db.invoice_details

const add = async (req, res) => {

    const data = {
        image: req.file.path,
        invoiceHeaderId: req.body.invoiceHeaderId,
        adminId: req.body.adminId
    }

    const userId = +req.params.userId

    const payment = await paymentConfirmation.create(data)
    await InvoiceHeader.update(
        { status: 'pending' },
        { where: { userId: userId } }
    )

    await Cart.destroy({ where: { userId: userId } })
    res.status(201).send('Your payment has been recorded and can be seen in history transaction')
    console.log(payment)
}

// get invoiceHeader id for payment
const getinvoiceheaderId = async (req, res) => {
    const userId = +req.params.userId

    const invoiceHeader = await InvoiceHeader.findOne({
        where: { userId: userId },
        order: [['createdAt', 'DESC']]
    })
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

const cancelCheckout = async (req, res) => {

    const userId = +req.params.userId
    const header = await InvoiceHeader.findOne({
        where: { userId: userId },
        order: [['createdAt', 'DESC']]
    })

    const deletedDetail = await InvoiceDetail.destroy({
        where: { invoiceHeaderId: header.id },
        order: [['createdAt', 'DESC']]
    })
    const deletedHeader = await InvoiceHeader.destroy({ where: { status: 'unpaid', userId: userId } })
    const deletedCart = await Cart.destroy({ where: { userId: userId } })

    res.status(200).send({ deletedDetail, deletedHeader, deletedCart, message: 'Your checkout has been canceled!' })

}

module.exports = {
    add,
    getinvoiceheaderId,
    cancelCheckout,
    upload

}
