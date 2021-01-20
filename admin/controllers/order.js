const Sequelize = require("sequelize");
var request = require("request");
const Box = require("../../models/Box");
const Order = require("../../models/Order");
const OrderDeliveryAddress = require("../../models/OrderDeliveryAddress");
const LocationName = require("../../models/LocationName");
const LocationNameTranslation = require("../../models/LocationNameTranslation");
const OrderItem = require("../../models/OrderItem");
const OrderItemExtra = require("../../models/OrderItemExtra");
const User = require("../../models/User");
const Variant = require("../../models/Variant");
const ProductFinal = require("../../models/ProductFinal");
const Product = require("../../models/Product");
const ProductTranslation = require("../../models/ProductTranslation");
const Extra = require("../../models/Extra");
const ExtraTranslation = require("../../models/ExtraTranslation");
const Restaurant = require("../../models/Restaurant");
const mailgun = require("mailgun-js");
const DOMAIN = "sandbox5d007cce5fdb4e018b65c28ea394becd.mailgun.org";
const api_key = "7003ff515d7bf9a71de74c7a64d7562c-c50a0e68-93ac4f33";
const mg = mailgun({
  apiKey: api_key,
  domain: DOMAIN,
});

exports.getOrders = async (req, res, next) => {
  let languageCode;

  if (req.cookies.language == "ro") {
    languageCode = 1;
  } else if (req.cookies.language == "hu") {
    languageCode = 2;
  } else {
    languageCode = 3;
  }
  const orders = await Order.findAll({
    order: [["createdAt", "DESC"]],
    where: { orderStatusId: 1, restaurantId: req.admin.id },
    include: [
      {
        model: OrderItem,

        include: [
          {
            model: OrderItemExtra,
            include: [
              {
                model: Extra,
                include: [
                  {
                    model: ExtraTranslation,
                    where: { languageId: languageCode },
                  },
                ],
              },
            ],
          },

          {
            model: Variant,
            include: [
              {
                model: ProductFinal,
                where: { active: 1 },
                include: [
                  {
                    model: Product,
                    include: [
                      {
                        model: ProductTranslation,
                        where: { languageId: languageCode },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      { model: OrderDeliveryAddress },
      { model: User },

      {
        model: LocationName,
        include: [
          {
            model: LocationNameTranslation,
            where: { languageId: languageCode },
          },
        ],
      },
    ],
  });

  let extras = [];
  let cutlery;
  let take;
  let userName;
  let orderStreet;
  let orderHouseNumber;
  let orderFloor;
  let orderDoorNumber;
  let orderPhoneNumber;
  let orderCreated;
  let orderIds;

  if (orders.length != 0) {
    for (let i = 0; i < orders.length; i++) {
      const resultWithAll = [];
      let orderItems = orders[i].OrderItems;

      for (let j = 0; j < orderItems.length; j++) {
        extras = orderItems[j].OrderItemExtras;

        let prodFin = orderItems[j].Variant.ProductFinals;
        for (let h = 0; h < prodFin.length; h++) {
          if (extras.length == 0) {
            let totalProductPrice = 0;
            let totalBoxPrice = 0;
            totalProductPrice +=
              parseFloat(orderItems[j].variantPrice) *
              parseInt(orderItems[j].quantity);
            totalBoxPrice +=
              parseFloat(orderItems[j].boxPrice) *
              parseInt(orderItems[j].quantity);
            const items = {
              orderItemId: orderItems[j].id,
              boxPrice: orderItems[j].boxPrice,
              totalBoxPrice: totalBoxPrice.toFixed(2),
              variant_sku: orderItems[j].Variant.sku,
              extra_length: extras.length,
              product_id: prodFin[h].productId,
              product_quantity: orderItems[j].quantity,
              message: orderItems[j].message,
              product_price: orderItems[j].variantPrice,
              product_name: prodFin[h].Product.ProductTranslations[0].title,
              total_product_price: totalProductPrice,
            };

            resultWithAll.push(items);
          } else {
            for (let k = 0; k < extras.length; k++) {
              let totalExtraPrice = 0;
              let totalProductPrice = 0;
              let totalBoxPrice = 0;
              let totalSection = 0;
              let totalSectionNoBox = 0;

              totalExtraPrice +=
                parseFloat(extras[k].extraPrice) * parseInt(extras[k].quantity);

              totalProductPrice +=
                parseFloat(orderItems[j].variantPrice) *
                parseInt(orderItems[j].quantity);

              totalBoxPrice +=
                parseFloat(orderItems[j].boxPrice) *
                parseInt(orderItems[j].quantity);

              totalSection +=
                parseFloat(totalBoxPrice) +
                parseFloat(totalExtraPrice) +
                parseFloat(totalProductPrice);

              totalSectionNoBox +=
                parseFloat(totalExtraPrice) + parseFloat(totalProductPrice);

              const items = {
                orderItemId: orderItems[j].id,
                variant_sku: orderItems[j].Variant.sku,
                totalBoxPrice: totalBoxPrice.toFixed(2),
                boxPrice: orderItems[j].boxPrice,
                totalSection: totalSection,
                totalSectionNoBox: totalSectionNoBox,
                extra_length: extras.length,
                product_id: prodFin[h].productId,
                product_quantity: orderItems[j].quantity,
                product_price: orderItems[j].variantPrice,
                product_name: prodFin[h].Product.ProductTranslations[0].title,
                extra_id: extras[k].extraId,
                extra_quantity: extras[k].quantity,
                extra_price: extras[k].extraPrice,
                extra_name: extras[k].Extra.ExtraTranslations[0].name,
                total_product_price: totalProductPrice,
                total_extra_price: totalExtraPrice,
                message: orderItems[j].message,
              };

              resultWithAll.push(items);
            }
          }
        }
      }

      const reduced = resultWithAll.reduce((acc, val) => {
        const {
          extra_id,
          extra_quantity,
          extra_price,
          extra_name,
          ...otherFields
        } = val;

        const existing = acc.find(
          (item) => item.orderItemId === val.orderItemId
        );
        if (!existing) {
          acc.push({
            ...otherFields,
            extras: [
              {
                extra_id,
                extra_quantity,
                extra_price,
                extra_name,
              },
            ],
          });
          return acc;
        }

        existing.extras.push({
          extra_id,
          extra_quantity,
          extra_price,
          extra_name,
        });
        return acc;
      }, []);

      orders[i].products = reduced;
    }

    totalPriceFinal = orders[0].totalPrice;
    cutlery = orders[0].cutlery;
    take = orders[0].take;
    orderStreet = orders[0].OrderDeliveryAddress.street;
    orderHouseNumber = orders[0].OrderDeliveryAddress.houseNumber;
    orderFloor = orders[0].OrderDeliveryAddress.floor;
    orderDoorNumber = orders[0].OrderDeliveryAddress.doorNumber;
    orderPhoneNumber = orders[0].OrderDeliveryAddress.phoneNumber;
    orderCreated = orders[0].createdAt.toLocaleString("en-GB", {
      timeZone: "Europe/Helsinki",
    });

    userName = orders[0].OrderDeliveryAddress.userName;
    orderIds = orders[0].encodedKey;
  }
  res.render("order/orders", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    orders: orders,
    orderStreet: orderStreet,
    orderHouseNumber: orderHouseNumber,
    orderFloor: orderFloor,
    orderDoorNumber: orderDoorNumber,
    orderPhoneNumber: orderPhoneNumber,
    orderCreated: orderCreated,
    userName: userName,
    cutlery: cutlery,
    take: take,
    orderIds: orderIds,
    extras: extras,
  });
};

exports.getAcceptedOrders = async (req, res, next) => {
  let languageCode;

  if (req.cookies.language == "ro") {
    languageCode = 1;
  } else if (req.cookies.language == "hu") {
    languageCode = 2;
  } else {
    languageCode = 3;
  }
  const orders = await Order.findAll({
    order: [["createdAt", "DESC"]],
    where: { orderStatusId: 2, restaurantId: req.admin.id },
    include: [
      {
        model: OrderItem,

        include: [
          {
            model: OrderItemExtra,
            include: [
              {
                model: Extra,
                include: [
                  {
                    model: ExtraTranslation,
                    where: { languageId: languageCode },
                  },
                ],
              },
            ],
          },

          {
            model: Variant,
            include: [
              {
                model: ProductFinal,
                where: { active: 1 },
                include: [
                  {
                    model: Product,
                    include: [
                      {
                        model: ProductTranslation,
                        where: { languageId: languageCode },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      { model: OrderDeliveryAddress },
      { model: User },

      {
        model: LocationName,
        include: [
          {
            model: LocationNameTranslation,
            where: { languageId: languageCode },
          },
        ],
      },
    ],
  });

  let extras = [];
  let cutlery;
  let take;
  let userName;
  let orderStreet;
  let orderHouseNumber;
  let orderFloor;
  let orderDoorNumber;
  let orderPhoneNumber;
  let orderCreated;
  let orderIds;

  if (orders.length != 0) {
    for (let i = 0; i < orders.length; i++) {
      const resultWithAll = [];
      let orderItems = orders[i].OrderItems;

      for (let j = 0; j < orderItems.length; j++) {
        extras = orderItems[j].OrderItemExtras;

        let prodFin = orderItems[j].Variant.ProductFinals;
        for (let h = 0; h < prodFin.length; h++) {
          if (extras.length == 0) {
            let totalProductPrice = 0;
            let totalBoxPrice = 0;
            totalProductPrice +=
              parseFloat(orderItems[j].variantPrice) *
              parseInt(orderItems[j].quantity);
            totalBoxPrice +=
              parseFloat(orderItems[j].boxPrice) *
              parseInt(orderItems[j].quantity);
            const items = {
              orderItemId: orderItems[j].id,
              boxPrice: orderItems[j].boxPrice,
              totalBoxPrice: totalBoxPrice.toFixed(2),
              variant_sku: orderItems[j].Variant.sku,
              extra_length: extras.length,
              product_id: prodFin[h].productId,
              product_quantity: orderItems[j].quantity,
              message: orderItems[j].message,
              product_price: orderItems[j].variantPrice,
              product_name: prodFin[h].Product.ProductTranslations[0].title,
              total_product_price: totalProductPrice,
            };

            resultWithAll.push(items);
          } else {
            for (let k = 0; k < extras.length; k++) {
              let totalExtraPrice = 0;
              let totalProductPrice = 0;
              let totalBoxPrice = 0;
              let totalSection = 0;
              let totalSectionNoBox = 0;

              totalExtraPrice +=
                parseFloat(extras[k].extraPrice) * parseInt(extras[k].quantity);

              totalProductPrice +=
                parseFloat(orderItems[j].variantPrice) *
                parseInt(orderItems[j].quantity);

              totalBoxPrice +=
                parseFloat(orderItems[j].boxPrice) *
                parseInt(orderItems[j].quantity);

              totalSection +=
                parseFloat(totalBoxPrice) +
                parseFloat(totalExtraPrice) +
                parseFloat(totalProductPrice);

              totalSectionNoBox +=
                parseFloat(totalExtraPrice) + parseFloat(totalProductPrice);

              const items = {
                orderItemId: orderItems[j].id,
                variant_sku: orderItems[j].Variant.sku,
                totalBoxPrice: totalBoxPrice.toFixed(2),
                boxPrice: orderItems[j].boxPrice,
                totalSection: totalSection,
                totalSectionNoBox: totalSectionNoBox,
                extra_length: extras.length,
                product_id: prodFin[h].productId,
                product_quantity: orderItems[j].quantity,
                product_price: orderItems[j].variantPrice,
                product_name: prodFin[h].Product.ProductTranslations[0].title,
                extra_id: extras[k].extraId,
                extra_quantity: extras[k].quantity,
                extra_price: extras[k].extraPrice,
                extra_name: extras[k].Extra.ExtraTranslations[0].name,
                total_product_price: totalProductPrice,
                total_extra_price: totalExtraPrice,
                message: orderItems[j].message,
              };

              resultWithAll.push(items);
            }
          }
        }
      }

      const reduced = resultWithAll.reduce((acc, val) => {
        const {
          extra_id,
          extra_quantity,
          extra_price,
          extra_name,
          ...otherFields
        } = val;

        const existing = acc.find(
          (item) => item.orderItemId === val.orderItemId
        );
        if (!existing) {
          acc.push({
            ...otherFields,
            extras: [
              {
                extra_id,
                extra_quantity,
                extra_price,
                extra_name,
              },
            ],
          });
          return acc;
        }

        existing.extras.push({
          extra_id,
          extra_quantity,
          extra_price,
          extra_name,
        });
        return acc;
      }, []);

      orders[i].products = reduced;
    }

    totalPriceFinal = orders[0].totalPrice;
    cutlery = orders[0].cutlery;
    take = orders[0].take;
    orderStreet = orders[0].OrderDeliveryAddress.street;
    orderHouseNumber = orders[0].OrderDeliveryAddress.houseNumber;
    orderFloor = orders[0].OrderDeliveryAddress.floor;
    orderDoorNumber = orders[0].OrderDeliveryAddress.doorNumber;
    orderPhoneNumber = orders[0].OrderDeliveryAddress.phoneNumber;
    orderCreated = orders[0].createdAt.toLocaleString("en-GB", {
      timeZone: "Europe/Helsinki",
    });

    userName = orders[0].OrderDeliveryAddress.userName;
    orderIds = orders[0].encodedKey;
  }
  res.render("order/accepted-orders", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    orders: orders,
    orderStreet: orderStreet,
    orderHouseNumber: orderHouseNumber,
    orderFloor: orderFloor,
    orderDoorNumber: orderDoorNumber,
    orderPhoneNumber: orderPhoneNumber,
    orderCreated: orderCreated,
    userName: userName,
    cutlery: cutlery,
    take: take,
    orderIds: orderIds,
    extras: extras,
  });
};
exports.getEditOrder = async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    let result2 = [];
    const orders = await Order.findAll({
      where: {
        encodedKey: orderId,
        restaurantId: req.admin.id,
      },

      include: [
        {
          model: OrderItem,

          include: [
            {
              model: OrderItemExtra,
              include: [
                {
                  model: Extra,
                  include: [{ model: ExtraTranslation }],
                },
              ],
            },
            {
              model: Variant,
              include: [
                {
                  model: ProductFinal,
                  where: { active: 1 },
                  include: [
                    {
                      model: Product,
                      include: [{ model: ProductTranslation }],
                    },
                  ],
                },
              ],
            },
          ],
        },
        { model: OrderDeliveryAddress },
        { model: User },

        {
          model: LocationName,
          include: [
            {
              model: LocationNameTranslation,
              where: { languageId: 2 },
            },
          ],
        },
      ],
    });

    let extras = [];
    let cutlery;
    let take;
    let userName;
    let orderCity;
    let orderStreet;
    let orderHouseNumber;
    let orderFloor;
    let orderDoorNumber;
    let orderPhoneNumber;
    let orderCreated;
    let orderIds;

    if (orders.length != 0) {
      for (let i = 0; i < orders.length; i++) {
        const resultWithAll = [];
        let orderItems = orders[i].OrderItems;

        for (let j = 0; j < orderItems.length; j++) {
          extras = orderItems[j].OrderItemExtras;

          let prodFin = orderItems[j].Variant.ProductFinals;

          for (let h = 0; h < prodFin.length; h++) {
            if (extras.length == 0) {
              let totalProductPrice = 0;
              let totalBoxPrice = 0;
              totalProductPrice +=
                parseFloat(orderItems[j].variantPrice) *
                parseInt(orderItems[j].quantity);
              totalBoxPrice +=
                parseFloat(orderItems[j].boxPrice) *
                parseInt(orderItems[j].quantity);
              const items = {
                boxPrice: orderItems[j].boxPrice,
                totalBoxPrice: totalBoxPrice.toFixed(2),
                variant_sku: orderItems[j].Variant.sku,
                extra_length: extras.length,
                product_id: prodFin[h].productId,
                product_quantity: orderItems[j].quantity,
                message: orderItems[j].message,
                product_price: orderItems[j].variantPrice,
                product_name: prodFin[h].Product.ProductTranslations[0].title,
                total_product_price: totalProductPrice,
              };

              resultWithAll.push(items);
            } else {
              for (let k = 0; k < extras.length; k++) {
                let totalExtraPrice = 0;
                let totalProductPrice = 0;
                let totalBoxPrice = 0;
                let totalSection = 0;
                let totalSectionNoBox = 0;
                totalExtraPrice +=
                  parseFloat(extras[k].extraPrice) *
                  parseInt(extras[k].quantity);

                totalProductPrice +=
                  parseFloat(orderItems[j].variantPrice) *
                  parseInt(orderItems[j].quantity);

                totalBoxPrice +=
                  parseFloat(orderItems[j].boxPrice) *
                  parseInt(orderItems[j].quantity);

                totalSection +=
                  parseFloat(totalBoxPrice) +
                  parseFloat(totalExtraPrice) +
                  parseFloat(totalProductPrice);

                totalSectionNoBox +=
                  parseFloat(totalExtraPrice) + parseFloat(totalProductPrice);
                const items = {
                  variant_sku: orderItems[j].Variant.sku,
                  totalBoxPrice: totalBoxPrice.toFixed(2),
                  boxPrice: orderItems[j].boxPrice,
                  totalSection: totalSection,
                  totalSectionNoBox: totalSectionNoBox,
                  extra_length: extras.length,
                  product_id: prodFin[h].productId,
                  product_quantity: orderItems[j].quantity,
                  product_price: orderItems[j].variantPrice,
                  product_name: prodFin[h].Product.ProductTranslations[0].title,
                  extra_id: extras[k].extraId,
                  extra_quantity: extras[k].quantity,
                  extra_price: extras[k].extraPrice,
                  extra_name: extras[k].Extra.ExtraTranslations[0].name,
                  total_product_price: totalProductPrice,
                  total_extra_price: totalExtraPrice,
                  message: orderItems[j].message,
                };

                resultWithAll.push(items);
              }
            }
          }
        }

        const reduced = resultWithAll.reduce((acc, val) => {
          const {
            extra_id,
            extra_quantity,
            extra_price,
            extra_name,
            ...otherFields
          } = val;

          const existing = acc.find(
            (item) => item.orderItemId === val.orderItemId
          );
          if (!existing) {
            acc.push({
              ...otherFields,
              extras: [
                {
                  extra_id,
                  extra_quantity,
                  extra_price,
                  extra_name,
                },
              ],
            });
            return acc;
          }

          existing.extras.push({
            extra_id,
            extra_quantity,
            extra_price,
            extra_name,
          });
          return acc;
        }, []);

        result2 = reduced;
        orders[i].products = reduced;
      }

      orderIds = orders[0].encodedKey;

      totalPriceFinal = orders[0].totalPrice;
      cutlery = orders[0].cutlery;
      take = orders[0].take;
      orderCity = orders[0].LocationName.LocationNameTranslations[0].name;
      orderStreet = orders[0].OrderDeliveryAddress.street;
      orderHouseNumber = orders[0].OrderDeliveryAddress.houseNumber;
      orderFloor = orders[0].OrderDeliveryAddress.floor;
      orderDoorNumber = orders[0].OrderDeliveryAddress.doorNumber;
      orderPhoneNumber = orders[0].OrderDeliveryAddress.phoneNumber;
      orderCreated = orders[0].createdAt;
      userName = orders[0].OrderDeliveryAddress.userName;
      orderIds = orders[0].id;
      console.log("=-=-=-----=-=-=-=-", orders[0].status);
    }

    res.render("order/edit-order", {
      pageTitle: "Add Product",
      path: "/admin/add-product",
      editing: false,
      orders: orders,
      orderStreet: orderStreet,
      orderHouseNumber: orderHouseNumber,
      orderFloor: orderFloor,
      orderDoorNumber: orderDoorNumber,
      orderPhoneNumber: orderPhoneNumber,
      orderCreated: orderCreated,
      userName: userName,
      cutlery: cutlery,
      take: take,
      orderIds: orderIds,
      extras: extras,
      result: result2,
      userEmail: "orders[0].User.email",
      orderCity: orderCity,
      status: orders[0].orderStatusId,
      deletedMessage: orders[0].deletedMessage,
    });
  } catch (error) {
    console.log(error);
    error.httpStatusCode = 500;
    return next(error);
  }
};

exports.getDeletedOrders = async (req, res, next) => {
  let languageCode;

  if (req.cookies.language == "ro") {
    languageCode = 1;
  } else if (req.cookies.language == "hu") {
    languageCode = 2;
  } else {
    languageCode = 3;
  }
  const orders = await Order.findAll({
    order: [["createdAt", "DESC"]],
    where: { orderStatusId: 3, restaurantId: req.admin.id },
    include: [
      {
        model: OrderItem,

        include: [
          {
            model: OrderItemExtra,
            include: [
              {
                model: Extra,
                include: [
                  {
                    model: ExtraTranslation,
                    where: { languageId: languageCode },
                  },
                ],
              },
            ],
          },

          {
            model: Variant,
            include: [
              {
                model: ProductFinal,
                where: { active: 1 },
                include: [
                  {
                    model: Product,
                    include: [
                      {
                        model: ProductTranslation,
                        where: { languageId: languageCode },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      { model: OrderDeliveryAddress },
      { model: User },

      {
        model: LocationName,
        include: [
          {
            model: LocationNameTranslation,
            where: { languageId: languageCode },
          },
        ],
      },
    ],
  });

  let extras = [];
  let cutlery;
  let take;
  let userName;
  let orderStreet;
  let orderHouseNumber;
  let orderFloor;
  let orderDoorNumber;
  let orderPhoneNumber;
  let orderCreated;
  let orderIds;

  if (orders.length != 0) {
    for (let i = 0; i < orders.length; i++) {
      const resultWithAll = [];
      let orderItems = orders[i].OrderItems;

      for (let j = 0; j < orderItems.length; j++) {
        extras = orderItems[j].OrderItemExtras;

        let prodFin = orderItems[j].Variant.ProductFinals;
        for (let h = 0; h < prodFin.length; h++) {
          if (extras.length == 0) {
            let totalProductPrice = 0;
            let totalBoxPrice = 0;
            totalProductPrice +=
              parseFloat(orderItems[j].variantPrice) *
              parseInt(orderItems[j].quantity);
            totalBoxPrice +=
              parseFloat(orderItems[j].boxPrice) *
              parseInt(orderItems[j].quantity);
            const items = {
              orderItemId: orderItems[j].id,
              boxPrice: orderItems[j].boxPrice,
              totalBoxPrice: totalBoxPrice.toFixed(2),
              variant_sku: orderItems[j].Variant.sku,
              extra_length: extras.length,
              product_id: prodFin[h].productId,
              product_quantity: orderItems[j].quantity,
              message: orderItems[j].message,
              product_price: orderItems[j].variantPrice,
              product_name: prodFin[h].Product.ProductTranslations[0].title,
              total_product_price: totalProductPrice,
            };

            resultWithAll.push(items);
          } else {
            for (let k = 0; k < extras.length; k++) {
              let totalExtraPrice = 0;
              let totalProductPrice = 0;
              let totalBoxPrice = 0;
              let totalSection = 0;
              let totalSectionNoBox = 0;

              totalExtraPrice +=
                parseFloat(extras[k].extraPrice) * parseInt(extras[k].quantity);

              totalProductPrice +=
                parseFloat(orderItems[j].variantPrice) *
                parseInt(orderItems[j].quantity);

              totalBoxPrice +=
                parseFloat(orderItems[j].boxPrice) *
                parseInt(orderItems[j].quantity);

              totalSection +=
                parseFloat(totalBoxPrice) +
                parseFloat(totalExtraPrice) +
                parseFloat(totalProductPrice);

              totalSectionNoBox +=
                parseFloat(totalExtraPrice) + parseFloat(totalProductPrice);

              const items = {
                orderItemId: orderItems[j].id,
                variant_sku: orderItems[j].Variant.sku,
                totalBoxPrice: totalBoxPrice.toFixed(2),
                boxPrice: orderItems[j].boxPrice,
                totalSection: totalSection,
                totalSectionNoBox: totalSectionNoBox,
                extra_length: extras.length,
                product_id: prodFin[h].productId,
                product_quantity: orderItems[j].quantity,
                product_price: orderItems[j].variantPrice,
                product_name: prodFin[h].Product.ProductTranslations[0].title,
                extra_id: extras[k].extraId,
                extra_quantity: extras[k].quantity,
                extra_price: extras[k].extraPrice,
                extra_name: extras[k].Extra.ExtraTranslations[0].name,
                total_product_price: totalProductPrice,
                total_extra_price: totalExtraPrice,
                message: orderItems[j].message,
              };

              resultWithAll.push(items);
            }
          }
        }
      }

      const reduced = resultWithAll.reduce((acc, val) => {
        const {
          extra_id,
          extra_quantity,
          extra_price,
          extra_name,
          ...otherFields
        } = val;

        const existing = acc.find(
          (item) => item.orderItemId === val.orderItemId
        );
        if (!existing) {
          acc.push({
            ...otherFields,
            extras: [
              {
                extra_id,
                extra_quantity,
                extra_price,
                extra_name,
              },
            ],
          });
          return acc;
        }

        existing.extras.push({
          extra_id,
          extra_quantity,
          extra_price,
          extra_name,
        });
        return acc;
      }, []);

      orders[i].products = reduced;
    }

    totalPriceFinal = orders[0].totalPrice;
    cutlery = orders[0].cutlery;
    take = orders[0].take;
    orderStreet = orders[0].OrderDeliveryAddress.street;
    orderHouseNumber = orders[0].OrderDeliveryAddress.houseNumber;
    orderFloor = orders[0].OrderDeliveryAddress.floor;
    orderDoorNumber = orders[0].OrderDeliveryAddress.doorNumber;
    orderPhoneNumber = orders[0].OrderDeliveryAddress.phoneNumber;
    orderCreated = orders[0].createdAt.toLocaleString("en-GB", {
      timeZone: "Europe/Helsinki",
    });

    userName = orders[0].OrderDeliveryAddress.userName;
    orderIds = orders[0].encodedKey;
  }
  res.render("order/deleted-orders", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    orders: orders,
    orderStreet: orderStreet,
    orderHouseNumber: orderHouseNumber,
    orderFloor: orderFloor,
    orderDoorNumber: orderDoorNumber,
    orderPhoneNumber: orderPhoneNumber,
    orderCreated: orderCreated,
    userName: userName,
    cutlery: cutlery,
    take: take,
    orderIds: orderIds,
    extras: extras,
  });
};

exports.postEditOrder = async (req, res, next) => {
  const hours = req.body.hours;
  const minutes = req.body.minutes;

  const failedDescription = req.body.failedDescription;
  const orderId = req.body.orderId;
  const datepicker = req.body.datepicker;
  console.log("orderId", orderId);
  const rest = await Restaurant.findByPk(req.admin.id);
  const ordered = await Order.findOne({
    where: { encodedKey: orderId },
    include: [{ model: OrderDeliveryAddress }],
  });
  const orderedUserName = ordered.OrderDeliveryAddress.userName;
  const orderedUserPhoneNumber = ordered.OrderDeliveryAddress.phoneNumber;
  let restaurantName = rest.fullName;
  let restaurantPhone = rest.phoneNumber;

  try {
    if (hours == "0" && failedDescription.length == 0) {
      var jsonDataObj = {
        to: orderedUserPhoneNumber,
        sender: "4",
        body: `Kedves ${orderedUserName}! A(z) ${restaurantName} sikeresen elfogadta a rendelésed, melynek rendelési száma: ${orderId}. A rendelésed várhatóan ${minutes} perc múlva érkezik. További információkért az étterem telefonszámán érdeklődhetsz: ${restaurantPhone}.\nJó étvágyat kíván a Foodnet csapata!`,
      };
      console.log(9999999999999999, "nincs ora es nincs elutasitas");
      async function sendSms() {
        request.post(
          {
            headers: {
              "X-Authorization": "j1HPv95lUhKKF2JJv66zeuGn7sSNFP6bPeWrSv89",
            },
            url: "https://app.smso.ro/api/v1/send",
            body: jsonDataObj,
            json: true,
          }
          // function (error, response, body) {
          //   console.log(error);
          //   console.log(response);
          //   console.log(body);
          // }
        );
      }

      const data = {
        from: "info@foodnet.ro",
        to: "erdosjozsef20@gmail.com",
        subject: "Kiszállítási idő",
        html: `<!DOCTYPE html>
        <html  style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
        <head>
        <meta name="viewport" content="width=device-width" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Alerts e.g. approaching your limit</title>
        <style type="text/css">
        img {
        max-width: 100%;
        }
        body {
        -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; line-height: 1.6em;
        }
        body {
        background-color: #f6f6f6;
        }
        @media only screen and (max-width: 640px) {
          body {
            padding: 0 !important;
          }
          h1 {
            font-weight: 800 !important; margin: 20px 0 5px !important;
          }
          h2 {
            font-weight: 800 !important; margin: 20px 0 5px !important;
          }
          h3 {
            font-weight: 800 !important; margin: 20px 0 5px !important;
          }
          h4 {
            font-weight: 800 !important; margin: 20px 0 5px !important;
          }
          h1 {
            font-size: 22px !important;
          }
          h2 {
            font-size: 18px !important;
          }
          h3 {
            font-size: 16px !important;
          }
          .container {
            padding: 0 !important; width: 100% !important;
          }
          .content {
            padding: 0 !important;
          }
          .content-wrap {
            padding: 10px !important;
          }
          .invoice {
            width: 100% !important;
          }
        }
        </style>
        </head>
        
        <body itemscope itemtype="http://schema.org/EmailMessage" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; line-height: 1.6em; background-color: #f6f6f6; margin: 0;" bgcolor="#f6f6f6">
        
        <table class="body-wrap" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; width: 100%; background-color: #f6f6f6; margin: 0;" bgcolor="#f6f6f6"><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0;" valign="top"></td>
            <td class="container" width="600" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; display: block !important; max-width: 600px !important; clear: both !important; margin: 0 auto;" valign="top">
              <div class="content" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; max-width: 600px; display: block; margin: 0 auto; padding: 20px;">
                <table class="main" width="100%" cellpadding="0" cellspacing="0" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; border-radius: 3px; background-color: #fff; margin: 0; border: 1px solid #e9e9e9;" bgcolor="#fff"><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="alert alert-warning" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 16px; vertical-align: top; color: #fff; font-weight: 500; text-align: center; border-radius: 3px 3px 0 0; background-color: #4ACC4F; margin: 0; padding: 20px;" align="center" bgcolor="#4ACC4F" valign="top">
                      Elfogadott rendelés.
                    </td>
                  </tr><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-wrap" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 20px;" valign="top">
                      <table width="100%" cellpadding="0" cellspacing="0" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                            Kedves <strong style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">Erdős József</strong>!
                          </td>
                        </tr><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                            A(z) ${restaurantName} sikeresen elfogadta a rendelésed, melynek rendelési száma: <strong>${orderId}</strong>.<br> A rendelésed várhatóan ${minutes} perc múlva érkezik. További információkért az étterem telefonszámán érdeklődhetsz: ${restaurantPhone}.
                          </td>
                        </tr><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                            Jó étvágyat kíván a Foodnet csapata!
                          </td>
                        </tr></table></td>
                  </tr></table>
            </td>
            <td style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0;" valign="top"></td>
          </tr></table></body>
        </html>`,
        // "h:X-Mailgun-Variables": { test: "test" },
      };
      // await mg.messages().send(data, function (error, body) {
      //   if (error) {
      //     console.log(error);
      //   }
      // });
      // sendSms();
      await Order.update(
        { orderStatusId: 2 },
        { where: { encodedKey: orderId } }
      );

      console.log(1111, "x perc mulva erkezik");
      // console.log("orderId", orderId);
    } else if (failedDescription.length !== 0) {
      console.log(33333333, "elutasitas");
      await Order.update(
        { orderStatusId: 3, deletedMessage: failedDescription },
        { where: { encodedKey: orderId } }
      );
    } else if ((hours !== "0") & (minutes !== "0")) {
      console.log(22222, "x ora x perx");
      await Order.update(
        { orderStatusId: 2 },
        { where: { encodedKey: orderId } }
      );
      // console.log("van ora es perc is");
      // console.log("orderId", orderId);
    } else {
      console.log(423432423432432432423, "csak ora van megadva");
      // console.log("orderId", orderId);
      await Order.update(
        { orderStatusId: 2 },
        { where: { encodedKey: orderId } }
      );
      // console.log("ennyi ora mulva jon a kaja nincs perc");
    }

    res.redirect("/admin/orders");
  } catch (error) {
    console.log(error);

    error.httpStatusCode = 500;
    return next(error);
  }
};
