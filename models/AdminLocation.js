const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const AdminLocation = sequelize.define("adminLocation", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = AdminLocation;
