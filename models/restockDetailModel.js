

module.exports = (sequelize, DataTypes) => {
    const RestockDetail = sequelize.define('restock_detail', {
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })

    return RestockDetail
}