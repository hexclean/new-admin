const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const AdminOpeningHours = sequelize.define("adminOpeningHours", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  day: Sequelize.STRING,
  open: Sequelize.STRING,
  close: Sequelize.STRING,
});

module.exports = AdminOpeningHours;
