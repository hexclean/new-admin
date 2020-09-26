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
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  discountedPrice: {
    type: Sequelize.FLOAT,
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
  requiredExtra: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = ProductVariantsExtras;
