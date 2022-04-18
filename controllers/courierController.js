const db = require('../models')

const Courier = db.couriers


const addCourier = async (req, res) => {
    let data = {
        name: req.body.name,
        invoiceHeaderId: req.body.invoiceHeaderId
    }

    const courier = await Courier.create(data)
    res.status(200).send(courier)
    console.log(courier)
}

const getAllCourier = async (req, res) => {

    const couriers = await Courier.findAll()
    res.status(200).send(couriers)
    console.log(couriers)

}

module.exports ={
    addCourier,
    getAllCourier
}