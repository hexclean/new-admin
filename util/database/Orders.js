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

  // Restaurant.hasMany(Order);

  OrderItem.belongsTo(Order, {
    constrains: true,
    onDelete: "CASCADE",
    foreignKey: "orderId",
  });
  // Order.hasMany(OrderItem);

  OrderItem.belongsTo(Variant, {
    constrains: true,
    onDelete: "CASCADE",
    foreignKey: "variantId",
  });

  // Variant.hasMany(OrderItem);

  OrderItemExtra.belongsTo(Extra, {
    constrains: true,
    onDelete: "CASCADE",
    foreignKey: "extraId",
  });

  // Extra.hasMany(OrderItemExtra);

  OrderItemExtra.belongsTo(OrderItem, {
    constrains: true,
    onDelete: "CASCADE",
    foreignKey: "orderItemId",
  });
  // OrderItem.hasMany(OrderItemExtra);

  Order.belongsTo(User, {
    constrains: true,
    onDelete: "CASCADE",
    foreignKey: "userId",
  });
  // User.hasMany(Order);

  Order.belongsTo(UserDeliveryAddress, {
    constrains: true,
    onDelete: "CASCADE",
    foreignKey: "userDeliveryAddressId",
  });

  // UserDeliveryAddress.hasMany(Order);
}

module.exports = { orders };
