const db = require('../models')

const Category = db.categories


const addCategory = async (req, res) => {
    let info = {
        name: req.body.name
    }

    const category = await Category.create(info)
    res.status(200).send(category)
    console.log(category)
}

module.exports ={
    addCategory
}