const Crypto = require("crypto");

module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define(
    "admin",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: {
            args: true,
            msg: "Invalid email address",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: {
            args: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/,
            msg: "Password must contain at least eight characters, at least one number and both lower and uppercase letters, and special characters",
          },
        },
      },
      is_super_admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      hooks: {
        afterValidate: (admin, options) => {
          admin.password = Crypto.createHmac("sha1", "hash123")
            .update(admin.password)
            .digest("hex");
        },
      },
    }
  );

  return Admin;
};
