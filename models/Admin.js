const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Admin = sequelize.define("admin", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  commission: Sequelize.FLOAT,
  commissionCode: Sequelize.FLOAT,
  phoneNumber: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  password: Sequelize.STRING,
  fullName: Sequelize.STRING,
  imageUrl: Sequelize.STRING,
  coverUrl: Sequelize.STRING,
  minimumOrderUser: Sequelize.FLOAT,
  minimumOrderSubscriber: Sequelize.FLOAT,
  avgTransport: Sequelize.STRING,
  deliveryPrice: Sequelize.FLOAT,
});

module.exports = Admin;
