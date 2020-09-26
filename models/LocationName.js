const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const LocationName = sequelize.define("locationName", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = LocationName;
