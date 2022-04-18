
module.exports = (sequelize, DataTypes) => {
    
    const RestockHeader = sequelize.define('restock_header', {
        shipping_price: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })

    return RestockHeader
}