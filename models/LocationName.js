const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const LocationName = sequelize.define("LocationName", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  // active: Sequelize.INTEGER
});

module.exports = LocationName;
