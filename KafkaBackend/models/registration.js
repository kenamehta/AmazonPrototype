const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const connection = require("../connections/sequelize_connection");

const Dt = Sequelize.DataTypes;

//cutsomer registration model
const cust_register = {
  _id: {
    type: Datatypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: Datatypes.UUIDV1
  },
  name: {
    type: Datatypes.STRING(50),
    allowNull: false
  },
  emailId: {
    type: Datatypes.STRING(50),
    allowNull: false,
    unique: true
  }
};
const customerRegister = connection.define("customerRegister", cust_register);

//cutsomer registration model
const seller_register = {
  _id: {
    type: Datatypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: Datatypes.UUIDV1
  },
  name: {
    type: Datatypes.STRING(50),
    allowNull: false
  },
  emailId: {
    type: Datatypes.STRING(50),
    allowNull: false,
    unique: true
  }
};
const sellerRegister = connection.define("sellerRegister", seller_register);

connection.sync();

module.exports = {
  customerRegister,
  sellerRegister
};
