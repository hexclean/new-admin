const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const BoxTranslation = sequelize.define("boxTranslation", {
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

module.exports = BoxTranslation;
