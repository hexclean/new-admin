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

  const data = {
    from: "info@foodnet.ro",
    to: "erdosjozsef20@gmail.com",
    subject: "Kiszállítási idő",
    html: `
   <h1> hello</h1>
    `,
    // "h:X-Mailgun-Variables": { test: "test" },
  };
  await mg.messages().send(data, function (error, body) {
    if (error) {
      console.log(error);
    }
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
              let extraPlusProduct = 0;
              totalExtraPrice +=
                parseFloat(extras[k].extraPrice) * parseInt(extras[k].quantity);
              // console.log("totalExtraPrice");

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

              // console.log("totalSection", totalSection);

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
      // console.log(reduced[0].extras);
      console.log(reduced);
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
        <html lang="en">
          <head>
            <title>Food Net</title>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
          </head>
          <body>
            <!-- Full Bleed Background Section : BEGIN -->
            <table
              bgcolor="#efefef"
              cellspacing="0"
              cellpadding="0"
              border="0"
              align="center"
              width="100%"
              style="font-family: arial"
            >
              <tr>
                <td valign="top">
                  <div style="max-width: 600px; margin: auto; background: #fff">
                    <!--[if mso]>
        <table cellspacing="0" cellpadding="0" border="0" width="600" align="center">
        <tr>
        <td>
        <![endif]-->
                    <table cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="text-align: center">
                          <div style="padding: 25px 0px; background: #fff">
                            <a href="#">
                              <img
                                src="http://techodi.com/foodnet-emailtemplate/images/foodnet-logo1.png"
                                style="display: block; margin: auto"
                            /></a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div style="padding: 0px 15px">
                            <h4>Dear Erdős József,</h4>
        
                            <p>
                              Thank you for your order! We will notify you shortly of
                              your order processing.
                            </p>
                            <p>You can also view your order under your profile.</p>
                            <h4>
                              Order id (AS3FGU87)<br /><br />Order created at: xxxx
                            </h4>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <table
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            align="center"
                            width="100%"
                            style="max-width: 100%"
                          >
                            <tr>
                              <td align="center" valign="top">
                                <!--[if mso]>
        <table border="0" cellspacing="0" cellpadding="0" align="center" width="600">
        <tr>
        <td align="left" valign="top" width="200">
        <![endif]-->
        
                                <div
                                  style="
                                    display: inline-block;
                                    margin: 0 -2px;
                                    max-width: 48%;
                                    min-width: 160px;
                                    vertical-align: top;
                                    width: 100%;
                                  "
                                  class="stack-column"
                                >
                                  <table
                                    cellspacing="0"
                                    cellpadding="0"
                                    border="0"
                                    width="100%"
                                  >
                                    <tr>
                                      <td>
                                        <div style="padding: 0px 15px">
                                          <h4>Delivery address information</h4>
        
                                          <p>Name: Erdős József</p>
                                          <p>Phone number: 0753541070</p>
        
                                          <p>Location: Székelyudvarhely</p>
                                          <p>Street: Mihálydeák</p>
                                          <p>House number: 1263</p>
                                          <p>Floor: 1</p>
                                          <p>Door number: 2A</p>
                                        </div>
                                      </td>
                                    </tr>
                                  </table>
                                </div>
        
                                <!--[if mso]>
        </td>
        <td align="left" valign="top" width="200">
        <![endif]-->
                                <div
                                  style="
                                    display: inline-block;
                                    margin: 0 -2px;
                                    max-width: 48%;
                                    min-width: 160px;
                                    vertical-align: top;
                                    width: 100%;
                                  "
                                  class="stack-column"
                                >
                                  <table
                                    cellspacing="0"
                                    cellpadding="0"
                                    border="0"
                                    width="100%"
                                  >
                                    <tr>
                                      <td>
                                        <div style="padding: 0px 15px">
                                          <h4>Payment</h4>
                                          <p>Payment method: Cash</p>
                                        </div>
                                      </td>
                                    </tr>
                                  </table>
                                </div>
        
                                <!--[if mso]>
        </td>                    
        </tr>
        </table>
        <![endif]-->
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <table
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            align="center"
                            width="100%"
                            style="max-width: 600px"
                          >
                            <tr>
                              <td align="center" valign="top">
                                <!--[if mso]>
        <table border="0" cellspacing="0" cellpadding="0" align="center" width="600">
        <tr>
        <td align="left" valign="top" width="200">
        <![endif]-->
                                <div
                                  style="
                                    display: inline-block;
                                    margin: 0 -2px;
                                    max-width: 29%;
                                    min-width: 130px;
                                    vertical-align: top;
                                    width: 100%;
                                  "
                                  class="stack-column"
                                >
                                  <table
                                    cellspacing="0"
                                    cellpadding="0"
                                    border="0"
                                    width="100%"
                                  >
                                    <tr>
                                      <td style="padding: 10px 10px">
                                        <div style="padding: 0px 0px">
                                          <h4>Product</h4>
                                          <p>{product_name}</p>
                                          <p>{product_message}</p>
                                          <p>{box_price}</p>
                                        </div>
                                      </td>
                                    </tr>
                                  </table>
                                </div>
                                <!--[if mso]>
        </td>
        <td align="left" valign="top" width="200">
        <![endif]-->
                                <div
                                  style="
                                    display: inline-block;
                                    margin: 0 -2px;
                                    max-width: 29%;
                                    min-width: 30px;
                                    vertical-align: top;
                                    width: 100%;
                                  "
                                  class="stack-column"
                                >
                                  <table
                                    cellspacing="0"
                                    cellpadding="0"
                                    border="0"
                                    width="100%"
                                  >
                                    <tr>
                                      <td style="padding: 10px 10px">
                                        <div style="padding: 0px 0px">
                                          <h4>Quantity</h4>
                                          <p>1</p>
                                          <p>1</p>
                                        </div>
                                      </td>
                                    </tr>
                                  </table>
                                </div>
                                <!--[if mso]>
        </td>
        <td align="left" valign="top" width="200">
        <![endif]-->
                                <div
                                  style="
                                    display: inline-block;
                                    margin: 0 -2px;
                                    max-width: 29%;
                                    min-width: 20px;
                                    vertical-align: top;
                                    width: 100%;
                                  "
                                  class="stack-column"
                                >
                                  <table
                                    cellspacing="0"
                                    cellpadding="0"
                                    border="0"
                                    width="100%"
                                  >
                                    <tr>
                                      <td style="padding: 10px 10px">
                                        <div style="padding: 0px 0px">
                                          <h4>Price</h4>
                                          <p>34.50 lei</p>
                                          <p>13.6 lei</p>
                                        </div>
                                      </td>
                                    </tr>
                                  </table>
                                </div>
        
                                <!--[if mso]>
        </td>
        </tr>
        </table>
        <![endif]-->
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <table
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            align="center"
                            width="100%"
                            style="max-width: 100%"
                          >
                            <tr>
                              <td align="center" valign="top">
                                <!--[if mso]>
        <table border="0" cellspacing="0" cellpadding="0" align="center" width="600">
        <tr>
        <td align="left" valign="top" width="200">
        <![endif]-->
        
                                <div
                                  style="
                                    display: inline-block;
                                    margin: 0 -2px;
                                    max-width: 48%;
                                    min-width: 160px;
                                    vertical-align: top;
                                    width: 100%;
                                  "
                                  class="stack-column"
                                >
                                  <table
                                    cellspacing="0"
                                    cellpadding="0"
                                    border="0"
                                    width="100%"
                                  >
                                    <tr>
                                      <td>
                                        <div style="padding: 0px 15px">
                                          <h4>Shipping price</h4>
                                          <h4>Total</h4>
                                        </div>
                                      </td>
                                    </tr>
                                  </table>
                                </div>
        
                                <!--[if mso]>
        </td>
        <td align="left" valign="top" width="200">
        <![endif]-->
        
                                <div
                                  style="
                                    display: inline-block;
                                    margin: 0 -2px;
                                    max-width: 48%;
                                    min-width: 160px;
                                    vertical-align: top;
                                    width: 100%;
                                  "
                                  class="stack-column"
                                >
                                  <table
                                    cellspacing="0"
                                    cellpadding="0"
                                    border="0"
                                    width="100%"
                                  >
                                    <tr>
                                      <td>
                                        <div style="padding: 0px 15px">
                                          <h4>1.0 lei</h4>
                                          <h4>49.1 lei</h4>
                                        </div>
                                      </td>
                                    </tr>
                                  </table>
                                </div>
        
                                <!--[if mso]>
        </td>                    
        </tr>
        </table>
        <![endif]-->
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div style="padding: 0px 15px">
                            <h4>Best regards:</h4>
                            <h4>Foodnet team.</h4>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style="text-align: center; background: #000">
                          <div style="padding: 30px 0px">
                            <a href="#">
                              <img
                                src="http://techodi.com/foodnet-emailtemplate/images/social-icon1.png"
                                style="margin: 0px 5px"
                            /></a>
                            <a href="#">
                              <img
                                src="http://techodi.com/foodnet-emailtemplate/images/social-icon2.png"
                                style="margin: 0px 5px"
                            /></a>
                            <a href="#">
                              <img
                                src="http://techodi.com/foodnet-emailtemplate/images/socialicon-3.png"
                                style="margin: 0px 5px"
                            /></a>
                          </div>
                        </td>
                      </tr>
                    </table>
                    <!--[if mso]>
        </td>
        </tr>
        </table>
        <![endif]-->
                  </div>
                </td>
              </tr>
            </table>
            <!-- Full Bleed Background Section : END -->
          </body>
        </html>
        `,
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
