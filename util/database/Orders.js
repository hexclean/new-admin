const Restaurant = require("../../models/Restaurant");
const Extra = require("../../models/Extra");
const Order = require("../../models/Order");
const OrderItem = require("../../models/OrderItem");
const OrderItemExtra = require("../../models/OrderItemExtra");
const Variant = require("../../models/Variant");
const UserDeliveryAddress = require("../../models/UserDeliveryAddress");
const User = require("../../models/User");

function orders() {
  Order.belongsTo(Restaurant, {
    constrains: true,
    onDelete: "CASCADE",
    foreignKey: "restaurantId",
  });

  Restaurant.hasMany(Order, { foreignKey: "restaurantId" });

  OrderItem.belongsTo(Order, {
    constrains: true,
    onDelete: "CASCADE",
    foreignKey: "orderId",
  });
  Order.hasMany(OrderItem, { foreignKey: "orderId" });

  OrderItem.belongsTo(Variant, {
    constrains: true,
    onDelete: "CASCADE",
    foreignKey: "variantId",
  });

  Variant.hasMany(OrderItem, { foreignKey: "variantId" });

  OrderItemExtra.belongsTo(Extra, {
    constrains: true,
    onDelete: "CASCADE",
    foreignKey: "extraId",
  });

  Extra.hasMany(OrderItemExtra, { foreignKey: "extraId" });

  OrderItemExtra.belongsTo(OrderItem, {
    constrains: true,
    onDelete: "CASCADE",
    foreignKey: "orderItemId",
  });
  OrderItem.hasMany(OrderItemExtra, { foreignKey: "orderItemId" });

  Order.belongsTo(User, {
    constrains: true,
    onDelete: "CASCADE",
    foreignKey: "userId",
  });
  User.hasMany(Order, { foreignKey: "userId" });

  Order.belongsTo(UserDeliveryAddress, {
    constrains: true,
    onDelete: "CASCADE",
    foreignKey: "userDeliveryAddressId",
  });

  UserDeliveryAddress.hasMany(Order, { foreignKey: "userDeliveryAddressId" });
}

module.exports = { orders };
