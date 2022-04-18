module.exports = (sequelize, DataTypes) => {

    const invoice_detail = sequelize.define('invoice_detail', {
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        qty: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })

    return invoice_detail
}