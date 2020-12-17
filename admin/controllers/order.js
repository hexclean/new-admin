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
const Op = Sequelize.Op;
const ITEMS_PER_PAGE = 20;

exports.getOrders = async (req, res, next) => {
  const orders = await Order.findAll({
    where: { restaurantId: req.admin.id },
  });
  res.render("order/orders", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    orders: orders,
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

    let productQuantity = [];
    let extraQuantity = [];
    let productPrices = [];
    let extraPrices = [];
    let message;
    let test = [];
    // console.log(order);
    for (let i = 0; i < order.length; i++) {
      test = order[i].OrderItems;
      for (let j = 0; j < test.length; j++) {
        extraQuantity.push(test[j].OrderItemExtras[0].quantity);
        extraPrices.push(test[j].OrderItemExtras[0].extraPrice);
        productQuantity.push(order[0].OrderItems[j].quantity);
        productPrices.push(order[0].OrderItems[j].variantPrice);

        console.log(
          test[j].Variant.ProductFinals[j].Product.ProductTranslations[0].title
        );
      }
    }
    console.log(productQuantity);
    console.log(productPrices);
    console.log(extraQuantity);
    console.log(extraPrices);
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
      test: test,
    });
  } catch (err) {
    console.log(err);
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

exports.postEditAllergen = async (req, res, next) => {
  const updatedRoName = req.body.roName;
  const updatedHuName = req.body.huName;
  const updatedEnName = req.body.enName;
  const extTranId = req.body.extTranId;

  Allergen.findAll({
    include: [
      {
        model: AllergensTranslation,
      },
    ],
  })
    .then((extra) => {
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

      msg();

      res.redirect("/admin/allergen-index");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getIndex = async (req, res, next) => {
  const page = +req.query.page || 1;
  let totalItems;
  let currentAllergenName = [];

  const allergens = await Allergen.findAll({
    where: { restaurantId: req.admin.id },
    include: [
      {
        model: AllergensTranslation,
      },
    ],
  });

  for (let i = 0; i < allergens.length; i++) {
    var currentLanguage = req.cookies.language;

    if (currentLanguage == "ro") {
      currentAllergenName[i] = allergens[i].allergenTranslations[0].name;
    } else if (currentLanguage == "hu") {
      currentAllergenName[i] = allergens[i].allergenTranslations[1].name;
    } else {
      currentAllergenName[i] = allergens[i].allergenTranslations[2].name;
    }
  }

  await Allergen.findAll({
    where: {
      restaurantId: req.admin.id,
    },
    include: [
      {
        model: AllergensTranslation,
      },
    ],
  })
    .then((numAllergen) => {
      totalItems = numAllergen;
      return Allergen.findAll({
        where: {
          restaurantId: req.admin.id,
        },
        include: [
          {
            model: AllergensTranslation,
          },
        ],
        offset: (page - 1) * ITEMS_PER_PAGE,
        limit: ITEMS_PER_PAGE,
      });
    })
    .then((allergen) => {
      res.render("allergen/index", {
        pageTitle: "Admin Products",
        path: "/admin/products",
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems.length,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItems.length / ITEMS_PER_PAGE),
        ag: allergen,
        currentAllergenName: currentAllergenName,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getSearch = async (req, res, next) => {
  const { term } = req.query;
  const currentAllergenName = 1;
  const currentPage = 1;
  const previousPage = 1;
  const lastPage = 1;
  const nextPage = 1;
  const hasNextPage = 1;
  const hasPreviousPage = 1;
  await Allergen.findAll({
    where: { restaurantId: req.admin.id },
    include: [
      {
        model: AllergensTranslation,
        where: { name: { [Op.like]: "%" + term + "%" } },
      },
    ],
  })
    .then((gigs) => {
      res.render("allergen/index", {
        gigs,
        ag: gigs,
        currentAllergenName: currentAllergenName,
        currentPage: currentPage,
        nextPage: nextPage,
        previousPage: previousPage,
        lastPage: lastPage,
        hasNextPage: hasNextPage,
        hasPreviousPage: hasPreviousPage,
      });
    })
    .catch((err) => console.log(err));
};
