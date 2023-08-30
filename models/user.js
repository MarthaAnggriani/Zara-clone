'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product, { foreignKey: "authorId" });
    }

    verifyPassword(password) {
      return bcrypt.compareSync(password, this.password);
    }

  }
  User.init({
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Email is already registered"
      },
      validate: {
        notNull: { msg: "Email is required." },
        notEmpty: { msg: "Email is required." },
        isEmail: { msg: "Invalid email format" }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password is required."
        },
        notEmpty: {
          msg: "Password is required."
        },
        len: {
          args: [5],
          msg: "Minimal password 5 characters."
        }
      }
    },
    role: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user) => {
    // hooks untuk default role
    user.role = "admin";
    // hooks untuk enkripsi password
    var salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);
  })

  User.afterCreate((user) => {
    delete user.dataValues.password;
  })
  return User;
};