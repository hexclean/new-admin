const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const UserDeliveryAdress = sequelize.define("userDeliveryAdress", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
  },
});

module.exports = UserDeliveryAdress;
