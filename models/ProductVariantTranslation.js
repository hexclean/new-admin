const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const ProductVariantTranslation = sequelize.define(
  "productVariantTranslation",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    sku: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  }
);

module.exports = ProductVariantTranslation;
