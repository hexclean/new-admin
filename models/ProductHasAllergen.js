const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const ProductHasAllergen = sequelize.define("productHasAllergen", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = ProductHasAllergen;
