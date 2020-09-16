const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Box = sequelize.define("box", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  adminId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Box;
