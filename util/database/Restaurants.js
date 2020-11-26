const Language = require("../../models/Language");
const Restaurant = require("../../models/Restaurant");
const RestaurantInfo = require("../../models/RestaurantInfo");
const RestaurantRole = require("../../models/RestaurantRole");
const RestaurantsReviews = require("../../models/RestaurantsReviews");

function restaurants() {
  RestaurantInfo.belongsTo(Restaurant, {
    constrains: true,
    onDelete: "CASCADE",
    foreignKey: "restaurantId",
  });
  // Restaurant.hasMany(RestaurantInfo);

  RestaurantInfo.belongsTo(Language, {
    constrains: true,
    onDelete: "CASCADE",
    foreignKey: "languageId",
  });
  // Language.hasMany(RestaurantInfo);

  RestaurantRole.belongsTo(Restaurant, {
    constrains: true,
    onDelete: "CASCADE",
    foreignKey: "restaurantId",
  });
  // Restaurant.hasMany(RestaurantRole);

  RestaurantsReviews.belongsTo(Restaurant, {
    constrains: true,
    onDelete: "CASCADE",
    foreignKey: "restaurantId",
  });
  // Restaurant.hasMany(RestaurantsReviews);
}

module.exports = { restaurants };
