const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const DailyMenuFinal = sequelize.define("DailyMenuFinal", {
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
  time: Sequelize.DATE,
});

module.exports = DailyMenuFinal;
