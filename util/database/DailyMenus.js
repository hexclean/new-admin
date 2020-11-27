const Language = require("../../models/Language");
const Restaurant = require("../../models/Restaurant");
const DailyMenuHasAllergen = require("../../models/DailyMenuHasAllergen");
const DailyMenu = require("../../models/DailyMenu");
const DailyMenuTranslation = require("../../models/DailyMenuTranslation");
const DailyMenuFinal = require("../../models/DailyMenuFinal");
const Allergen = require("../../models/Allergen");

function dailyMenus() {
  DailyMenu.belongsTo(Restaurant, {
    constrains: true,
    onDelete: "CASCADE",
    foreignKey: "restaurantId",
  });

  Restaurant.hasMany(DailyMenu, {
    foreignKey: "restaurantId",
  });

  DailyMenuTranslation.belongsTo(DailyMenu, {
    constrains: true,
    onDelete: "CASCADE",
    foreignKey: "dailyMenuId",
  });

  DailyMenu.hasMany(DailyMenuTranslation, {
    foreignKey: "dailyMenuId",
  });

  DailyMenuTranslation.belongsTo(Language, {
    constrains: true,
    onDelete: "CASCADE",
    foreignKey: "languageId",
  });

  Language.hasMany(DailyMenuTranslation, {
    foreignKey: "languageId",
  });

  DailyMenuFinal.belongsTo(DailyMenu, {
    constrains: true,
    onDelete: "CASCADE",
    foreignKey: "dailyMenuId",
  });

  DailyMenu.hasMany(DailyMenuFinal, {
    foreignKey: "dailyMenuId",
  });

  DailyMenuHasAllergen.belongsTo(Allergen, {
    constrains: true,
    onDelete: "CASCADE",
    foreignKey: "allergenId",
  });

  Allergen.hasMany(DailyMenuHasAllergen, {
    foreignKey: "allergenId",
  });

  DailyMenuHasAllergen.belongsTo(DailyMenu, {
    constrains: true,
    onDelete: "CASCADE",
    foreignKey: "dailyMenuId",
  });

  DailyMenu.hasMany(DailyMenuHasAllergen, {
    foreignKey: "dailyMenuId",
  });

  DailyMenuHasAllergen.belongsTo(Restaurant, {
    constrains: true,
    onDelete: "CASCADE",
    foreignKey: "restaurantId",
  });

  Restaurant.hasMany(DailyMenuHasAllergen, {
    foreignKey: "restaurantId",
  });
}

module.exports = { dailyMenus };
