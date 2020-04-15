const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const ProductVariant = sequelize.define("productVariant", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  // code: {
  //   type: Sequelize.INTEGER,
  //   autoIncrement: true,
  //   allowNull: false,
  //   primaryKey: true,
  // },
});

module.exports = ProductVariant;
