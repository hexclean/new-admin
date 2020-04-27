const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const VariantCategoryTranslation = sequelize.define(
  "variantCategoryTranslation",
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
    adminId: {
      type: Sequelize.INTEGER,
    },
  }
);

module.exports = VariantCategoryTranslation;
