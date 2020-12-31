const Sequelize = require("sequelize");
const ExcelJs = require("exceljs");
var jsonexport = require("jsonexport");
const Order = require("../../models/Order");
const Orders = require("../../models/Order");
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
const Op = Sequelize.Op;
const ITEMS_PER_PAGE = 20;
var fs = require("fs");

const xl = require("excel4node");

exports.getIndex = async (req, res, next) => {
  const orders = await Orders.findAll({
    where: { restaurantId: req.admin.id },
  });
  res.render("reckoning/index", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    orders: orders,
  });
};

exports.postExport = async (req, res, next) => {
  try {
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
            },
          ],
        },
      ],
    });

    let extrasArray = [];
    let rowIndex = 2;

    if (orders.length != 0) {
      for (let i = 0; i < orders.length; i++) {
        const resultWithAll = [];
        let orderItems = orders[i].OrderItems;

        for (let j = 0; j < orderItems.length; j++) {
          extras = orderItems[j].OrderItemExtras;

          let prodFin = orderItems[j].Variant.ProductFinals;
          for (let h = 0; h < prodFin.length; h++) {
            if (extras[j] == undefined) {
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
        orders[i].products = result;
        console.log(orders[i].products);

        jsonexport(orders[i].products, function (err, csv) {
          if (err) return console.log(err);
          fs.writeFile("data.csv", csv, (err) => {
            console.log(err || "done");
          });
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
