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
const RestaurantRole = require("../../models/RestaurantRole");
const mailgun = require("mailgun-js");
const DOMAIN = "mg.foodnet.ro";
const api_key = "key-6469129ca0603f9588c2a57c3b46defe";
const Cryptr = require("cryptr");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const mg = mailgun({
  apiKey: api_key,
  domain: DOMAIN,
  host: "api.eu.mailgun.net",
});

exports.postDeleteOrder = async (req, res, next) => {
  let orderId = req.params.id;
  const order = await Order.findOne({
    where: {
      id: orderId,
    },
    include: [{ model: OrderDeliveryAddress }],
  });
  let userEmail = order.OrderDeliveryAddress.email;
  let userName = order.OrderDeliveryAddress.userName;
  let encodedKey = order.encodedKey;
  const restaurant = await Restaurant.findByPk(req.admin.id);

  try {
    await Order.update({ orderStatusId: 6 }, { where: { id: orderId } });

    async function sendEmailForMe() {
      const data = {
        from: "info@foodnet.ro",
        to: "erdosjozsef20@gmail.com",
        subject: "Egy rendelés törlésre került!",
        html: `<p>A ${restaurant.fullName} étterem töröltt egy rendelést (id: ${orderId}).</p>
        <p>Törlés oka: ${req.body.reject}.</p>`,
      };

      await mg.messages().send(data, function (error, body) {
        if (error) {
          console.log(error);
        }
      });
    }

    async function sendEmailForUser() {
      const data = {
        from: "info@foodnet.ro",
        to: userEmail,
        subject: "Elutasított rendelés",
        html: `
        
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="x-apple-disable-message-reformatting" />
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <meta name="color-scheme" content="light dark" />
            <meta name="supported-color-schemes" content="light dark" />
            <title></title>
            <style type="text/css" rel="stylesheet" media="all">
              /* Base ------------------------------ */
        
              @import url("https://fonts.googleapis.com/css?family=Nunito+Sans:400,700&display=swap");
              body {
                width: 100% !important;
                height: 100%;
                margin: 0;
                -webkit-text-size-adjust: none;
              }
        
              a {
                color: #3869d4;
              }
        
              a img {
                border: none;
              }
        
              td {
                word-break: break-word;
              }
        
              .preheader {
                display: none !important;
                visibility: hidden;
                mso-hide: all;
                font-size: 1px;
                line-height: 1px;
                max-height: 0;
                max-width: 0;
                opacity: 0;
                overflow: hidden;
              }
              /* Type ------------------------------ */
        
              body,
              td,
              th {
                font-family: "Nunito Sans", Helvetica, Arial, sans-serif;
              }
        
              h1 {
                margin-top: 0;
                color: #333333;
                font-size: 22px;
                font-weight: bold;
                text-align: left;
              }
        
              h2 {
                margin-top: 0;
                color: #333333;
                font-size: 16px;
                font-weight: bold;
                text-align: left;
              }
        
              h3 {
                margin-top: 0;
                color: #333333;
                font-size: 14px;
                font-weight: bold;
                text-align: left;
              }
        
              td,
              th {
                font-size: 16px;
              }
        
              p,
              ul,
              ol,
              blockquote {
                margin: 0.4em 0 1.1875em;
                font-size: 16px;
                line-height: 1.625;
              }
        
              p.sub {
                font-size: 13px;
              }
              /* Utilities ------------------------------ */
        
              .align-right {
                text-align: right;
              }
        
              .align-left {
                text-align: left;
              }
        
              .align-center {
                text-align: center;
              }
              /* Buttons ------------------------------ */
        
              .button {
                background-color: #3869d4;
                border-top: 10px solid #3869d4;
                border-right: 18px solid #3869d4;
                border-bottom: 10px solid #3869d4;
                border-left: 18px solid #3869d4;
                display: inline-block;
                color: #fff;
                text-decoration: none;
                border-radius: 3px;
                box-shadow: 0 2px 3px rgba(0, 0, 0, 0.16);
                -webkit-text-size-adjust: none;
                box-sizing: border-box;
              }
        
              .button--green {
                background-color: #22bc66;
                border-top: 10px solid #22bc66;
                border-right: 18px solid #22bc66;
                border-bottom: 10px solid #22bc66;
                border-left: 18px solid #22bc66;
              }
        
              .button--red {
                background-color: #ff6136;
                border-top: 10px solid #ff6136;
                border-right: 18px solid #ff6136;
                border-bottom: 10px solid #ff6136;
                border-left: 18px solid #ff6136;
              }
        
              @media only screen and (max-width: 500px) {
                .button {
                  width: 100% !important;
                  text-align: center !important;
                }
              }
              /* Attribute list ------------------------------ */
        
              .attributes {
                margin: 0 0 21px;
              }
        
              .attributes_content {
                background-color: #f4f4f7;
                padding: 16px;
              }
        
              .attributes_item {
                padding: 0;
              }
              /* Related Items ------------------------------ */
        
              .related {
                width: 100%;
                margin: 0;
                padding: 25px 0 0 0;
                -premailer-width: 100%;
                -premailer-cellpadding: 0;
                -premailer-cellspacing: 0;
              }
        
              .related_item {
                padding: 10px 0;
                color: #cbcccf;
                font-size: 15px;
                line-height: 18px;
              }
        
              .related_item-title {
                display: block;
                margin: 0.5em 0 0;
              }
        
              .related_item-thumb {
                display: block;
                padding-bottom: 10px;
              }
        
              .related_heading {
                border-top: 1px solid #cbcccf;
                text-align: center;
                padding: 25px 0 10px;
              }
              /* Discount Code ------------------------------ */
        
              .discount {
                width: 100%;
                margin: 0;
                padding: 24px;
                -premailer-width: 100%;
                -premailer-cellpadding: 0;
                -premailer-cellspacing: 0;
                background-color: #f4f4f7;
                border: 2px dashed #cbcccf;
              }
        
              .discount_heading {
                text-align: center;
              }
        
              .discount_body {
                text-align: center;
                font-size: 15px;
              }
              /* Social Icons ------------------------------ */
        
              .social {
                width: auto;
              }
        
              .social td {
                padding: 0;
                width: auto;
              }
        
              .social_icon {
                height: 20px;
                margin: 0 8px 10px 8px;
                padding: 0;
              }
              /* Data table ------------------------------ */
        
              .purchase {
                width: 100%;
                margin: 0;
                padding: 35px 0;
                -premailer-width: 100%;
                -premailer-cellpadding: 0;
                -premailer-cellspacing: 0;
              }
        
              .purchase_content {
                width: 100%;
                margin: 0;
                padding: 25px 0 0 0;
                -premailer-width: 100%;
                -premailer-cellpadding: 0;
                -premailer-cellspacing: 0;
              }
        
              .purchase_item {
                padding: 10px 0;
                color: #51545e;
                font-size: 15px;
                line-height: 18px;
              }
        
              .purchase_heading {
                padding-bottom: 8px;
                border-bottom: 1px solid #eaeaec;
              }
        
              .purchase_heading p {
                margin: 0;
                color: #85878e;
                font-size: 12px;
              }
        
              .purchase_footer {
                padding-top: 15px;
                border-top: 1px solid #eaeaec;
              }
        
              .purchase_total {
                margin: 0;
                text-align: right;
                font-weight: bold;
                color: #333333;
              }
        
              .purchase_total--label {
                padding: 0 15px 0 0;
              }
        
              body {
                background-color: #f4f4f7;
                color: #51545e;
              }
        
              p {
                color: #51545e;
              }
        
              p.sub {
                color: #6b6e76;
              }
        
              .email-wrapper {
                width: 100%;
                margin: 0;
                padding: 0;
                -premailer-width: 100%;
                -premailer-cellpadding: 0;
                -premailer-cellspacing: 0;
                background-color: #f4f4f7;
              }
        
              .email-content {
                width: 100%;
                margin: 0;
                padding: 0;
                -premailer-width: 100%;
                -premailer-cellpadding: 0;
                -premailer-cellspacing: 0;
              }
              /* Masthead ----------------------- */
        
              .email-masthead {
                padding: 25px 0;
                text-align: center;
              }
        
              .email-masthead_logo {
                width: 94px;
              }
        
              .email-masthead_name {
                font-size: 16px;
                font-weight: bold;
                color: #a8aaaf;
                text-decoration: none;
                text-shadow: 0 1px 0 white;
              }
              /* Body ------------------------------ */
        
              .email-body {
                width: 100%;
                margin: 0;
                padding: 0;
                -premailer-width: 100%;
                -premailer-cellpadding: 0;
                -premailer-cellspacing: 0;
                background-color: #ffffff;
              }
        
              .email-body_inner {
                width: 570px;
                margin: 0 auto;
                padding: 0;
                -premailer-width: 570px;
                -premailer-cellpadding: 0;
                -premailer-cellspacing: 0;
                background-color: #ffffff;
              }
        
              .email-footer {
                width: 570px;
                margin: 0 auto;
                padding: 0;
                -premailer-width: 570px;
                -premailer-cellpadding: 0;
                -premailer-cellspacing: 0;
                text-align: center;
              }
        
              .email-footer p {
                color: #6b6e76;
              }
        
              .body-action {
                width: 100%;
                margin: 30px auto;
                padding: 0;
                -premailer-width: 100%;
                -premailer-cellpadding: 0;
                -premailer-cellspacing: 0;
                text-align: center;
              }
        
              .body-sub {
                margin-top: 25px;
                padding-top: 25px;
                border-top: 1px solid #eaeaec;
              }
        
              .content-cell {
                padding: 35px;
              }
              /*Media Queries ------------------------------ */
        
              @media only screen and (max-width: 600px) {
                .email-body_inner,
                .email-footer {
                  width: 100% !important;
                }
              }
        
              @media (prefers-color-scheme: dark) {
                body,
                .email-body,
                .email-body_inner,
                .email-content,
                .email-wrapper,
                .email-masthead,
                .email-footer {
                  background-color: #333333 !important;
                  color: #fff !important;
                }
                p,
                ul,
                ol,
                blockquote,
                h1,
                h2,
                h3,
                span,
                .purchase_item {
                  color: #fff !important;
                }
                .attributes_content,
                .discount {
                  background-color: #222 !important;
                }
                .email-masthead_name {
                  text-shadow: none !important;
                }
              }
        
              :root {
                color-scheme: light dark;
                supported-color-schemes: light dark;
              }
            </style>
            <!--[if mso]>
              <style type="text/css">
                .f-fallback {
                  font-family: Arial, sans-serif;
                }
              </style>
            <![endif]-->
          </head>
          <body>
            <span class="preheader"
              >A ${restaurant.fullName} étterem elutasította a rendelésed :(</span
            >
            <table
              class="email-wrapper"
              width="100%"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
            >
              <tr>
                <td align="center">
                  <table
                    class="email-content"
                    width="100%"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                  >
                    <tr>
                      <td class="email-masthead">
                        <a
                          href="https://example.com"
                          class="f-fallback email-masthead_name"
                        >
                          Foodnet
                        </a>
                      </td>
                    </tr>
                    <!-- Email Body -->
                    <tr>
                      <td
                        class="email-body"
                        width="100%"
                        cellpadding="0"
                        cellspacing="0"
                      >
                        <table
                          class="email-body_inner"
                          align="center"
                          width="570"
                          cellpadding="0"
                          cellspacing="0"
                          role="presentation"
                        >
                          <!-- Body content -->
                          <tr>
                            <td class="content-cell">
                              <div class="f-fallback">
                                <h1>Kedves ${userName}!</h1>
                                <p>
                                A(z) ${restaurant.fullName} étterem elutasította a rendelésed, melynek rendelési száma: ${encodedKey}. Az elutasítás oka a következő: ${req.body.reject}. További információkért az étterem telefonszámán érdeklődhetsz: <a href="tel:+${restaurant.phoneNumber}">${restaurant.phoneNumber}</a>.
                                </p> 
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <table
                          class="email-footer"
                          align="center"
                          width="570"
                          cellpadding="0"
                          cellspacing="0"
                          role="presentation"
                        >
                          <tr>
                            <td class="content-cell" align="center">
                              <p class="f-fallback sub align-center">
                                &copy; 2021 Foodnet. Minden jog fenntartva.
                              </p>
                              <p class="f-fallback sub align-center">
                                Forcefit Titan Srl.
                                <br />Principală 820 <br />Postakód 537130
                              </p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
        `,
      };

      await mg.messages().send(data, function (error, body) {
        if (error) {
          console.log(error);
        }
      });
    }
    await sendEmailForUser();
    await sendEmailForMe();

    res.redirect("/admin/orders");
  } catch (error) {
    console.log(error);

    error.httpStatusCode = 500;
    return next(error);
  }
};

