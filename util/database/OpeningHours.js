const Language = require("../../models/Language");
const Restaurant = require("../../models/Restaurant");
const Hours = require("../../models/Hours");
const OpeningHours = require("../../models/OpeningHours");
const OpeningHoursTranslation = require("../../models/OpeningHoursTranslation");

function openingHours() {
  Hours.belongsTo(OpeningHours, {
    constrains: true,
    onDelete: "CASCADE",
    foreignKey: "openingHoursId",
  });

  // OpeningHours.hasMany(Hours);

  Hours.belongsTo(Restaurant, {
    constrains: true,
    onDelete: "CASCADE",
    foreignKey: "restaurantId",
  });

  // Restaurant.hasMany(Hours);

  OpeningHours.belongsTo(Restaurant, {
    constrains: true,
    onDelete: "CASCADE",
    foreignKey: "restaurantId",
  });

  // Restaurant.hasMany(OpeningHours);

  OpeningHoursTranslation.belongsTo(OpeningHours, {
    constrains: true,
    onDelete: "CASCADE",
    foreignKey: "openingHoursId",
  });

  // OpeningHours.hasMany(OpeningHoursTranslation);

  OpeningHoursTranslation.belongsTo(Language, {
    constrains: true,
    onDelete: "CASCADE",
    foreignKey: "languageId",
  });
  // Language.hasMany(OpeningHoursTranslation);
}

module.exports = { openingHours };
