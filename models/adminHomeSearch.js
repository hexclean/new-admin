const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const adminHomeSearch = sequelize.define("adminHomeSearch", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = adminHomeSearch;
