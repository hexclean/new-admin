const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const OrderItem = sequelize.define("OrderItem", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  quantity: Sequelize.INTEGER,
  message: Sequelize.STRING,
});

module.exports = OrderItem;
