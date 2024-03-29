const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const OpeningHoursTranslation = sequelize.define("OpeningHoursTranslation", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: Sequelize.STRING,
});

module.exports = OpeningHoursTranslation;
