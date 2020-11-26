const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const CategoryTranslation = sequelize.define("CategoryTranslation", {
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
    allowNull: false,
  },
});

module.exports = CategoryTranslation;
