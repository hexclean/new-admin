const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const RestaurantsReviews = sequelize.define("restaurantsReviews", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  adminId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  message: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  time: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  requiredExtra: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = RestaurantsReviews;
