const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const ProductCategoryTranslation = sequelize.define(
  "productCategoryTranslation",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: Sequelize.STRING,
  }
);

module.exports = ProductCategoryTranslation;
