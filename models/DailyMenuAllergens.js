const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const DailyMenuAllergens = sequelize.define("dailyMenuAllergens", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = DailyMenuAllergens;
