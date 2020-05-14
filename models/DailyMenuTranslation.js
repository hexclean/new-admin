const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const DailyMenuTranslation = sequelize.define("dailyMenuTranslation", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  description: {
    type: Sequelize.STRING,
  },
  adminId: {
    type: Sequelize.INTEGER,
  },
});

module.exports = DailyMenuTranslation;
