const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const ExtraHasAllergen = sequelize.define("extraHasAllergen", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = ExtraHasAllergen;
