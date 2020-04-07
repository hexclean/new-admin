const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const ProductTranslation = sequelize.define("productTranslation", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,

    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
  },

  description: {
    type: Sequelize.STRING,
  },
  category: {
    type: Sequelize.ENUM("dailyMenu", "pizza", "chicken"),
  },
});

module.exports = ProductTranslation;
