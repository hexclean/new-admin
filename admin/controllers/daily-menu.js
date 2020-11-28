const Sequelize = require("sequelize");
const fileHelper = require("../../util/file");
const Box = require("../../models/Box");
const DailyMenuHasAllergen = require("../../models/DailyMenuHasAllergen");
const Allergen = require("../../models/Allergen");
const AllegenTranslation = require("../../models/AllergenTranslation");
//
const DailyMenu = require("../../models/DailyMenu");
const DailyMenuTranslation = require("../../models/DailyMenuTranslation");
const DailyMenuFinal = require("../../models/DailyMenuFinal");
const ITEMS_PER_PAGE = 14;

exports.getAddDailyMenu = async (req, res, next) => {
  const dailyMId = req.params.dailyMenuId;

  // const checkBoxLength = await Box.findAll({
  //   where: {
  //     restaurantId: req.admin.id,
  //   },
  // });

  // if (checkBoxLength.length == 0) {
  //   res.redirect("/admin/add-daily-menu");
  // }
  const allergen = await Allergen.findAll({
    where: {
      restaurantId: req.admin.id,
    },
    include: [
      {
        model: AllegenTranslation,
      },
    ],
  });

  const dailyMenu = await DailyMenu.findAll({
    where: { restaurantId: req.admin.id },
  });

  res.render("daily-menu/edit-daily-menu", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    allergenArray: allergen,
    dailyMenuId: dailyMId,
    dailyMenu: dailyMenu,
    // checkBoxLength: checkBoxLength,
  });
};

