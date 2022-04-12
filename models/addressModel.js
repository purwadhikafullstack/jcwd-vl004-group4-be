module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define(
    "address",
    {
      street: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      disctrict: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      province: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      postal_code: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      paranoid: true,
    }
  );

  return Address;
};
