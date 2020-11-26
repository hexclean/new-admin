const Language = require("../../models/Language");
const Restaurant = require("../../models/Restaurant");
const DailyMenuHasAllergen = require("../../models/DailyMenuHasAllergen");
const DailyMenu = require("../../models/DailyMenu");
const DailyMenuTranslation = require("../../models/DailyMenuTranslation");
const DailyMenuFinal = require("../../models/DailyMenuFinal");
const Allergen = require("../../models/Allergen");

function dailyMenus() {
  DailyMenu.belongsTo(Restaurant, { constrains: true, onDelete: "CASCADE" });
  // Restaurant.hasMany(DailyMenu);

  DailyMenuTranslation.belongsTo(DailyMenu, {
    constrains: true,
    onDelete: "CASCADE",
    foreignKey: "dailyMenuId",
  });

  // DailyMenu.hasMany(DailyMenuTranslation);

  DailyMenuTranslation.belongsTo(Language, {
    constrains: true,
    onDelete: "CASCADE",
    foreignKey: "languageId",
  });

  // Language.hasMany(DailyMenuTranslation);

  DailyMenuFinal.belongsTo(DailyMenu, {
    constrains: true,
    onDelete: "CASCADE",
    foreignKey: "dailyMenuId",
  });

  // DailyMenu.hasMany(DailyMenuFinal);

  DailyMenuHasAllergen.belongsTo(Allergen, {
    constrains: true,
    onDelete: "CASCADE",
    foreignKey: "allergenId",
  });

  // Allergen.hasMany(DailyMenuHasAllergen);

  DailyMenuHasAllergen.belongsTo(DailyMenu, {
    constrains: true,
    onDelete: "CASCADE",
    foreignKey: "dailyMenuId",
  });

  // DailyMenu.hasMany(DailyMenuHasAllergen);

  DailyMenuHasAllergen.belongsTo(Restaurant, {
    constrains: true,
    onDelete: "CASCADE",
    foreignKey: "restaurantId",
  });

  // Restaurant.hasMany(DailyMenuHasAllergen);
}

module.exports = { dailyMenus };
