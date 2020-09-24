const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const OpeningHours = sequelize.define("openingHours", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  open: Sequelize.STRING,
  close: Sequelize.STRING,
  name: Sequelize.STRING,
});

module.exports = OpeningHours;
