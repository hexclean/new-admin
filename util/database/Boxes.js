const Language = require("../../models/Language");
const Restaurant = require("../../models/Restaurant");
const Box = require("../../models/Box");
const BoxTranslation = require("../../models/BoxTranslation");
const ProductFinal = require("../../models/ProductFinal");

function boxes() {
  Box.belongsTo(Restaurant, {
    constrains: true,
    onDelete: "CASCADE",
    foreignKey: "restaurantId",
  });
  Restaurant.hasMany(Box, { foreignKey: "restaurantId" });

  BoxTranslation.belongsTo(Box, {
    constrains: true,
    onDelete: "CASCADE",
    foreignKey: "boxId",
  });
  Box.hasMany(BoxTranslation, { foreignKey: "boxId" });

  BoxTranslation.belongsTo(Language, {
    constrains: true,
    onDelete: "CASCADE",
    foreignKey: "languageId",
  });
  Language.hasMany(BoxTranslation, { foreignKey: "languageId" });

  ProductFinal.belongsTo(Box, {
    constrains: true,
    onDelete: "CASCADE",
    foreignKey: "boxId",
  });
  Box.hasMany(ProductFinal, { foreignKey: "boxId" });
}

module.exports = { boxes };
