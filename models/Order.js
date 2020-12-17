const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Order = sequelize.define("Order", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  totalPrice: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  cutlery: Sequelize.INTEGER,
  take: Sequelize.INTEGER,
  orderType: Sequelize.INTEGER,
});

module.exports = Order;
