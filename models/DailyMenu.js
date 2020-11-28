const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const DailyMenu = sequelize.define("DailyMenu", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  active: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  dailyMenuImagePath: Sequelize.STRING,
});

module.exports = DailyMenu;
