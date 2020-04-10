const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Variant = sequelize.define("variant", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
});

module.exports = Variant;
