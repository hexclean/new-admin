const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const OpeningHours = sequelize.define("openingHours", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  open: Sequelize.DATE,
  close: Sequelize.DATE,
});

module.exports = OpeningHours;
