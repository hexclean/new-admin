const Language = require("../../models/Language");
const Restaurant = require("../../models/Restaurant");
const Location = require("../../models/Location");
const LocationName = require("../../models/LocationName");
const LocationNameTranslation = require("../../models/LocationNameTranslation");
const RestaurantFilter = require("../../models/RestaurantFilters");

function locations() {
  Location.belongsTo(Restaurant, { constrains: true, onDelete: "CASCADE" });

  Restaurant.hasMany(Location, { foreignKey: "restaurantId" });

  Location.belongsTo(LocationName, {
    constrains: true,
    onDelete: "CASCADE",
  });

  LocationName.hasMany(Location, {
    foreignKey: "locationNameId",
  });

  LocationNameTranslation.belongsTo(LocationName, {
    constrains: true,
    onDelete: "CASCADE",
  });
  LocationName.hasMany(LocationNameTranslation, {
    foreignKey: "locationNameId",
  });

  LocationNameTranslation.belongsTo(Language, {
    constrains: true,
    onDelete: "CASCADE",
  });
  Language.hasMany(LocationNameTranslation, { foreignKey: "languageId" });

  RestaurantFilter.belongsTo(Location, {
    constrains: true,
    onDelete: "CASCADE",
  });

  RestaurantFilter.belongsTo(Restaurant, {
    constrains: true,
    onDelete: "CASCADE",
  });

  Location.hasMany(RestaurantFilter, { foreignKey: "locationId" });
  Restaurant.hasMany(RestaurantFilter, { foreignKey: "restaurantId" });
}

module.exports = { locations };
