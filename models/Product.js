const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Product = sequelize.define("Product", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  // productImageContentType: Sequelize.STRING,
  productImagePath: Sequelize.STRING,
  active: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Product;
