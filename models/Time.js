const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Time = sequelize.define("Time", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  time: Sequelize.STRING,
});

module.exports = Time;
