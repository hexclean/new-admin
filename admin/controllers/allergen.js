const Allergen = require("../../models/Allergen");
const AllergensTranslation = require("../../models/AllergenTranslation");
const DailyMenu = require("../../models/DailyMenu");
const DailyMenuAllergens = require("../../models/DailyMenuAllergens");
const ITEMS_PER_PAGE = 15;

exports.getAddAllergen = (req, res, next) => {
  res.render("allergen/edit-allergen", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    hasError: false,
    errorMessage: null,
    validationErrors: [],
  });
};

exports.postAddAllergen = async (req, res, next) => {
  const roName = req.body.roName;
  const huName = req.body.huName;
  const enName = req.body.enName;

  let dailyMenuId = await DailyMenu.findAll({
    where: { adminId: req.admin.id },
  });
  console.log(dailyMenuId);

  const allergen = await Allergen.create({
    adminId: req.admin.id,
  });

  async function extraTransaltion() {
    await AllergensTranslation.create({
      name: roName,
      languageId: 1,
      allergenId: allergen.id,
      adminId: req.admin.id,
    });
    await AllergensTranslation.create({
      name: huName,
      languageId: 2,
      adminId: req.admin.id,

      allergenId: allergen.id,
    });

    await AllergensTranslation.create({
      name: enName,
      languageId: 3,
      allergenId: allergen.id,
      adminId: req.admin.id,
    });

    for (let i = 0; i <= dailyMenuId.length - 1; i++) {
      await DailyMenuAllergens.create({
        allergenId: allergen.id,
        dailyMenuId: dailyMenuId[i].id,
        active: 0,
      });
    }
  }

  extraTransaltion()
    .then((result) => {
      res.redirect("/admin/allergen-index");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getExtras = (req, res, next) => {
  Extra.findAll({ where: { adminId: req.admin.id } })
    .then((extra) => {
      var currentLanguage = req.cookies.language;
      res.render("extra/extras", {
        ext: extra,
        currentLanguage: currentLanguage,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getEditAllergen = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const extId = req.params.allergenId;
  console.log("extId", extId);
  Allergen.findAll({
    where: {
      id: extId,
    },
    include: [
      {
        model: AllergensTranslation,
      },
    ],
  })
    .then((extra) => {
      if (extra[0].adminId !== req.admin.id) {
        return res.redirect("/");
      }

      res.render("allergen/edit-allergen", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        extra: extra,
        hasError: false,
        errorMessage: null,
        validationErrors: [],
        extTranslations: extra[0].allergenTranslations,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postEditAllergen = async (req, res, next) => {
  const updatedRoName = req.body.roName;
  const updatedHuName = req.body.huName;
  const updatedEnName = req.body.enName;
  const extTranId = req.body.extTranId;
  console.log("extTranId", extTranId);
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

  const allergen = await Allergen.findAll({
    where: {
      adminId: req.admin.id,
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
          adminId: req.admin.id,
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
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
