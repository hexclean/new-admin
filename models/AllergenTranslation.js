const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const AllergenTranslation = sequelize.define("allergenTranslation", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  restaurantId: {
    type: Sequelize.INTEGER,
  },
});

module.exports = AllergenTranslation;
