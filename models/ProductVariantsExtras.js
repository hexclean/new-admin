const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const ProductVariantsExtras = sequelize.define("productVariantsExtras", {
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

module.exports = ProductVariantsExtras;
