const Language = require("../../models/Language");
const Restaurant = require("../../models/Restaurant");
const Location = require("../../models/Location");
const LocationName = require("../../models/LocationName");
const LocationNameTranslation = require("../../models/LocationNameTranslation");
const RestaurantFilter = require("../../models/RestaurantFilters");

function locations() {
  Location.belongsTo(Restaurant, {
    constrains: true,
    onDelete: "CASCADE",
    foreignKey: "restaurantId",
  });

  // Restaurant.hasMany(Location);

  Location.belongsTo(LocationName, {
    constrains: true,
    onDelete: "CASCADE",
    foreignKey: "locationNameId",
  });

  // LocationName.hasMany(Location);

  LocationNameTranslation.belongsTo(LocationName, {
    constrains: true,
    onDelete: "CASCADE",
    foreignKey: "locationNameId",
  });
  // LocationName.hasMany(LocationNameTranslation);

  LocationNameTranslation.belongsTo(Language, {
    constrains: true,
    onDelete: "CASCADE",
    foreignKey: "languageId",
  });

  // Language.hasMany(LocationNameTranslation);

  RestaurantFilter.belongsTo(Location, {
    constrains: true,
    onDelete: "CASCADE",
    foreignKey: "locationId",
  });
  // Location.hasMany(RestaurantFilter);

  RestaurantFilter.belongsTo(Restaurant, {
    constrains: true,
    onDelete: "CASCADE",
    foreignKey: "restaurantId",
  });
  // Restaurant.hasMany(RestaurantFilter);
}

module.exports = { locations };
