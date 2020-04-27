const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const VariantCategory = sequelize.define("variantCategory", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = VariantCategory;
