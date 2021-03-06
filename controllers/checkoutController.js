const db = require('../models')

const InvoiceHeaders = db.invoice_headers
const InvoiceDetail = db.invoice_details
const Product = db.products
const Cart = db.carts

const addInvoice = async (req, res) => {
    let data = {
        invoice_code: req.body.invoice_code,
        shipping_price: req.body.shipping_price,
        total_price: req.body.total_price,
        userId: req.body.userId
    }

    const cartItems = await Cart.findAll({ where: { userId: req.body.userId }, include: { model: Product } })

    const invoiceHeader = await InvoiceHeaders.create(data)
    const invoiceDetail = await InvoiceDetail.bulkCreate(
        cartItems.map(item => ({
            price: item.product.sell_price,
            qty: item.qty,
            invoiceHeaderId: invoiceHeader.id,
            productId: item.product.id
        }))
    )
    res.status(200).send({ invoiceHeader: invoiceHeader, invoiceDetail: invoiceDetail, message: 'One checkout header has been created! ' })
    console.log(invoiceHeader)

}

module.exports = {
    addInvoice,
}