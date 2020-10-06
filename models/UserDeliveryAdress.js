const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const UserDeliveryAdress = sequelize.define("userDeliveryAdress", {
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

module.exports = UserDeliveryAdress;