exports.getOrders = async (req, res, next) => {
  const userRole = await Restaurant.findOne({
    where: { id: req.admin.id },
    include: [{ model: RestaurantRole }],
  });
  let userRoleType = userRole.RestaurantRoles[0].role;
  let languageCode;
  if (req.cookies.language == "ro") {
    languageCode = 1;
  } else if (req.cookies.language == "hu") {
    languageCode = 2;
  } else {
    languageCode = 3;
  }
  let reqAdmin = req.admin.id;
  const orderfirst = await getOrderByStatus(1, reqAdmin, languageCode);
  const ordersecond = await getOrderByStatus(2, reqAdmin, languageCode);
  const orderthird = await getOrderByStatus(3, reqAdmin, languageCode);
  const orderfour = await getOrderByStatus(4, reqAdmin, languageCode);
  const orderfive = await getOrderByStatus(5, reqAdmin, languageCode);
  if (userRoleType != 0) {
    res.redirect("/admin/courier-orders");
  }
  res.render("order/orders", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    orderfirst: orderfirst,
    ordersecond: ordersecond,
    orderthird: orderthird,
    orderfour: orderfour,
    orderfive: orderfive,
    userRole: userRoleType,
    needDelivery: userRole.needDelivery,
  });
};
const getOrderByStatus = async (status, reqAdmin, languageCode, req, res) => {
  const TODAY_START = new Date().setHours(0, 0, 0, 0);
  const NOW = new Date();

  const orders = await Order.findAll({
    order: [["createdAt", "DESC"]],
    where: {
      orderStatusId: status,
      restaurantId: reqAdmin,
      createdAt: {
        [Op.gt]: TODAY_START,
        [Op.lt]: NOW,
      },
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
  // console.log(orders);
  let extras = [];
  let test = [];
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
      test = orders[i].products;
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
  // console.log(test);
  return { orders: orders };
};

exports.postEditOrderAjaxNext = async (req, res, next) => {
  let orderStatusId = req.body.orderStatusId;
  let orderId = req.body.orderId;

  const order = await Order.findOne({
    where: {
      id: orderId,
    },
    include: [{ model: OrderDeliveryAddress }],
  });
  let userEmail = order.OrderDeliveryAddress.email;
  let userName = order.OrderDeliveryAddress.userName;
  let encodedKey = order.encodedKey;
  const restaurant = await Restaurant.findByPk(req.admin.id);
  if (orderStatusId == 2) {
    async function sendEmailForUser() {
      const data = {
        from: "info@foodnet.ro",
        to: userEmail,
        subject: "Sikeresen felvett rendelés!",
        html: `
        
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="x-apple-disable-message-reformatting" />
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <meta name="color-scheme" content="light dark" />
            <meta name="supported-color-schemes" content="light dark" />
            <title></title>
            <style type="text/css" rel="stylesheet" media="all">
              /* Base ------------------------------ */
        
              @import url("https://fonts.googleapis.com/css?family=Nunito+Sans:400,700&display=swap");
              body {
                width: 100% !important;
                height: 100%;
                margin: 0;
                -webkit-text-size-adjust: none;
              }
        
              a {
                color: #3869d4;
              }
        
              a img {
                border: none;
              }
        
              td {
                word-break: break-word;
              }
        
              .preheader {
                display: none !important;
                visibility: hidden;
                mso-hide: all;
                font-size: 1px;
                line-height: 1px;
                max-height: 0;
                max-width: 0;
                opacity: 0;
                overflow: hidden;
              }
              /* Type ------------------------------ */
        
              body,
              td,
              th {
                font-family: "Nunito Sans", Helvetica, Arial, sans-serif;
              }
        
              h1 {
                margin-top: 0;
                color: #333333;
                font-size: 22px;
                font-weight: bold;
                text-align: left;
              }
        
              h2 {
                margin-top: 0;
                color: #333333;
                font-size: 16px;
                font-weight: bold;
                text-align: left;
              }
        
              h3 {
                margin-top: 0;
                color: #333333;
                font-size: 14px;
                font-weight: bold;
                text-align: left;
              }
        
              td,
              th {
                font-size: 16px;
              }
        
              p,
              ul,
              ol,
              blockquote {
                margin: 0.4em 0 1.1875em;
                font-size: 16px;
                line-height: 1.625;
              }
        
              p.sub {
                font-size: 13px;
              }
              /* Utilities ------------------------------ */
        
              .align-right {
                text-align: right;
              }
        
              .align-left {
                text-align: left;
              }
        
              .align-center {
                text-align: center;
              }
              /* Buttons ------------------------------ */
        
              .button {
                background-color: #3869d4;
                border-top: 10px solid #3869d4;
                border-right: 18px solid #3869d4;
                border-bottom: 10px solid #3869d4;
                border-left: 18px solid #3869d4;
                display: inline-block;
                color: #fff;
                text-decoration: none;
                border-radius: 3px;
                box-shadow: 0 2px 3px rgba(0, 0, 0, 0.16);
                -webkit-text-size-adjust: none;
                box-sizing: border-box;
              }
        
              .button--green {
                background-color: #22bc66;
                border-top: 10px solid #22bc66;
                border-right: 18px solid #22bc66;
                border-bottom: 10px solid #22bc66;
                border-left: 18px solid #22bc66;
              }
        
              .button--red {
                background-color: #ff6136;
                border-top: 10px solid #ff6136;
                border-right: 18px solid #ff6136;
                border-bottom: 10px solid #ff6136;
                border-left: 18px solid #ff6136;
              }
        
              @media only screen and (max-width: 500px) {
                .button {
                  width: 100% !important;
                  text-align: center !important;
                }
              }
              /* Attribute list ------------------------------ */
        
              .attributes {
                margin: 0 0 21px;
              }
        
              .attributes_content {
                background-color: #f4f4f7;
                padding: 16px;
              }
        
              .attributes_item {
                padding: 0;
              }
              /* Related Items ------------------------------ */
        
              .related {
                width: 100%;
                margin: 0;
                padding: 25px 0 0 0;
                -premailer-width: 100%;
                -premailer-cellpadding: 0;
                -premailer-cellspacing: 0;
              }
        
              .related_item {
                padding: 10px 0;
                color: #cbcccf;
                font-size: 15px;
                line-height: 18px;
              }
        
              .related_item-title {
                display: block;
                margin: 0.5em 0 0;
              }
        
              .related_item-thumb {
                display: block;
                padding-bottom: 10px;
              }
        
              .related_heading {
                border-top: 1px solid #cbcccf;
                text-align: center;
                padding: 25px 0 10px;
              }
              /* Discount Code ------------------------------ */
        
              .discount {
                width: 100%;
                margin: 0;
                padding: 24px;
                -premailer-width: 100%;
                -premailer-cellpadding: 0;
                -premailer-cellspacing: 0;
                background-color: #f4f4f7;
                border: 2px dashed #cbcccf;
              }
        
              .discount_heading {
                text-align: center;
              }
        
              .discount_body {
                text-align: center;
                font-size: 15px;
              }
              /* Social Icons ------------------------------ */
        
              .social {
                width: auto;
              }
        
              .social td {
                padding: 0;
                width: auto;
              }
        
              .social_icon {
                height: 20px;
                margin: 0 8px 10px 8px;
                padding: 0;
              }
              /* Data table ------------------------------ */
        
              .purchase {
                width: 100%;
                margin: 0;
                padding: 35px 0;
                -premailer-width: 100%;
                -premailer-cellpadding: 0;
                -premailer-cellspacing: 0;
              }
        
              .purchase_content {
                width: 100%;
                margin: 0;
                padding: 25px 0 0 0;
                -premailer-width: 100%;
                -premailer-cellpadding: 0;
                -premailer-cellspacing: 0;
              }
        
              .purchase_item {
                padding: 10px 0;
                color: #51545e;
                font-size: 15px;
                line-height: 18px;
              }
        
              .purchase_heading {
                padding-bottom: 8px;
                border-bottom: 1px solid #eaeaec;
              }
        
              .purchase_heading p {
                margin: 0;
                color: #85878e;
                font-size: 12px;
              }
        
              .purchase_footer {
                padding-top: 15px;
                border-top: 1px solid #eaeaec;
              }
        
              .purchase_total {
                margin: 0;
                text-align: right;
                font-weight: bold;
                color: #333333;
              }
        
              .purchase_total--label {
                padding: 0 15px 0 0;
              }
        
              body {
                background-color: #f4f4f7;
                color: #51545e;
              }
        
              p {
                color: #51545e;
              }
        
              p.sub {
                color: #6b6e76;
              }
        
              .email-wrapper {
                width: 100%;
                margin: 0;
                padding: 0;
                -premailer-width: 100%;
                -premailer-cellpadding: 0;
                -premailer-cellspacing: 0;
                background-color: #f4f4f7;
              }
        
              .email-content {
                width: 100%;
                margin: 0;
                padding: 0;
                -premailer-width: 100%;
                -premailer-cellpadding: 0;
                -premailer-cellspacing: 0;
              }
              /* Masthead ----------------------- */
        
              .email-masthead {
                padding: 25px 0;
                text-align: center;
              }
        
              .email-masthead_logo {
                width: 94px;
              }
        
              .email-masthead_name {
                font-size: 16px;
                font-weight: bold;
                color: #a8aaaf;
                text-decoration: none;
                text-shadow: 0 1px 0 white;
              }
              /* Body ------------------------------ */
        
              .email-body {
                width: 100%;
                margin: 0;
                padding: 0;
                -premailer-width: 100%;
                -premailer-cellpadding: 0;
                -premailer-cellspacing: 0;
                background-color: #ffffff;
              }
        
              .email-body_inner {
                width: 570px;
                margin: 0 auto;
                padding: 0;
                -premailer-width: 570px;
                -premailer-cellpadding: 0;
                -premailer-cellspacing: 0;
                background-color: #ffffff;
              }
        
              .email-footer {
                width: 570px;
                margin: 0 auto;
                padding: 0;
                -premailer-width: 570px;
                -premailer-cellpadding: 0;
                -premailer-cellspacing: 0;
                text-align: center;
              }
        
              .email-footer p {
                color: #6b6e76;
              }
        
              .body-action {
                width: 100%;
                margin: 30px auto;
                padding: 0;
                -premailer-width: 100%;
                -premailer-cellpadding: 0;
                -premailer-cellspacing: 0;
                text-align: center;
              }
        
              .body-sub {
                margin-top: 25px;
                padding-top: 25px;
                border-top: 1px solid #eaeaec;
              }
        
              .content-cell {
                padding: 35px;
              }
              /*Media Queries ------------------------------ */
        
              @media only screen and (max-width: 600px) {
                .email-body_inner,
                .email-footer {
                  width: 100% !important;
                }
              }
        
              @media (prefers-color-scheme: dark) {
                body,
                .email-body,
                .email-body_inner,
                .email-content,
                .email-wrapper,
                .email-masthead,
                .email-footer {
                  background-color: #333333 !important;
                  color: #fff !important;
                }
                p,
                ul,
                ol,
                blockquote,
                h1,
                h2,
                h3,
                span,
                .purchase_item {
                  color: #fff !important;
                }
                .attributes_content,
                .discount {
                  background-color: #222 !important;
                }
                .email-masthead_name {
                  text-shadow: none !important;
                }
              }
        
              :root {
                color-scheme: light dark;
                supported-color-schemes: light dark;
              }
            </style>
            <!--[if mso]>
              <style type="text/css">
                .f-fallback {
                  font-family: Arial, sans-serif;
                }
              </style>
            <![endif]-->
          </head>
          <body>
            <span class="preheader"
              >A(z) ${restaurant.fullName} étterem sikeresen felvette a rendelésed!</span
            >
            <table
              class="email-wrapper"
              width="100%"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
            >
              <tr>
                <td align="center">
                  <table
                    class="email-content"
                    width="100%"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                  >
                    <tr>
                      <td class="email-masthead">
                        <a
                          href="https://example.com"
                          class="f-fallback email-masthead_name"
                        >
                          Foodnet
                        </a>
                      </td>
                    </tr>
                    <!-- Email Body -->
                    <tr>
                      <td
                        class="email-body"
                        width="100%"
                        cellpadding="0"
                        cellspacing="0"
                      >
                        <table
                          class="email-body_inner"
                          align="center"
                          width="570"
                          cellpadding="0"
                          cellspacing="0"
                          role="presentation"
                        >
                          <!-- Body content -->
                          <tr>
                            <td class="content-cell">
                              <div class="f-fallback">
                                <h1>Kedves ${userName}!</h1>
                                <p>
                                A(z) ${restaurant.fullName} étterem sikeresen felvette a rendelésed melynek rendelési száma: ${encodedKey}. További információkért az étterem telefonszámán érdeklődhetsz: <a href="tel:${restaurant.phoneNumber}">${restaurant.phoneNumber}</a>.
                                </p>
                                <p>Jó étvágyat kíván a Foodnet csapata!</p>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <table
                          class="email-footer"
                          align="center"
                          width="570"
                          cellpadding="0"
                          cellspacing="0"
                          role="presentation"
                        >
                          <tr>
                            <td class="content-cell" align="center">
                              <p class="f-fallback sub align-center">
                                &copy; 2021 Foodnet. Minden jog fenntartva.
                              </p>
                              <p class="f-fallback sub align-center">
                                Forcefit Titan Srl.
                                <br />Principală 820 <br />Postakód 537130
                              </p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
        `,
      };

      await mg.messages().send(data, function (error, body) {
        if (error) {
          console.log(error);
        }
      });
    }
    await sendEmailForUser();
  }

  await Order.update(
    { orderStatusId: orderStatusId, courierId: req.admin.id },
    { where: { id: orderId } }
  );
};

exports.postEditOrderAjaxPrev = async (req, res, next) => {
  let orderStatusId = req.body.orderStatusId;
  let orderId = req.body.orderId;

  await Order.update(
    { orderStatusId: orderStatusId, courierId: req.admin.id },
    { where: { id: orderId } }
  );
};

exports.postAddOrder = async (req, res, next) => {
  const userNameFill = req.body.userNameFill;
  const phoneNumberFill = req.body.phoneNumberFill;
  const streetFill = req.body.streetFill;
  const houseNumberFill = req.body.houseNumberFill;
  const floorFill = req.body.floorFill;
  const doorNumberFill = req.body.doorNumberFill;
  const totalPriceFill = req.body.totalPriceFill;

  const orderDelAdd = await OrderDeliveryAddress.create({
    street: streetFill,
    houseNumber: houseNumberFill,
    floor: floorFill,
    doorNumber: doorNumberFill,
    phoneNumber: phoneNumberFill,
    userName: userNameFill,
    email: "erdosjozsef@gmail.com",
  });

  var digit = ("" + orderDelAdd.id)[1];
  var digitfirst = ("" + orderDelAdd.id)[0];

  const cryptr = new Cryptr("orderIdSecretKey");
  let test = [0, 1, 2, 3, 4, 5, 7, 8, 9][Math.floor(Math.random() * 9)];

  const encryptedString = cryptr.encrypt(orderDelAdd.id);

  orderIdSecretKey =
    digitfirst + encryptedString.substring(0, 6).slice(0, 6) + digit + test;

  await Order.create({
    restaurantId: req.admin.id,
    totalPrice: totalPriceFill,
    orderStatusId: 1,
    orderDeliveryAddressId: orderDelAdd.id,
    locationNameId: 1,
    cutlery: 0,
    lang: "hu",
    take: 0,
    orderType: 0,
    encodedKey: orderIdSecretKey,
    messageCourier: "",
    deliveryPrice: 0,
    mobile: 0,
    web: 0,
    restaurantAdded: 1,
  })
    .then((result) => {
      res.redirect("/admin/orders");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
/// COURIER
exports.getOrdersByCourier = async (req, res, next) => {
  const userRole = await Restaurant.findOne({
    where: { id: req.admin.id },
    include: [{ model: RestaurantRole }],
  });
  let userRoleType = userRole.RestaurantRoles[0].role;
  let reqAdmin = req.admin.id;
  const orderfirst = await getOrderByStatusCourier(1);
  const ordersecond = await getOrderByStatusCourier(2);
  const orderthird = await getOrderByStatusCourier(3);
  const orderfour = await getOrderByStatusCourier(4);
  const orderfive = await getOrderByStatusCourier(5);
  if (userRoleType != 1) {
    res.redirect("/admin/orders");
  }
  res.render("order/order-courier", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    orderfirst: orderfirst,
    ordersecond: ordersecond,
    orderthird: orderthird,
    orderfour: orderfour,
    orderfive: orderfive,
    userRole: userRoleType,
  });
};
const getOrderByStatusCourier = async (status, req, res) => {
  let languageCode = 1;
  // if (req.cookies.language == "ro") {
  //   languageCode = 1;
  // } else if (req.cookies.language == "hu") {
  //   languageCode = 2;
  // } else {
  //   languageCode = 3;
  // }
  const orders = await Order.findAll({
    order: [["createdAt", "DESC"]],
    where: { orderStatusId: status },
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
                where: { active: languageCode },
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
      // { model: Restaurant, where: { needDelivery: 1 } },
      {
        model: LocationName,
        where: { id: 1 },
        include: [
          {
            model: LocationNameTranslation,
            where: { languageId: languageCode },
          },
        ],
      },
    ],
  });
  // console.log(orders);
  let extras = [];
  let test = [];
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
      test = orders[i].products;
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
  // console.log(test);
  return { orders: orders };
};

exports.getDeliveryAddressByPhone = async (req, res, next) => {
  let phone = req.body.phoneNumberFill;

  const result = await OrderDeliveryAddress.findAll({
    where: {
      phoneNumber: {
        [Op.like]: `%${phone}%`,
      },
    },
    include: [
      {
        model: Order,
        include: [
          {
            model: LocationName,
            include: [
              { model: LocationNameTranslation, where: { languageId: 1 } },
            ],
          },
        ],
      },
    ],
  });
  let finalResult = [];
  for (let i = 0; i < result.length; i++) {
    let orderJoined = result[i].Orders;
    for (j = 0; j < orderJoined.length; j++) {
      const items = {
        id: result[i].id,
        phoneNumber: result[i].phoneNumber,
        name: result[i].userName,
        location: orderJoined[j].LocationName.LocationNameTranslations[0].name,
        street: result[i].street,
        houseNumber: result[i].houseNumber,
        floor: result[i].floor,
        doorNumber: result[i].doorNumber,
      };
      finalResult.push(items);
      // console.log();
    }
  }

  res.json({
    finalResult,
  });
};