exports.postAddDailyMenu = async (req, res, next) => {
  const allergenId = req.body.allergenId;
  const price = req.body.price;
  const datepicker = req.body.datepicker;
  //
  const roTitle = req.body.roTitle;
  const huTitle = req.body.huTitle;
  const enTitle = req.body.enTitle;
  const roDescription = req.body.roDescription;
  const huDescription = req.body.huDescription;
  const enDescription = req.body.enDescription;
  const image = req.file;
  const imageUrl = image.path;
  var filteredStatus = req.body.status.filter(Boolean);

  const allergen = await Allergen.findAll({
    where: {
      restaurantId: req.admin.id,
    },
    include: [
      {
        model: AllegenTranslation,
      },
    ],
  });

  const dailyMenu = await DailyMenu.create({
    restaurantId: req.admin.id,
    dailyMenuImagePath: imageUrl,
    active: 1,
  });

  async function productTransaltion() {
    await DailyMenuTranslation.create({
      description: roDescription,
      restaurantId: req.admin.id,
      dailyMenuId: dailyMenu.id,
      title: roTitle,
      languageId: 1,
    });

    await DailyMenuTranslation.create({
      description: huDescription,
      restaurantId: req.admin.id,
      dailyMenuId: dailyMenu.id,
      title: huTitle,
      languageId: 2,
    });

    await DailyMenuTranslation.create({
      description: enDescription,
      restaurantId: req.admin.id,
      dailyMenuId: dailyMenu.id,
      title: enTitle,
      languageId: 3,
    });

    await DailyMenuFinal.create({
      price: price,
      discountedPrice: 1,
      time: datepicker,
      dailyMenuId: dailyMenu.id,
    });
  }
  async function allergenToDailyMenu() {
    if (Array.isArray(allergen)) {
      for (let i = 0; i <= allergen.length - 1; i++) {
        await DailyMenuHasAllergen.create({
          dailyMenuId: dailyMenu.id,
          allergenId: allergenId[i],
          active: filteredStatus[i] == "on" ? 1 : 0,
          restaurantId: req.admin.id,
        });
      }
    }
  }
  productTransaltion()
    .then((result) => {
      allergenToDailyMenu();
      res.redirect("/admin/daily-menus-index");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getEditDailyMenu = async (req, res, next) => {
  try {
    const editMode = req.query.edit;
    const Op = Sequelize.Op;
    const dailyMId = req.params.dailyMenuId;
    const dailyMenuId = [dailyMId];

    await DailyMenu.findByPk(dailyMId).then((dailyMenu) => {
      if (!dailyMenu) {
        return res.redirect("/");
      }
    });

    if (!editMode) {
      return res.redirect("/");
    }

    const allergen = await Allergen.findAll({
      where: {
        restaurantId: req.admin.id,
      },
      include: [
        {
          model: AllegenTranslation,
        },
        { model: DailyMenuHasAllergen },
      ],
    });

    const allergenTest = await Allergen.findAll({
      where: {
        restaurantId: req.admin.id,
      },
      include: [
        {
          model: AllegenTranslation,
        },
        {
          model: DailyMenuHasAllergen,
          where: {
            dailyMenuId: { [Op.in]: dailyMenuId },
            restaurantId: req.admin.id,
          },
        },
      ],
    });

    const product = await DailyMenu.findAll({
      where: {
        id: dailyMenuId,
        restaurantId: req.admin.id,
      },
      include: [
        {
          model: DailyMenuTranslation,
        },
        { model: DailyMenuFinal },
      ],
    });

    res.render("daily-menu/edit-daily-menu", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product: product,
      allergenArray: allergen,
      isActiveAllergen: allergenTest,
      dailyMenuId: dailyMId,
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

exports.postEditDailyMenu = async (req, res, next) => {
  const allergenId = req.body.allergenId;
  const filteredStatus = req.body.status.filter(Boolean);
  const dailyMId = req.body.dailyMenuId;
  const dMid = req.body.dailyMenuId;
  const datepicker = req.body.datepicker;
  const roTitle = req.body.roTitle;
  const huTitle = req.body.huTitle;
  const enTitle = req.body.enTitle;
  // Description
  const updatedRoDesc = req.body.roDescription;
  const updatedHuDesc = req.body.huDescription;
  const updatedEnDesc = req.body.enDescription;
  //
  const Op = Sequelize.Op;
  const dailyMenuIdArray = [dMid];
  const dailyMenuHasAllergen = await DailyMenuHasAllergen.findAll({
    where: {
      dailyMenuId: {
        [Op.in]: dailyMenuIdArray,
      },
    },
  });

  const price = req.body.price;
  const image = req.file;

  DailyMenu.findAll({
    include: [
      {
        model: DailyMenuFinal,
      },
    ],
  })
    .then((result) => {
      async function msg() {
        await DailyMenu.findByPk(dMid).then((product) => {
          if (product.restaurantId.toString() !== req.admin.id.toString()) {
            return res.redirect("/");
          }
          if (image) {
            fileHelper.deleteFile(product.dailyMenuImagePath);
            product.dailyMenuImagePath = image.path;
          }
          return product.save();
        });
        await DailyMenuTranslation.update(
          {
            title: roTitle,
            description: updatedRoDesc,
          },
          { where: { dailyMenuId: dMid, languageId: 1 } }
        );

        await DailyMenuTranslation.update(
          {
            title: huTitle,
            description: updatedHuDesc,
          },
          { where: { dailyMenuId: dMid, languageId: 2 } }
        );

        await DailyMenuTranslation.update(
          {
            title: enTitle,
            description: updatedEnDesc,
          },
          { where: { dailyMenuId: dMid, languageId: 3 } }
        );

        await DailyMenuFinal.update(
          {
            price: price,
            time: datepicker,
          },
          {
            where: {
              dailyMenuId: dailyMId,
            },
          }
        );
      }
      async function editDailyMenuAllergens() {
        if (Array.isArray(dailyMenuHasAllergen)) {
          const Op = Sequelize.Op;
          for (let i = 0; i <= dailyMenuHasAllergen.length - 1; i++) {
            let allergenIds = [allergenId[i]];
            let dailyMenuId = [dMid];
            await DailyMenuHasAllergen.update(
              {
                active: filteredStatus[i] == "on" ? 1 : 0,
              },
              {
                where: {
                  restaurantId: req.admin.id,
                  allergenId: {
                    [Op.in]: allergenIds,
                  },
                  dailyMenuId: {
                    [Op.in]: dailyMenuId,
                  },
                },
              }
            );
          }
        }
      }
      msg();
      editDailyMenuAllergens();
      res.redirect("/admin/daily-menus-index");
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

  await DailyMenu.findAll({
    where: {
      restaurantId: req.admin.id,
      active: 1,
    },
    include: [
      {
        model: DailyMenuTranslation,
        model: DailyMenuFinal,
      },
    ],
  })
    .then((numAllergen) => {
      totalItems = numAllergen;
      return DailyMenu.findAll({
        where: {
          restaurantId: req.admin.id,
          active: 1,
        },
        include: [
          {
            model: DailyMenuTranslation,
          },
        ],
        offset: (page - 1) * ITEMS_PER_PAGE,
        limit: ITEMS_PER_PAGE,
      });
    })
    .then((allergen) => {
      res.render("daily-menu/index", {
        pageTitle: "Admin Products",
        path: "/admin/products",
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems.length,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        // checkBoxLength: checkBoxLength,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItems.length / ITEMS_PER_PAGE),
        dm: allergen,
        time: allergen,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postDeleteDailyMenu = (req, res, next) => {
  const prodId = req.body.dailyMenuId;

  DailyMenu.findByPk(prodId)
    .then((product) => {
      if (!product) {
        return next(new Error("Product not found."));
      }
      product.active = 0;
      return product.save().then((result) => {
        res.redirect("/admin/daily-menus-index");
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
