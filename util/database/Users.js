const RestaurantsReviews = require("../../models/RestaurantsReviews");
const User = require("../../models/User");
const UserDeliveryAddress = require("../../models/UserDeliveryAddress");
const UserProfile = require("../../models/UserProfile");
const ResetPasswordApp = require("../../models/ResetPasswordApp");

function users() {
  UserDeliveryAddress.belongsTo(User, {
    constrains: true,
    onDelete: "CASCADE",
    foreignKey: "userId",
  });
  // User.hasMany(UserDeliveryAddress);

  ResetPasswordApp.belongsTo(User, {
    constrains: true,
    onDelete: "CASCADE",
    foreignKey: "userId",
  });
  // User.hasMany(ResetPasswordApp);

  RestaurantsReviews.belongsTo(User, {
    constrains: true,
    onDelete: "CASCADE",
    foreignKey: "userId",
  });
  // User.hasMany(RestaurantsReviews);

  UserProfile.belongsTo(User, {
    constrains: true,
    onDelete: "CASCADE",
    foreignKey: "userId",
  });
  // User.hasMany(UserProfile);
}

module.exports = { users };
