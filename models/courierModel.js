
module.exports = (sequelize, DataTypes) => {
    const Courier = sequelize.define('courier', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    return Courier
}