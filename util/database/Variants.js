const Restaurant = require("../../models/Restaurant");
const Variant = require("../../models/Variant");

function variants() {
  Variant.belongsTo(Restaurant, {
    constrains: true,
    onDelete: "CASCADE",
  });
  Restaurant.hasMany(Variant, { foreignKey: "restaurantId" });
}

module.exports = { variants };
