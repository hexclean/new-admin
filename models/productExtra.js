const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const productExtras = sequelize.define("productExtras", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = productExtras;
