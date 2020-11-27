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
  User.hasMany(UserDeliveryAddress, { foreignKey: "userId" });

  ResetPasswordApp.belongsTo(User, {
    constrains: true,
    onDelete: "CASCADE",
    foreignKey: "userId",
  });
  User.hasMany(ResetPasswordApp, { foreignKey: "userId" });

  RestaurantsReviews.belongsTo(User, {
    constrains: true,
    onDelete: "CASCADE",
    foreignKey: "userId",
  });
  User.hasMany(RestaurantsReviews, { foreignKey: "userId" });

  UserProfile.belongsTo(User, {
    constrains: true,
    onDelete: "CASCADE",
    foreignKey: "userId",
  });
  User.hasMany(UserProfile, { foreignKey: "userId" });
}

module.exports = { users };
