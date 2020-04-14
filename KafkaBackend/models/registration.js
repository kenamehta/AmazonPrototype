const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const connection = require("../connections/sequelize_connection");

const Dt = Sequelize.DataTypes;

//cutsomer registration model
const cust_register = {
  _id: {
    type: Dt.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: Dt.UUIDV1
  },
  name: {
    type: Dt.STRING(50),
    allowNull: false
  },
  emailId: {
    type: Dt.STRING(50),
    allowNull: false,
    unique: true
  },
  password: { type: Dt.STRING(200), allowNull: false }
};
const customerRegister = connection.define("customerRegister", cust_register);

//cutsomer registration model
const seller_register = {
  _id: {
    type: Dt.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: Dt.UUIDV1
  },
  name: {
    type: Dt.STRING(50),
    allowNull: false
  },
  emailId: {
    type: Dt.STRING(50),
    allowNull: false,
    unique: true
  },
  password: { type: Dt.STRING(200), allowNull: false }
};
const sellerRegister = connection.define("sellerRegister", seller_register);

connection.sync();

module.exports = {
  customerRegister,
  sellerRegister
};
