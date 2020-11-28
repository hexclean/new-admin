const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Product = sequelize.define("Product", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  imageUrl: {
    type: Sequelize.BLOB("long"),
  },
  active: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Product;
