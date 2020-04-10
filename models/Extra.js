const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Extra = sequelize.define("extra", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
});

module.exports = Extra;
