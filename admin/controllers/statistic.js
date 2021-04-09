const Orders = require("../../models/Order");
const ExtraTranslation = require("../../models/ExtraTranslation");
const Allergen = require("../../models/Allergen");
const ProductVariantsExtras = require("../../models/ProductVariantsExtras");
const ProductVariants = require("../../models/Variant");
const AllergenTranslation = require("../../models/AllergenTranslation");
const ExtraHasAllergen = require("../../models/ExtraHasAllergen");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const AdminLogs = require("../../models/AdminLogs");
const Category = require("../../models/Category");
const { body } = require("express-validator");
const { where } = require("sequelize");

// Show create extra page

exports.getStatistic = async (req, res, next) => {
  //   const page = +req.query.page || 1;
  //   let totalItems;

  //   await Orders.findAll({
  //     where: {
  //       restaurantId: req.admin.id,
  //     },
  //   })
  //     .then((orders) => {
  //       totalItems = orders;
  //       return Orders.findAll({
  //         where: {
  //           restaurantId: req.admin.id,
  //         },

  //         offset: (page - 1) * ITEMS_PER_PAGE,
  //         limit: ITEMS_PER_PAGE,
  //       });
  //     })
  //     .then((orders) => {
  res.render("statistic/index", {
    pageTitle: "Admin Products",
    path: "/admin/products",
    // currentPage: page,
    // hasNextPage: ITEMS_PER_PAGE * page < totalItems.length,
    // hasPreviousPage: page > 1,
    // nextPage: page + 1,
    // previousPage: page - 1,
    // lastPage: Math.ceil(totalItems.length / ITEMS_PER_PAGE),
    // orders: orders,
  });
  // })
  // .catch((err) => {
  //   const error = new Error(err);
  //   error.httpStatusCode = 500;
  //   return next(error);
  // });
};

exports.postStatistic = async (req, res, next) => {
  let start = req.body.datepickerStart;
  let end = req.body.datepickerEnd;
  console.log(req.body);
  const orders = await Orders.findAll({
    where: {
      createdAt: {
        [Op.between]: [start, end],
      },
      restaurantId: req.admin.id,
    },
  });
  const foodnetOrders = await Orders.findAll({
    where: {
      createdAt: {
        [Op.between]: [start, end],
      },
      restaurantId: req.admin.id,
      restaurantAdded: 0,
    },
  });
  const phoneOrders = await Orders.findAll({
    where: {
      createdAt: {
        [Op.between]: [start, end],
      },
      restaurantId: req.admin.id,
      restaurantAdded: 1,
    },
  });
  let result = [];
  // for (let i = 0; i < orders.length; i++) {
  const items = {
    totalOrder: orders.length,
    foodnetOrders: foodnetOrders.length,
    phoneOrders: phoneOrders.length,
  };
  result.push(items);
  // }
  res.json({
    result,
  });
};
