const Crypto = require("crypto");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Email address already exist",
        },
        validate: {
          isEmail: {
            args: true,
            msg: "Invalid email address",
          },
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Username already exist",
        },
        validate: {
          max: {
            args: 15,
            msg: "Username Must be 15 character or less",
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
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "unverified",
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      hooks: {
        afterValidate: (user, options) => {
          user.password = Crypto.createHmac("sha1", "hash123")
            .update(user.password)
            .digest("hex");
        },
      },
    }
  );

  return User;
};
