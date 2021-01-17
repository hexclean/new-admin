const Sequelize = require("sequelize");
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
  let totalPriceFinal;
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
  let extrasArray = [];
  if (orders.length != 0) {
    for (let i = 0; i < orders.length; i++) {
      const resultWithAll = [];
      let orderItems = orders[i].OrderItems;

      for (let j = 0; j < orderItems.length; j++) {
        extras = orderItems[j].OrderItemExtras;
        //
        let prodFin = orderItems[j].Variant.ProductFinals;
        for (let h = 0; h < prodFin.length; h++) {
          if (extras.length == 0) {
            let totalProductPrice = 0;

            totalProductPrice +=
              parseFloat(orderItems[j].variantPrice) *
              parseInt(orderItems[j].quantity);
            const items = {
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
              extrasArray.push(extras[k]);
              let totalProductPrice = 0;
              let totalExtraPrice = 0;

              totalProductPrice +=
                parseFloat(orderItems[j].variantPrice) *
                parseInt(orderItems[j].quantity);
              totalExtraPrice +=
                parseFloat(extras[k].extraPrice) * parseInt(extras[k].quantity);
              const items = {
                variant_sku: orderItems[j].Variant.sku,

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

      const merged = resultWithAll.reduce(
        (
          r,
          {
            product_id,
            product_quantity,
            product_price,
            product_name,
            total_product_price,
            message,
            extra_length,
            variant_sku,
            ...rest
          }
        ) => {
          const key = `${product_id}-${product_quantity}-${product_price}-${product_name}-${total_product_price}-${message}-${extra_length}-${variant_sku}`;
          r[key] = r[key] || {
            product_id,
            product_quantity,
            product_price,
            product_name,
            total_product_price,
            message,
            extra_length,
            variant_sku,
            extras: [],
          };
          r[key]["extras"].push(rest);
          return r;
        },
        {}
      );

      const result = Object.values(merged);
      orders[i].products = result;
    }
    totalPriceFinal = orders[0].totalPrice;
    cutlery = orders[0].cutlery;
    take = orders[0].take;
    //   orderCity = orders[0].OrderDeliveryAddress;
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
  let totalPriceFinal;
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
  let status;
  let extrasArray = [];
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

            totalProductPrice +=
              parseFloat(orderItems[j].variantPrice) *
              parseInt(orderItems[j].quantity);
            const items = {
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
              extrasArray.push(extras[k]);
              let totalProductPrice = 0;
              let totalExtraPrice = 0;

              totalProductPrice +=
                parseFloat(orderItems[j].variantPrice) *
                parseInt(orderItems[j].quantity);
              totalExtraPrice +=
                parseFloat(extras[k].extraPrice) * parseInt(extras[k].quantity);
              const items = {
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

      const merged = resultWithAll.reduce(
        (
          r,
          {
            product_id,
            product_quantity,
            product_price,
            product_name,
            total_product_price,
            message,
            ...rest
          }
        ) => {
          const key = `${product_id}-${product_quantity}-${product_price}-${product_name}-${total_product_price}-${message}`;
          r[key] = r[key] || {
            product_id,
            product_quantity,
            product_price,
            product_name,
            total_product_price,
            message,
            extras: [],
          };
          r[key]["extras"].push(rest);
          return r;
        },
        {}
      );

      const result = Object.values(merged);
      orders[i].products = result;
    }
    totalPriceFinal = orders[0].totalPrice;
    cutlery = orders[0].cutlery;
    take = orders[0].take;
    //   orderCity = orders[0].OrderDeliveryAddress;
    orderStreet = orders[0].OrderDeliveryAddress.street;
    orderHouseNumber = orders[0].OrderDeliveryAddress.houseNumber;
    orderFloor = orders[0].OrderDeliveryAddress.floor;
    orderDoorNumber = orders[0].OrderDeliveryAddress.doorNumber;
    orderPhoneNumber = orders[0].OrderDeliveryAddress.phoneNumber;
    orderCreated = orders[0].createdAt;
    userName = orders[0].User.fullName;
    orderIds = orders[0].id;
    status = orders[0].orderStatusId;
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
    status: status,
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
    let totalPriceFinal;
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
    let extrasArray = [];
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

              totalProductPrice +=
                parseFloat(orderItems[j].variantPrice) *
                parseInt(orderItems[j].quantity);
              const items = {
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
                extrasArray.push(extras[k]);
                let totalProductPrice = 0;
                let totalExtraPrice = 0;

                totalProductPrice +=
                  parseFloat(orderItems[j].variantPrice) *
                  parseInt(orderItems[j].quantity);
                totalExtraPrice +=
                  parseFloat(extras[k].extraPrice) *
                  parseInt(extras[k].quantity);
                const items = {
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

        const merged = resultWithAll.reduce(
          (
            r,
            {
              product_id,
              product_quantity,
              product_price,
              product_name,
              total_product_price,
              message,
              ...rest
            }
          ) => {
            const key = `${product_id}-${product_quantity}-${product_price}-${product_name}-${total_product_price}-${message}`;
            r[key] = r[key] || {
              product_id,
              product_quantity,
              product_price,
              product_name,
              total_product_price,
              message,
              extras: [],
            };
            r[key]["extras"].push(rest);
            return r;
          },
          {}
        );

        const result = Object.values(merged);
        result2 = result;
        orders[i].products = result;
      }
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
      userName = orders[0].User.fullName;
      orderIds = orders[0].id;
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
      status: "orders[0].orderStatusId",
      deletedMessage: "orders[0].deletedMessage",
    });
  } catch (error) {
    console.log(error);
    error.httpStatusCode = 500;
    return next(error);
  }
};

exports.getDeletedOrders = async (req, res, next) => {
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
  let totalPriceFinal;
  let cutlery;
  let take;
  let userName;
  let status;
  let orderStreet;
  let orderHouseNumber;
  let orderFloor;
  let orderDoorNumber;
  let orderPhoneNumber;
  let orderCreated;
  let orderIds;
  let extrasArray = [];
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

            totalProductPrice +=
              parseFloat(orderItems[j].variantPrice) *
              parseInt(orderItems[j].quantity);
            const items = {
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
              extrasArray.push(extras[k]);
              let totalProductPrice = 0;
              let totalExtraPrice = 0;

              totalProductPrice +=
                parseFloat(orderItems[j].variantPrice) *
                parseInt(orderItems[j].quantity);
              totalExtraPrice +=
                parseFloat(extras[k].extraPrice) * parseInt(extras[k].quantity);
              const items = {
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

      const merged = resultWithAll.reduce(
        (
          r,
          {
            product_id,
            product_quantity,
            product_price,
            product_name,
            total_product_price,
            message,
            ...rest
          }
        ) => {
          const key = `${product_id}-${product_quantity}-${product_price}-${product_name}-${total_product_price}-${message}`;
          r[key] = r[key] || {
            product_id,
            product_quantity,
            product_price,
            product_name,
            total_product_price,
            message,
            extras: [],
          };
          r[key]["extras"].push(rest);
          return r;
        },
        {}
      );

      const result = Object.values(merged);
      orders[i].products = result;
    }
    totalPriceFinal = orders[0].totalPrice;
    cutlery = orders[0].cutlery;
    take = orders[0].take;
    //   orderCity = orders[0].OrderDeliveryAddress;
    orderStreet = orders[0].OrderDeliveryAddress.street;
    orderHouseNumber = orders[0].OrderDeliveryAddress.houseNumber;
    orderFloor = orders[0].OrderDeliveryAddress.floor;
    orderDoorNumber = orders[0].OrderDeliveryAddress.doorNumber;
    orderPhoneNumber = orders[0].OrderDeliveryAddress.phoneNumber;
    orderCreated = orders[0].createdAt;
    userName = orders[0].User.fullName;
    orderIds = orders[0].id;
    status = orders[0].orderStatusId;
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
    status: status,
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

  var sms = {
    to: phoneNumber,
    sender: "4",
    body: "helló vietnám",
  };

  try {
    if (hours == "0" && failedDescription.length == 0) {
      await Order.update({ orderStatusId: 2 }, { where: { id: orderId } });
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
    async function msg() {
      await AllergensTranslation.update(
        { name: updatedRoName },
        { where: { id: extTranId[0], languageId: 1 } }
      );

      await AllergensTranslation.update(
        { name: updatedHuName },
        { where: { id: extTranId[1], languageId: 2 } }
      );

      await AllergensTranslation.update(
        { name: updatedEnName },
        { where: { id: extTranId[2], languageId: 3 } }
      );
    }
  } catch (error) {
    console.log(error);

    error.httpStatusCode = 500;
    return next(error);
  }
};
