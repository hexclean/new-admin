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
  });

  OrderItem.belongsTo(Order, {
    constrains: true,
    onDelete: "CASCADE",
  });
  Order.hasMany(OrderItem, { foreignKey: "orderId" });

  OrderItem.belongsTo(Variant, {
    constrains: true,
    onDelete: "CASCADE",
  });

  Variant.hasMany(OrderItem, { foreignKey: "variantId" });

  OrderItemExtra.belongsTo(Extra, {
    constrains: true,
    onDelete: "CASCADE",
  });
  Extra.hasMany(OrderItemExtra, { foreignKey: "extraId" });

  OrderItemExtra.belongsTo(OrderItem, {
    constrains: true,
    onDelete: "CASCADE",
  });
  OrderItem.hasMany(OrderItemExtra, { foreignKey: "orderItemId" });

  Order.belongsTo(User, {
    constrains: true,
    onDelete: "CASCADE",
  });

  User.hasMany(Order, { foreignKey: "userId" });

  Order.belongsTo(UserDeliveryAddress, {
    constrains: true,
    onDelete: "CASCADE",
  });

  UserDeliveryAddress.hasMany(Order, { foreignKey: "deliveryAddress" });
}

module.exports = { orders };
