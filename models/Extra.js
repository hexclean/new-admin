const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Extra = sequelize.define("Extra", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  // extraType: Sequelize.INTEGER,
});

module.exports = Extra;
