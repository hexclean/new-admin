const Sequelize = require("sequelize");
const fileHelper = require("../../util/file");

//
const DailyMenu = require("../../models/DailyMenu");
const DailyMenuTranslation = require("../../models/DailyMenuTranslation");
const DailyMenuFinal = require("../../models/DailyMenuFinal");
const Allergens = require("../../models/Allergen");
const AllergensTranslation = require("../../models/AllergenTranslation");

exports.getAddDailyMenu = async (req, res, next) => {
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
  console.log(dailyMenu);
  res.render("daily-menu/edit-daily-menu", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    allergens: allergens,
    dailyMenu: dailyMenu,
  });
};

exports.postAddDailyMenu = async (req, res, next) => {
  const price = req.body.price;
  //
  const roDescription = req.body.roDescription;
  const huDescription = req.body.huDescription;
  const enDescription = req.body.enDescription;
  const image = req.file;
  const imageUrl = image.path;

  const dailyMenu = await DailyMenu.create({
    adminId: req.admin.id,
    imageUrl: imageUrl,
    active: 0,
  });

  const dailyMenuFinal = await DailyMenuFinal.create({
    price: price,
    discountedPrice: 1,
    active: 1,
    dailyMenuId: dailyMenu.id,
    allergenId: 1,
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
  }

  productTransaltion()
    .then((result) => {
      res.redirect("/admin/products");
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
  console.log(allergens[0].allergenTranslations[0].name);
  let dailyMenuFinal = await DailyMenuFinal.findAll({
    where: {
      dailyMenuId: {
        [Op.in]: dailyMenuId,
      },
    },
  });
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
        // variantIdByParams: prodId,
        // productIds: prodId,
        // productId: prodId,
        // ext: productFinal,
        // productVariant: productFinal,
        // errorMessage: null,
        // validationErrors: [],

        // extTranslations: product[0].productTranslations,
        // isActive: product[0].allergen,
        // isActiveVariant: productFinal,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postEditDailyMenu = async (req, res, next) => {
  const dailyMId = req.body.dailyMenuId;
  // const varId = req.body.variantId;
  let dailyMenuId = [dailyMId];
  // console.log("dailyMId", dailyMId);
  // var filteredStatus = req.body.status.filter(Boolean);

  // Description
  const updatedRoDesc = req.body.roDescription;
  const updatedHuDesc = req.body.huDescription;
  const updatedEnDesc = req.body.enDescription;
  //
  const price = req.body.price;
  const image = req.file;
  const Op = Sequelize.Op;
  // const variants = await DailyMenuFinal.findAll({
  //   where: {
  //     variantId: {
  //       [Op.in]: variantId,
  //     },
  //   },
  // });

  DailyMenu.findAll({
    include: [
      {
        model: DailyMenuFinal,
      },
    ],
  })
    .then((result) => {
      async function msg() {
        await DailyMenu.findByPk(dailyMId).then((product) => {
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
          { where: { dailyMenuId: dailyMId, languageId: 1 } }
        );

        await DailyMenuTranslation.update(
          {
            description: updatedHuDesc,
          },
          { where: { dailyMenuId: dailyMId, languageId: 2 } }
        );

        await DailyMenuTranslation.update(
          {
            description: updatedEnDesc,
          },
          { where: { dailyMenuId: dailyMId, languageId: 3 } }
        );
        // if (Array.isArray(variants)) {
        //   const Op = Sequelize.Op;
        //   for (let i = 0; i <= variants.length; i++) {
        //     let variIds = [varId[i]];
        //     let prodIds = [prodId];
        //     await ProductFinal.update(
        //       {
        //         price: updatedExtraPrice[i] || 0,
        //         discountedPrice: updatedExtraPrice[i] || 0,
        //         active: filteredStatus[i] == "on" ? 1 : 0,
        //       },
        //       {
        //         where: {
        //           variantId: {
        //             [Op.in]: variIds,
        //           },
        //           productId: {
        //             [Op.in]: prodIds,
        //           },
        //         },
        //       }
        //     );
        //     console.log("variantId", variIds);
        //     console.log("prodIds", prodIds);
        //   }
        // }
      }
      msg();
      res.redirect("/admin/products");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
