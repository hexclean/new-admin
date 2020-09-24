const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const OpeningHoursTranslation = sequelize.define("openingHoursTranslation", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  day: Sequelize.STRING,
});

module.exports = OpeningHoursTranslation;
