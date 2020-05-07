const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Admin = sequelize.define("admin", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  commission: Sequelize.INTEGER,
  phoneNumber: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  open: Sequelize.STRING,
  close: Sequelize.STRING,
  password: Sequelize.STRING,
  fullName: Sequelize.STRING,
});

module.exports = Admin;
