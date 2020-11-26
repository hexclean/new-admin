const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const DailyMenuTranslation = sequelize.define("DailyMenuTranslation", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
});

module.exports = DailyMenuTranslation;
