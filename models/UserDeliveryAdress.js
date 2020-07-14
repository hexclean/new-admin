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
    allowNull: false,
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
  floor: {
    type: Sequelize.STRING,
  },
  doorNumber: {
    type: Sequelize.STRING,
  },
  doorBell: {
    type: Sequelize.STRING,
  },
});

module.exports = UserDeliveryAdress;
