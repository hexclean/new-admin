const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const AdminLocationTranslation = sequelize.define("adminLocationTranslation", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
  },
});

module.exports = AdminLocationTranslation;
