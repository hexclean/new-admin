const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const UserDeliveryAddress = sequelize.define("userDeliveryAdress", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  street: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  houseNumber: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = UserDeliveryAddress;