const Sequelize = require("sequelize");
const fileHelper = require("../../util/file");
const ITEMS_PER_PAGE = 14;

//
const DailyMenu = require("../../models/DailyMenu");
const DailyMenuTranslation = require("../../models/DailyMenuTranslation");
const DailyMenuFinal = require("../../models/DailyMenuFinal");
const Allergens = require("../../models/Allergen");
const AllergensTranslation = require("../../models/AllergenTranslation");
const DailyMenuAllergens = require("../../models//DailyMenuAllergens");

exports.getAddDailyMenu = async (req, res, next) => {
  const dailyMId = req.params.dailyMenuId;

  let currentAllergenName = [];

  const dailyMenu = await DailyMenu.findAll({
    where: { adminId: req.admin.id },
  });

  const allergens = await Allergens.findAll({
    where: { adminId: req.admin.id },
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
  res.render("daily-menu/edit-daily-menu", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    dailyMenuId: dailyMId,
    allergens: allergens,
    dailyMenu: dailyMenu,
    currentAllergenName: currentAllergenName,
  });
};

exports.postAddDailyMenu = async (req, res, next) => {
  const dailyMId = req.body.extraId;
  const price = req.body.price;
  const datepicker = req.body.datepicker;
  //
  const roDescription = req.body.roDescription;
  const huDescription = req.body.huDescription;
  const enDescription = req.body.enDescription;
  const image = req.file;
  const imageUrl = image.path;
  var filteredStatus = req.body.status.filter(Boolean);
  const allergens = await Allergens.findAll({
    where: { adminId: req.admin.id },
    include: [
      {
        model: AllergensTranslation,
      },
    ],
  });
  const dailyMenu = await DailyMenu.create({
    adminId: req.admin.id,
    imageUrl: imageUrl,
    active: 0,
  });

  const dailyMenuFinal = await DailyMenuFinal.create({
    price: price,
    discountedPrice: 1,
    time: datepicker,
    dailyMenuId: dailyMenu.id,
  });
  console.log(dailyMenuFinal);

  async function productTransaltion() {
    await DailyMenuTranslation.create({
      description: roDescription,
      adminId: req.admin.id,
      dailyMenuId: dailyMenu.id,
      languageId: 1,
    });

    await DailyMenuTranslation.create({
      description: huDescription,
      adminId: req.admin.id,
      dailyMenuId: dailyMenu.id,
      languageId: 2,
    });

    await DailyMenuTranslation.create({
      description: enDescription,
      adminId: req.admin.id,
      dailyMenuId: dailyMenu.id,
      languageId: 3,
    });
    if (Array.isArray(allergens)) {
      for (let i = 0; i <= allergens.length - 1; i++) {
        let allergenIds = [dailyMId[i]];
        await DailyMenuAllergens.create({
          active: filteredStatus[i] == "on" ? 1 : 0,
          allergenId: allergenIds,
          dailyMenuId: dailyMenu.id,
        });
      }
    }
  }

  productTransaltion()
    .then((result) => {
      res.redirect("/admin/daily-menu-index");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getEditDailyMenu = async (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }

  const dailyMId = req.params.dailyMenuId;
  let dailyMenuId = [dailyMId];
  const Op = Sequelize.Op;

  const allergens = await Allergens.findAll({
    where: { adminId: req.admin.id },
    include: [
      {
        model: AllergensTranslation,
      },
    ],
  });

  let isActive = await DailyMenuAllergens.findAll({
    where: {
      dailyMenuId: {
        [Op.in]: dailyMenuId,
      },
    },
  });

  let currentAllergenName = [];
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

  DailyMenu.findAll({
    where: {
      id: dailyMenuId,
      adminId: req.admin.id,
    },
    include: [
      {
        model: DailyMenuTranslation,
      },
      { model: DailyMenuFinal },
    ],
  })
    .then((product) => {
      res.render("daily-menu/edit-daily-menu", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
        dailyMenuId: dailyMId,
        allergens: allergens,
        isActive: isActive,
        currentAllergenName: currentAllergenName,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postEditDailyMenu = async (req, res, next) => {
  const dailyMId = req.body.extraId;
  const dMid = req.body.dailyMenuId;
  var filteredStatus = req.body.status.filter(Boolean);
  const datepicker = req.body.datepicker;

  // Description
  const updatedRoDesc = req.body.roDescription;
  const updatedHuDesc = req.body.huDescription;
  const updatedEnDesc = req.body.enDescription;
  //
  const price = req.body.price;
  const image = req.file;
  const allergens = await Allergens.findAll({
    where: { adminId: req.admin.id },
    include: [
      {
        model: AllergensTranslation,
      },
    ],
  });

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
          if (product.adminId.toString() !== req.admin.id.toString()) {
            return res.redirect("/");
          }
          if (image) {
            fileHelper.deleteFile(product.imageUrl);
            product.imageUrl = image.path;
          }
          return product.save();
        });
        await DailyMenuTranslation.update(
          {
            description: updatedRoDesc,
          },
          { where: { dailyMenuId: dMid, languageId: 1 } }
        );

        await DailyMenuTranslation.update(
          {
            description: updatedHuDesc,
          },
          { where: { dailyMenuId: dMid, languageId: 2 } }
        );

        await DailyMenuTranslation.update(
          {
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
        if (Array.isArray(allergens)) {
          const Op = Sequelize.Op;
          for (let i = 0; i <= allergens.length - 1; i++) {
            let allergenIds = [dailyMId[i]];
            let dailyMenuIds = [dMid];
            await DailyMenuAllergens.update(
              {
                active: filteredStatus[i] == "on" ? 1 : 0,
                allergenId: allergenIds,
                dailyMenuId: dailyMenuIds,
              },
              {
                where: {
                  allergenId: {
                    [Op.in]: allergenIds,
                  },
                  dailyMenuId: {
                    [Op.in]: dailyMenuIds,
                  },
                },
              }
            );
          }
        }
      }
      msg();
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

  const allergen = await DailyMenu.findAll({
    where: {
      adminId: req.admin.id,
    },
    include: [
      {
        model: DailyMenuTranslation,
      },
    ],
  })
    .then((numAllergen) => {
      totalItems = numAllergen;
      return DailyMenu.findAll({
        where: {
          adminId: req.admin.id,
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
        previousPage: page - 1,
        lastPage: Math.ceil(totalItems.length / ITEMS_PER_PAGE),
        dm: allergen,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
