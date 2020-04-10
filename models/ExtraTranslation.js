const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const ExtraTranslation = sequelize.define("extraTranslation", {
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

module.exports = ExtraTranslation;
