const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const DeliveryPrice = sequelize.define("DeliveryPrice", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  deliveryPrice: Sequelize.FLOAT,
  delivery: Sequelize.INTEGER,
  minimumOrder: Sequelize.FLOAT,
  freeDelivery: Sequelize.FLOAT,
});

module.exports = DeliveryPrice;
