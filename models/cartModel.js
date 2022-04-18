

module.exports = (sequelize, DataTypes) => {

    const Cart = sequelize.define('cart', {
        qty: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    })

    return Cart
}