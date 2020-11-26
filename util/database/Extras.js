const Language = require("../../models/Language");
const Restaurant = require("../../models/Restaurant");
const Extra = require("../../models/Extra");
const ExtraTranslation = require("../../models/ExtraTranslation");
const VariantsExtras = require("../../models/ProductVariantsExtras");
const ExtraHasAllergen = require("../../models/ExtraHasAllergen");
const Variant = require("../../models/Variant");
const Allergen = require("../../models/Allergen");

function extras() {
  Extra.belongsTo(Restaurant, { constrains: true, onDelete: "CASCADE" });

  Restaurant.hasMany(Extra, { foreignKey: "restaurantId" });

  ExtraTranslation.belongsTo(Extra, { constrains: true, onDelete: "CASCADE" });

  Extra.hasMany(ExtraTranslation, { foreignKey: "extraId" });

  ExtraTranslation.belongsTo(Language, {
    constrains: true,
    onDelete: "CASCADE",
  });

  Language.hasMany(ExtraTranslation, { foreignKey: "languageId" });

  ExtraHasAllergen.belongsTo(Restaurant, {
    constrains: true,
    onDelete: "CASCADE",
  });

  Restaurant.hasMany(ExtraHasAllergen, {
    foreignKey: "restaurantId",
  });

  ExtraHasAllergen.belongsTo(Allergen, {
    constrains: true,
    onDelete: "CASCADE",
  });

  Allergen.hasMany(ExtraHasAllergen, {
    foreignKey: "allergenId",
  });

  ExtraHasAllergen.belongsTo(Extra, {
    constrains: true,
    onDelete: "CASCADE",
  });

  Extra.hasMany(ExtraHasAllergen, {
    foreignKey: "extraId",
  });

  VariantsExtras.belongsTo(Variant, {
    constrains: true,
    onDelete: "CASCADE",
  });

  Variant.hasMany(VariantsExtras, { foreignKey: "variantId" });

  VariantsExtras.belongsTo(Extra, {
    constrains: true,
    onDelete: "CASCADE",
  });
  Extra.hasMany(VariantsExtras, { foreignKey: "extraId" });

  VariantsExtras.belongsTo(Restaurant, {
    constrains: true,
    onDelete: "CASCADE",
  });

  Restaurant.hasMany(VariantsExtras, { foreignKey: "restaurantId" });
}

module.exports = { extras };
