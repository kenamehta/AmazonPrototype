const Sequelize = require("sequelize");
const connection = require("../connections/sequelize_connection");

const Dt = Sequelize.DataTypes;

//cutsomer registration model
const order = {
  order_id: {
    type: Dt.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: Dt.UUIDV1
  },
  CustomerEmailID: {
    type: Dt.STRING(50),
    allowNull: false
  },

  Address_details: {
    type: Dt.STRING(50),
    allowNull: false
  },
  cardNumber: {
    type: Dt.STRING(50),
    allowNull: false
  },
  cardName: {
    type: Dt.STRING(50),
    allowNull: false
  },
  cvv: {
    type: Dt.STRING(50),
    allowNull: false
  },
  validThru: {
    type: Dt.STRING(50),
    allowNull: false
  },
  cancelOrder: {
    type: Dt.BOOLEAN,
    defaultValue: false
  }
};
const Order = connection.define("Order", order);

//cutsomer registration model
const orderproduct = {
  _id: {
    type: Dt.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: Dt.UUIDV1
  },
  Product_id: {
    type: Dt.STRING(50),
    allowNull: false
  },
  quantity: {
    type: Dt.DOUBLE,
    allowNull: false
  },
  TotalPrice: {
    type: Dt.DOUBLE,
    allowNull: false
  },
  Status: {
    type: Dt.STRING(50),
    allowNull: false
  },
  seller_email_id: {
    type: Dt.STRING(50),
    allowNull: false
  },
  customer_email_id: {
    type: Dt.STRING(50),
    allowNull: false
  },
  cancelProduct: {
    type: Dt.BOOLEAN,
    defaultValue: false
  },
  giftFlag: {
    type: Dt.BOOLEAN,
    defaultValue: false
  },
  giftmsg: {
    type: Dt.STRING(50)
  }
};
const OrderProduct = connection.define("OrderProduct", orderproduct);

connection.sync();

OrderProduct.belongsTo(Order, { foreignKey: "order_id" });

module.exports = {
  Order,
  OrderProduct
};
