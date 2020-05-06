const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const AdminInfo = sequelize.define("adminInfo", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  companyDescription: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  adminId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  adress: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = AdminInfo;
