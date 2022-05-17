module.exports = (sequelize, DataTypes) => {

    const invoice_header = sequelize.define('invoice_header', {
        invoice_code: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        shipping_price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        total_price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: 'unpaid'
        }
    })

    return invoice_header
}