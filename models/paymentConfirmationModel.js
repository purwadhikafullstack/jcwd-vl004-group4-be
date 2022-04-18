module.exports = (sequelize, DataTypes) => {
    const Payment_confirmation = sequelize.define('payment_confirmation', {
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        is_confirmed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }
    )

    return Payment_confirmation
}