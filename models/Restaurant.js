const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Restaurant = sequelize.define("Restaurant", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  commission: Sequelize.FLOAT,
  phoneNumber: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  password: Sequelize.STRING,
  fullName: Sequelize.STRING,
  imageUrl: {
    type: Sequelize.BLOB("tiny"),
  },
  imageUrl: {
    type: Sequelize.BLOB("tiny"),
  },
  minimumOrderUser: Sequelize.FLOAT,
  minimumOrderSubscriber: Sequelize.FLOAT,
  avgTransport: Sequelize.STRING,
  deliveryPrice: Sequelize.FLOAT,
  newRestaurant: Sequelize.INTEGER,
  discount: Sequelize.INTEGER,
  active: Sequelize.INTEGER,
  rating: Sequelize.INTEGER,
  promotion: Sequelize.INTEGER,
});

module.exports = Restaurant;
