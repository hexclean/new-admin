const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const PropertyValue = sequelize.define("PropertyValue", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = PropertyValue;
