const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const DailyMenuFinal = sequelize.define("dailyMenuFinal", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  price: {
    type: Sequelize.INTEGER,
  },
  discountedPrice: Sequelize.INTEGER,

  active: {
    type: Sequelize.INTEGER,
  },
});

module.exports = DailyMenuFinal;
