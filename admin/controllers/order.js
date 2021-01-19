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
            console.log("az");
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
            console.log("ex");
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
            console.log("az");
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
  const updatedRoName = req.body.roName;
  const updatedHuName = req.body.huName;
  const updatedEnName = req.body.enName;
  const extTranId = req.body.extTranId;
  const hours = req.body.hours;
  const minutes = req.body.minutes;
  const email = req.body.email;
  const phoneNumber = req.body.phoneNumber;
  const failedDescription = req.body.failedDescription;
  const orderId = req.body.orderId;
  const datepicker = req.body.datepicker;

  const rest = await Restaurant.findByPk(req.admin.id);
  const ordered = await Order.findOne({
    where: { encodedKey: orderId },
    include: [{ model: OrderDeliveryAddress }],
  });
  const user = ordered.OrderDeliveryAddress.userName;
  let restaurantName = rest.fullName;
  let restaurantPhone = rest.phoneNumber;

  try {
    if (hours == "0" && failedDescription.length == 0) {
      var jsonDataObj = {
        to: "+40749558635",
        sender: "4",
        body: `Kedves ${user}! A(z) ${restaurantName} sikeresen elfogadta a rendelésed, melynek rendelési száma: ${orderId}. A rendelésed várhatóan ${minutes} perc múlva érkezik. További információkért az étterem telefonszámán érdeklődhetsz: ${restaurantPhone}.\nJó étvágyat kíván a Foodnet csapata!`,
      };

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
        subject: "Hello",
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml"
        xmlns:v="urn:schemas-microsoft-com:vml"
        xmlns:o="urn:schemas-microsoft-com:office:office">
        <head>
        <!--[if gte mso 9]><xml>
        <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml><![endif]-->
        <title>meowgun</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0 " />
        <meta name="format-detection" content="telephone=no"/>
        <!--[if !mso]><!-->
        <link href="https://fonts.googleapis.com/css?family=Lato:100,100i,300,300i,400,700,700i,900,900i" rel="stylesheet" />
        <!--<![endif]-->
        <style type="text/css">
        body {
          margin: 0;
          padding: 0;
          -webkit-text-size-adjust: 100% !important;
          -ms-text-size-adjust: 100% !important;
          -webkit-font-smoothing: antialiased !important;
        }
        img {
          border: 0 !important;
          outline: none !important;
        }
        p {
          Margin: 0px !important;
          Padding: 0px !important;
        }
        table {
          border-collapse: collapse;
          mso-table-lspace: 0px;
          mso-table-rspace: 0px;
        }
        td, a, span {
          border-collapse: collapse;
          mso-line-height-rule: exactly;
        }
        .ExternalClass * {
          line-height: 100%;
        }
        .em_blue a {text-decoration:none; color:#264780;}
        .em_grey a {text-decoration:none; color:#434343;}
        .em_white a {text-decoration:none; color:#ffffff;}
        
        @media only screen and (min-width:481px) and (max-width:649px) {
        .em_main_table {width: 100% !important;}
        .em_wrapper{width: 100% !important;}
        .em_hide{display:none !important;}
        .em_aside10{padding:0px 10px !important;}
        .em_h20{height:20px !important; font-size: 1px!important; line-height: 1px!important;}
        .em_h10{height:10px !important; font-size: 1px!important; line-height: 1px!important;}
        .em_aside5{padding:0px 10px !important;}
        .em_ptop2 { padding-top:8px !important; }
        }
        @media only screen and (min-width:375px) and (max-width:480px) {
        .em_main_table {width: 100% !important;}
        .em_wrapper{width: 100% !important;}
        .em_hide{display:none !important;}
        .em_aside10{padding:0px 10px !important;}
        .em_aside5{padding:0px 8px !important;}
        .em_h20{height:20px !important; font-size: 1px!important; line-height: 1px!important;}
        .em_h10{height:10px !important; font-size: 1px!important; line-height: 1px!important;}
        .em_font_11 {font-size: 12px !important;}
        .em_font_22 {font-size: 22px !important; line-height:25px !important;}
        .em_w5 { width:7px !important; }
        .em_w150 { width:150px !important; height:auto !important; }
        .em_ptop2 { padding-top:8px !important; }
        u + .em_body .em_full_wrap { width:100% !important; width:100vw !important;}
        }
        @media only screen and (max-width:374px) {
        .em_main_table {width: 100% !important;}
        .em_wrapper{width: 100% !important;}
        .em_hide{display:none !important;}
        .em_aside10{padding:0px 10px !important;}
        .em_aside5{padding:0px 8px !important;}
        .em_h20{height:20px !important; font-size: 1px!important; line-height: 1px!important;}
        .em_h10{height:10px !important; font-size: 1px!important; line-height: 1px!important;}
        .em_font_11 {font-size: 11px !important;}
        .em_font_22 {font-size: 22px !important; line-height:25px !important;}
        .em_w5 { width:5px !important; }
        .em_w150 { width:150px !important; height:auto !important; }
        .em_ptop2 { padding-top:8px !important; }
        u + .em_body .em_full_wrap { width:100% !important; width:100vw !important;}
        }
        </style>
        
        </head>
        <body class="em_body" style="margin:0px auto; padding:0px;" bgcolor="#efefef">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="em_full_wrap" align="center"  bgcolor="#efefef">
            <tr>
              <td align="center" valign="top"><table align="center" width="650" border="0" cellspacing="0" cellpadding="0" class="em_main_table" style="width:650px; table-layout:fixed;">
                  <tr>
                    <td align="center" valign="top" style="padding:0 25px;" class="em_aside10"><table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
                      <tr>
                        <td height="25" style="height:25px;" class="em_h20">&nbsp;</td>
                      </tr>
                      <tr>
                        <td align="center" valign="top"><a href="#" target="_blank" style="text-decoration:none;"><img src="/assets/pilot/images/templates/header_logo.png" width="208" height="41" alt="meowgun" border="0" style="display:block; font-family:Arial, sans-serif; font-size:18px; line-height:25px; text-align:center; color:#1d4685; font-weight:bold; max-width:208px;" class="em_w150" /></a></td>
                      </tr>
                      <tr>
                        <td height="28" style="height:28px;" class="em_h20">&nbsp;</td>
                      </tr>
                    </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
        </table>
        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="em_full_wrap" align="center" bgcolor="#efefef">
            <tr>
              <td align="center" valign="top" class="em_aside5"><table align="center" width="650" border="0" cellspacing="0" cellpadding="0" class="em_main_table" style="width:650px; table-layout:fixed;">
                  <tr>
                    <td align="center" valign="top" style="padding:0 25px; background-color:#ffffff;" class="em_aside10"><table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
                      <tr>
                        <td height="45" style="height:45px;" class="em_h20">&nbsp;</td>
                      </tr>
                      <tr>
                        <td class="em_blue em_font_22" align="center" valign="top" style="font-family: Arial, sans-serif; font-size: 26px; line-height: 29px; color:#264780; font-weight:bold;">Forgot your password?</td>
                      </tr>
                      <tr>
                        <td height="14" style="height:14px; font-size:0px; line-height:0px;">&nbsp;</td>
                      </tr>
                      <tr>
                        <td class="em_grey" align="center" valign="top" style="font-family: Arial, sans-serif; font-size: 16px; line-height: 26px; color:#434343;">It happens to the best of us. The good news is you can change it&nbsp;right&nbsp;meow.</td>
                      </tr>
                      <tr>
                        <td height="26" style="height:26px;" class="em_h20">&nbsp;</td>
                      </tr>
                      <tr>
                        <td align="center" valign="top"><table width="250" style="width:250px; background-color:#6bafb2; border-radius:4px;" border="0" cellspacing="0" cellpadding="0" align="center">
                          <tr>
                            <td class="em_white" height="42" align="center" valign="middle" style="font-family: Arial, sans-serif; font-size: 16px; color:#ffffff; font-weight:bold; height:42px;"><a href="https://www.mailgun.com" target="_blank" style="text-decoration:none; color:#ffffff; line-height:42px; display:block;">RESET YOUR PASSWORD</a></td>
                          </tr>
                        </table>
                        </td>
                      </tr>
                      <tr>
                        <td height="25" style="height:25px;" class="em_h20">&nbsp;</td>
                      </tr>
                      <tr>
                        <td class="em_grey" align="center" valign="top" style="font-family: Arial, sans-serif; font-size: 16px; line-height: 26px; color:#434343;">If you didn&rsquo;t request a password reset, you don&rsquo;t have to do anything.<br class="em_hide" />
        Just ignore this email the way your cat ignores&nbsp;you.</td>
                      </tr>
                      <tr>
                        <td height="44" style="height:44px;" class="em_h20">&nbsp;</td>
                      </tr>
                    </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
        </table>
        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="em_full_wrap" align="center" bgcolor="#efefef">
            <tr>
              <td align="center" valign="top"><table align="center" width="650" border="0" cellspacing="0" cellpadding="0" class="em_main_table" style="width:650px; table-layout:fixed;">
                  <tr>
                    <td align="center" valign="top" style="padding:0 25px;" class="em_aside10"><table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
                      <tr>
                        <td height="40" style="height:40px;" class="em_h20">&nbsp;</td>
                      </tr>
                      <tr>
                        <td align="center" valign="top"><table border="0" cellspacing="0" cellpadding="0" align="center">
                            <tr>
                              <td width="30" style="width:30px;" align="center" valign="middle"><a href="#" target="_blank" style="text-decoration:none;"><img src="/assets/pilot/images/templates/fb.png" width="30" height="30" alt="Fb" border="0" style="display:block; font-family:Arial, sans-serif; font-size:18px; line-height:25px; text-align:center; color:#000000; font-weight:bold; max-width:30px;" /></a></td>
                              <td width="12" style="width:12px;">&nbsp;</td>
                              <td width="30" style="width:30px;" align="center" valign="middle"><a href="#" target="_blank" style="text-decoration:none;"><img src="/assets/pilot/images/templates/tw.png" width="30" height="30" alt="Tw" border="0" style="display:block; font-family:Arial, sans-serif; font-size:14px; line-height:25px; text-align:center; color:#000000; font-weight:bold; max-width:30px;" /></a></td>
                              <td width="12" style="width:12px;">&nbsp;</td>
                              <td width="30" style="width:30px;" align="center" valign="middle"><a href="#" target="_blank" style="text-decoration:none;"><img src="/assets/pilot/images/templates/insta.png" width="30" height="30" alt="Insta" border="0" style="display:block; font-family:Arial, sans-serif; font-size:14px; line-height:25px; text-align:center; color:#000000; font-weight:bold; max-width:30px;" /></a></td>
                            </tr>
                          </table>
                         </td>
                      </tr>
                      <tr>
                        <td height="16" style="height:16px; font-size:1px; line-height:1px; height:16px;">&nbsp;</td>
                      </tr>
                      <tr>
                        <td class="em_grey" align="center" valign="top" style="font-family: Arial, sans-serif; font-size: 15px; line-height: 18px; color:#434343; font-weight:bold;">Problems or questions?</td>
                      </tr>
                      <tr>
                        <td height="10" style="height:10px; font-size:1px; line-height:1px;">&nbsp;</td>
                      </tr>
                      <tr>
                        <td align="center" valign="top" style="font-size:0px; line-height:0px;"><table border="0" cellspacing="0" cellpadding="0" align="center">
                          <tr>
                            <td width="15" align="left" valign="middle" style="font-size:0px; line-height:0px; width:15px;"><a href="mailto:meow@meowgun.com" style="text-decoration:none;"><img src="/assets/pilot/images/templates/email_img.png" width="15" height="12" alt="" border="0" style="display:block; max-width:15px;" /></a></td>
                            <td width="9" style="width:9px; font-size:0px; line-height:0px;" class="em_w5"><img src="/assets/pilot/images/templates/spacer.gif" width="1" height="1" alt="" border="0" style="display:block;" /></td>
                            <td class="em_grey em_font_11" align="left" valign="middle" style="font-family: Arial, sans-serif; font-size: 13px; line-height: 15px; color:#434343;"><a href="mailto:meow@meowgun.com" style="text-decoration:none; color:#434343;">meow@meowgun.com</a> <a href="mailto:marketing@mailgun.com" style="text-decoration:none; color:#434343;">[mailto:marketing@mailgun.com]</a></td>
                          </tr>
                        </table>
                        </td>
                      </tr>
                       <tr>
                        <td height="9" style="font-size:0px; line-height:0px; height:9px;" class="em_h10"><img src="/assets/pilot/images/templates/spacer.gif" width="1" height="1" alt="" border="0" style="display:block;" /></td>
                      </tr>
                       <tr>
                        <td align="center" valign="top"><table border="0" cellspacing="0" cellpadding="0" align="center">
                          <tr>
                            <td width="12" align="left" valign="middle" style="font-size:0px; line-height:0px; width:12px;"><a href="#" target="_blank" style="text-decoration:none;"><img src="/assets/pilot/images/templates/img_1.png" width="12" height="16" alt="" border="0" style="display:block; max-width:12px;" /></a></td>
                            <td width="7" style="width:7px; font-size:0px; line-height:0px;" class="em_w5">&nbsp;</td>
                            <td class="em_grey em_font_11" align="left" valign="middle" style="font-family: Arial, sans-serif; font-size: 13px; line-height: 15px; color:#434343;"><a href="#" target="_blank" style="text-decoration:none; color:#434343;">Meowgun</a> &bull; 123 Meow Way &bull; Cattown, CA 95389</td>
                          </tr>
                        </table>
                        </td>
                      </tr>
                      <tr>
                        <td height="35" style="height:35px;" class="em_h20">&nbsp;</td>
                      </tr>
                    </table>
                    </td>
                  </tr>
                   <tr>
                    <td height="1" bgcolor="#dadada" style="font-size:0px; line-height:0px; height:1px;"><img src="/assets/pilot/images/templates/spacer.gif" width="1" height="1" alt="" border="0" style="display:block;" /></td>
                  </tr>
                   <tr>
                    <td align="center" valign="top" style="padding:0 25px;" class="em_aside10"><table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
                      <tr>
                        <td height="16" style="font-size:0px; line-height:0px; height:16px;">&nbsp;</td>
                      </tr>
                      <tr>
                        <td align="center" valign="top"><table border="0" cellspacing="0" cellpadding="0" align="left" class="em_wrapper">
                          <tr>
                            <td class="em_grey" align="center" valign="middle" style="font-family: Arial, sans-serif; font-size: 11px; line-height: 16px; color:#434343;">&copy; Meowgun 2019  &nbsp;|&nbsp;  <a href="#" target="_blank" style="text-decoration:underline; color:#434343;">Unsubscribe</a></td>
                          </tr>
                        </table>
                        </td>
                      </tr>
                      <tr>
                        <td height="16" style="font-size:0px; line-height:0px; height:16px;">&nbsp;</td>
                      </tr>
                    </table>
                    </td>
                  </tr>
                  <tr>
                    <td class="em_hide" style="line-height:1px;min-width:650px;background-color:#efefef;"><img alt="" src="/assets/pilot/images/templates/spacer.gif" height="1" width="650" style="max-height:1px; min-height:1px; display:block; width:650px; min-width:650px;" border="0" /></td>
                  </tr>
                </table>
              </td>
            </tr>
        </table>
        </body>
        </html>`,
        // "h:X-Mailgun-Variables": { test: "test" },
      };
      await mg.messages().send(data, function (error, body) {
        if (error) {
          console.log(error);
        }

        console.log(body);
      });
      // sendSms();
      await Order.update(
        { orderStatusId: 1 },
        { where: { encodedKey: orderId } }
      );

      // console.log("x perc mulva erkezik");
      // console.log("orderId", orderId);
    } else if (failedDescription.length !== 0) {
      await Order.update(
        { orderStatusId: 3, deletedMessage: failedDescription },
        { where: { id: orderId } }
      );
      // console.log("ELUTASITVA!!");
      // console.log("orderId", orderId);
    } else if ((hours !== "0") & (minutes !== "0")) {
      await Order.update({ orderStatusId: 2 }, { where: { id: orderId } });
      // console.log("van ora es perc is");
      // console.log("orderId", orderId);
    } else {
      // console.log("orderId", orderId);
      await Order.update({ orderStatusId: 2 }, { where: { id: orderId } });
      // console.log("ennyi ora mulva jon a kaja nincs perc");
    }

    // nexmo.message.sendSms(from, to, text),
    //   {
    //     type: "unicode",
    //   },
    //   (err, responseData) => {
    //     if (err) {
    //       console.log(err);
    //     } else {
    //       console.dir(responseData);
    //     }
    //   };
    // transporter.sendMail({
    //   to: email,
    //   from: "order@foodnet.ro",
    //   subject: "Delivery Time",
    //   html: `
    //     <p>A rendelesed korulbelul ${minutes} perc mulva erkezik</p>
    //     <p></p>
    //   `,
    // });
    // if (hours == "0" && failedDescription.length == 0) {
    //   console.log("igaz mert nem azt csinaltam");
    //   const text = `A rendelesed korulbelul ${minutes} perc mulva erkezik`;

    // } else {
    // console.log("-0-=-=-=-=-=---=-==-=---=-=-=-=-=-=");
    //   const text = `A rendelesed korulbelul ${hours} óra és ${minutes} perc mulva erkezik`;
    //   nexmo.message.sendSms(from, to, text),
    //     {
    //       type: "unicode",
    //     },
    //     (err, responseData) => {
    //       if (err) {
    //         console.log(err);
    //       } else {
    //         console.dir(responseData);
    //       }
    //     };
    //   transporter.sendMail({
    //     to: email,
    //     from: "order@foodnet.ro",
    //     subject: "Delivery Time",
    //     html: `
    //         <p>>A rendelesed korulbelul ${hours} óra és ${minutes} perc mulva erkezik</p>
    //         <p></p>
    //       `,
    //   });
    // }

    res.redirect("/admin/orders");
  } catch (error) {
    console.log(error);

    error.httpStatusCode = 500;
    return next(error);
  }
};
