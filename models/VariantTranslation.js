const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const VariantTranslation = sequelize.define("variantTranslation", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
  },
});

module.exports = VariantTranslation;
