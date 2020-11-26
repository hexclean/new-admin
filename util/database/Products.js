const Language = require("../../models/Language");
const Product = require("../../models/Product");
const ProductTranslation = require("../../models/ProductTranslation");
const Variant = require("../../models/Variant");
const ProductFinal = require("../../models/ProductFinal");
const Restaurant = require("../../models/Restaurant");
const Allergen = require("../../models/Allergen");
const ProductHasAllergen = require("../../models/ProductHasAllergen");

function products() {
  Product.belongsTo(Restaurant, { constrains: true, onDelete: "CASCADE" });
  Restaurant.hasMany(Product, { foreignKey: "restaurantId" });

  /* Product -> ProductTranslation  */
  ProductTranslation.belongsTo(Product, {
    constrains: true,
    onDelete: "CASCADE",
  });
  Product.hasMany(ProductTranslation, { foreignKey: "productId" });

  /* ProductTranslation -> Language  */
  ProductTranslation.belongsTo(Language, {
    constrains: true,
    onDelete: "CASCADE",
  });
  Language.hasMany(ProductTranslation, { foreignKey: "languageId" });

  /* Product -> ProductFinal  */
  ProductFinal.belongsTo(Product, {
    constrains: true,
    onDelete: "CASCADE",
  });
  Product.hasMany(ProductFinal, { foreignKey: "productId" });

  /* Product -> ProductHasAllergen  */
  ProductHasAllergen.belongsTo(Product, {
    constrains: true,
    onDelete: "CASCADE",
  });
  Product.hasMany(ProductHasAllergen, {
    foreignKey: "productId",
  });

  /* ProductHasAllergen -> Allergen  */
  ProductHasAllergen.belongsTo(Allergen, {
    constrains: true,
    onDelete: "CASCADE",
  });
  Allergen.hasMany(ProductHasAllergen, {
    foreignKey: "allergenId",
  });

  /* ProductFinal -> Variant  */
  ProductFinal.belongsTo(Variant, {
    constrains: true,
    onDelete: "CASCADE",
  });
  Variant.hasMany(ProductFinal, { foreignKey: "variantId" });
}

module.exports = { products };
