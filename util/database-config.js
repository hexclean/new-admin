const Variant = require("../models/Variant");
const Extra = require("../models/Extra");

const Language = require("../models/Language");
const Restaurant = require("../models/Restaurant");
const RestaurantInfo = require("../models/RestaurantInfo");

const RestaurantRole = require("../models/RestaurantRole");
const User = require("../models/User");
const UserDeliveryAddress = require("../models/UserDeliveryAddress");
const UserProfile = require("../models/UserProfile");
const Hours = require("../models/Hours");
const RestaurantsReviews = require("../models/RestaurantsReviews");
const ProductsReview = require("../models/ProductsReview");

const ResetPasswordApp = require("../models/ResetPasswordApp");
const { openingHours } = require("./database/OpeningHours");
const { products } = require("./database/Products");
const { categories } = require("./database/Categories");
const { extras } = require("./database/Extras");
const { boxes } = require("./database/Boxes");
const { dailyMenus } = require("./database/DailyMenus");
const { locations } = require("./database/Locations");
const { allergens } = require("./database/Allergens");
const { orders } = require("./database/Orders");
const { variants } = require("./database/Variants");

function databaseConfig() {
  products();
  categories();
  extras();
  boxes();
  dailyMenus();
  openingHours();
  locations();
  allergens();
  orders();
  variants();

  ResetPasswordApp.belongsTo(User, {
    constrains: true,
    onDelete: "CASCADE",
  });
  User.hasMany(ResetPasswordApp);

  RestaurantRole.belongsTo(Restaurant, {
    constrains: true,
    onDelete: "CASCADE",
  });
  Restaurant.hasMany(RestaurantRole);

  RestaurantsReviews.belongsTo(Restaurant, {
    constrains: true,
    onDelete: "CASCADE",
  });
  RestaurantsReviews.belongsTo(User, { constrains: true, onDelete: "CASCADE" });
  Restaurant.hasMany(RestaurantsReviews, { foreignKey: "restaurantId" });
  User.hasMany(RestaurantsReviews, { foreignKey: "userId" });

  ProductsReview.belongsTo(Variant, {
    constrains: true,
    onDelete: "CASCADE",
  });
  ProductsReview.belongsTo(User, { constrains: true, onDelete: "CASCADE" });
  Variant.hasMany(ProductsReview);

  User.hasMany(ProductsReview, { foreignKey: "userId" });

  RestaurantInfo.belongsTo(Restaurant, {
    constrains: true,
    onDelete: "CASCADE",
  });
  Restaurant.hasMany(RestaurantInfo, { foreignKey: "restaurantId" });

  RestaurantInfo.belongsTo(Language, {
    constrains: true,
    onDelete: "CASCADE",
  });
  Language.hasMany(RestaurantInfo, { foreignKey: "languageId" });

  Variant.belongsTo(Restaurant, {
    constrains: true,
    onDelete: "CASCADE",
  });
  Restaurant.hasMany(Variant, { foreignKey: "restaurantId" });

  UserProfile.belongsTo(User, {
    constrains: true,
    onDelete: "CASCADE",
  });

  User.hasOne(UserProfile, { foreignKey: "userId" });

  UserDeliveryAddress.belongsTo(User, {
    constrains: true,
    onDelete: "CASCADE",
  });
  User.hasMany(UserDeliveryAddress, { foreignKey: "userId" });
}

module.exports = { databaseConfig };
