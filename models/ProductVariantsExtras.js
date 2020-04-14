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
    type: Sequelize.STRING,
    allowNull: false,
  },
  discountedPrice: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  quantityMin: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  quantityMax: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  mandatory: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  active: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = ProductVariantsExtras;
