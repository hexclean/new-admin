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
const ProductVariantsExtras = require("../../models/ProductVariantsExtras");
const Extra = require("../../models/Extra");
const ExtraTranslation = require("../../models/ExtraTranslation");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const Op = Sequelize.Op;
const Nexmo = require("nexmo");
// const socketio = require("socket.io");
const { type } = require("os");
const ITEMS_PER_PAGE = 20;
const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "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",
    },
  })
);
const nexmo = new Nexmo(
  {
    apiKey: "d5443b6c",
    apiSecret: "1BwKJBVaAkNDSG9W",
  },
  { debug: true }
);
exports.getOrders = async (req, res, next) => {
  const orders = await Order.findAll({
    include: [
      {
        model: OrderItem,

        include: [
          {
            model: OrderItemExtra,
          },
          {
            model: Variant,
            include: [
              {
                model: ProductFinal,
                include: [
                  {
                    model: Product,
                    include: [{ model: ProductTranslation }],
                  },
                ],
              },
              {
                model: ProductVariantsExtras,
                include: [
                  { model: Extra, include: [{ model: ExtraTranslation }] },
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
          },
        ],
      },
    ],
  });
  console.log(orders);
  let extras = [];

  for (let i = 0; i < orders.length; i++) {
    const resultWithAll = [];
    let variants = orders[i].OrderItems;

    for (let j = 0; j < variants.length; j++) {
      extras = variants[j].OrderItemExtras;

      for (let k = 0; k < extras.length; k++) {
        let totalProductPrice = 0;
        let totalExtraPrice = 0;

        totalProductPrice +=
          parseFloat(variants[j].variantPrice) * parseInt(variants[j].quantity);
        totalExtraPrice +=
          parseFloat(extras[k].extraPrice) * parseInt(extras[k].quantity);

        const items = {
          product_id: variants[j].Variant.ProductFinals[j].productId,
          product_quantity: variants[j].quantity,
          product_price: variants[j].variantPrice,
          product_name:
            variants[j].Variant.ProductFinals[j].Product.ProductTranslations[0]
              .title,
          extra_id: extras[k].extraId,
          extra_quantity: extras[k].quantity,
          extra_price: extras[k].extraPrice,
          extra_name:
            variants[j].Variant.ProductVariantsExtras[k].Extra
              .ExtraTranslations[0].name,
          total_product_price: totalProductPrice,
          total_extra_price: totalExtraPrice,
        };

        resultWithAll.push(items);
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

          ...rest
        }
      ) => {
        const key = `${product_id}-${product_quantity}-${product_price}-${product_name}-${total_product_price}`;
        r[key] = r[key] || {
          product_id,
          product_quantity,
          product_price,
          product_name,
          total_product_price,

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
    variants: orders[0].OrderItems,
    extras: extras,
    // result: 1,
  });
};

exports.getEditOrder = async (req, res, next) => {
  const editMode = req.query.edit;
  const orderId = req.params.orderId;
  try {
    if (!editMode) {
      return res.redirect("/");
    }

    await Order.findByPk(orderId).then((order) => {
      if (!order) {
        return res.redirect("/");
      }
    });

    const order = await Order.findAll({
      where: {
        id: orderId,
      },
      include: [
        {
          model: User,
          model: OrderItem,

          include: [
            {
              model: OrderItemExtra,
            },
            {
              model: Variant,
              include: [
                {
                  model: ProductFinal,
                  include: [
                    {
                      model: Product,
                      include: [{ model: ProductTranslation }],
                    },
                  ],
                },
                {
                  model: ProductVariantsExtras,
                  include: [
                    { model: Extra, include: [{ model: ExtraTranslation }] },
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
            },
          ],
        },
      ],
    });
    let extras = [];
    const resultWithAll = [];
    let variants = order[0].OrderItems;
    for (let j = 0; j < variants.length; j++) {
      extras = variants[j].OrderItemExtras;

      for (let k = 0; k < extras.length; k++) {
        let totalProductPrice = 0;
        let totalExtraPrice = 0;

        totalProductPrice +=
          parseFloat(variants[j].variantPrice) * parseInt(variants[j].quantity);
        totalExtraPrice +=
          parseFloat(extras[k].extraPrice) * parseInt(extras[k].quantity);

        const items = {
          product_id: variants[j].Variant.ProductFinals[j].productId,
          product_quantity: variants[j].quantity,
          product_price: variants[j].variantPrice,
          product_name:
            variants[j].Variant.ProductFinals[j].Product.ProductTranslations[0]
              .title,
          extra_id: extras[k].extraId,
          extra_quantity: extras[k].quantity,
          extra_price: extras[k].extraPrice,
          extra_name:
            variants[j].Variant.ProductVariantsExtras[k].Extra
              .ExtraTranslations[0].name,
          total_product_price: totalProductPrice,
          total_extra_price: totalExtraPrice,
        };

        resultWithAll.push(items);
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

          ...rest
        }
      ) => {
        const key = `${product_id}-${product_quantity}-${product_price}-${product_name}-${total_product_price}`;
        r[key] = r[key] || {
          product_id,
          product_quantity,
          product_price,
          product_name,
          total_product_price,

          extras: [],
        };
        r[key]["extras"].push(rest);
        return r;
      },
      {}
    );

    const result = Object.values(merged);

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
    totalPriceFinal = order[0].totalPrice;
    cutlery = order[0].cutlery;
    take = order[0].take;
    //   orderCity = order[0].OrderDeliveryAddress;
    orderStreet = order[0].OrderDeliveryAddress.street;
    orderHouseNumber = order[0].OrderDeliveryAddress.houseNumber;
    orderFloor = order[0].OrderDeliveryAddress.floor;
    orderDoorNumber = order[0].OrderDeliveryAddress.doorNumber;
    orderPhoneNumber = order[0].OrderDeliveryAddress.phoneNumber;
    orderCreated = order[0].createdAt;
    userName = order[0].User.fullName;
    orderIds = order[0].id;

    res.render("order/edit-order", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      order: order,
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
      variants: order[0].OrderItems,
      extras: extras,
      result: result,
      userEmail: order[0].User.email,
    });
  } catch (err) {
    console.log(err);
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
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
  console.log("hours:", hours);
  console.log("minutes:", minutes);
  console.log("email", email);
  // api key: d5443b6c
  //   Api secret: 1BwKJBVaAkNDSG9W
  const from = "Vonage APIs";
  //   const to = "40753541070"; -> helyes
  const to = phoneNumber;

  try {
    // if (hours == "0") {
    //   const text = `A rendelesed korulbelul ${minutes} perc mulva erkezik`;
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
    //         <p>A rendelesed korulbelul ${minutes} perc mulva erkezik</p>
    //         <p></p>
    //       `,
    //   });
    // } else {
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
