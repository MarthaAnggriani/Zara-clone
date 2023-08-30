'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.hasMany(models.Favorite, { foreignKey: "CustomerId" });
    }
    verifyPassword(password) {
      return bcrypt.compareSync(password, this.password);
    }
  }
  Customer.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "email is required."
        },
        notEmpty: {
          msg: "email is required."
        },
        isEmail: {
          msg: "Format email invalid."
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "Password is required."
        },
        notEmpty: {
          msg: "Password is required."
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'customer'
    }
  }, {
    sequelize,
    modelName: 'Customer',
  });
  Customer.beforeCreate((customer) => {
    // hooks untuk default role
    customer.role = "customer";
    // hooks untuk enkripsi password
    var salt = bcrypt.genSaltSync(10);
    customer.password = bcrypt.hashSync(customer.password, salt);
  })
  return Customer;
};