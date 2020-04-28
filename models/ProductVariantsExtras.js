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
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  discountedPrice: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  quantityMin: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  quantityMax: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  active: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = ProductVariantsExtras;
