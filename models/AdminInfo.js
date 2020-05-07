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
  },
  adminId: {
    type: Sequelize.INTEGER,
  },
  adress: {
    type: Sequelize.STRING,
  },
  shortCompanyDesc: Sequelize.STRING,
  location: Sequelize.STRING,
  fullName: Sequelize.STRING,
});

module.exports = AdminInfo;
