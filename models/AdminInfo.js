const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const AdminInfo = sequelize.define("adminInfo", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  restaurantId: {
    type: Sequelize.INTEGER,
  },
  adress: {
    type: Sequelize.STRING,
  },
  shortCompanyDesc: Sequelize.STRING,
  kitchen: Sequelize.STRING,
});

module.exports = AdminInfo;
