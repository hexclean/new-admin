const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const ProductCategory = sequelize.define("productCategory", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  restaurantId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = ProductCategory;
