const Language = require("../../models/Language");
const Restaurant = require("../../models/Restaurant");
const Box = require("../../models/Box");
const BoxTranslation = require("../../models/BoxTranslation");
const ProductFinal = require("../../models/ProductFinal");

function boxes() {
  Box.belongsTo(Restaurant, { constrains: true, onDelete: "CASCADE" });
  Restaurant.hasMany(Box, { foreignKey: "restaurantId" });

  BoxTranslation.belongsTo(Box, {
    constrains: true,
    onDelete: "CASCADE",
  });
  Box.hasMany(BoxTranslation, {
    foreignKey: "boxId",
  });

  BoxTranslation.belongsTo(Language, {
    constrains: true,
    onDelete: "CASCADE",
  });
  Language.hasMany(BoxTranslation, { foreignKey: "languageId" });

  ProductFinal.belongsTo(Box, {
    constrains: true,
    onDelete: "CASCADE",
  });
  Box.hasMany(ProductFinal, { foreignKey: "boxId" });
}

module.exports = { boxes };
