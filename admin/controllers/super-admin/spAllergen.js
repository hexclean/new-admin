const Allergens = require("../../../models/Allergen");
const AllergensTranslation = require("../../../models/AllergenTranslation");

exports.getAllergens = (req, res, next) => {
  Allergens.findAll({
    include: [
      {
        model: AllergensTranslation,
      },
    ],
  })
    .then((allergen) => {
      res.render("super-admin/allergen/allergens", {
        all: allergen,
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

exports.getEditAllergen = async (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }

  let allergenNameRoView;
  let allergenNameHuView;
  let allergenNameEnView;

  const allId = req.params.allergenId;

  const allergenNameRo = await Allergens.findAll({
    where: { id: allId },
    include: [
      {
        model: AllergensTranslation,
        where: { languageId: 1 },
      },
    ],
  });

  async function getAllergenNameRo() {
    for (let i = 0; i < allergenNameRo.length; i++) {
      allergenNameRoView = allergenNameRo[i].allergenTranslations[0].name;
    }
  }

  const allergenNameHu = await Allergens.findAll({
    where: { id: allId },
    include: [
      {
        model: AllergensTranslation,
        where: { languageId: 2 },
      },
    ],
  });

  async function getAllergenNameHu() {
    for (let i = 0; i < allergenNameHu.length; i++) {
      allergenNameHuView = allergenNameHu[i].allergenTranslations[0].name;
    }
  }

  const allergenNameEn = await Allergens.findAll({
    where: { id: allId },
    include: [
      {
        model: AllergensTranslation,
        where: { languageId: 3 },
      },
    ],
  });

  async function getAllergenNameEn() {
    for (let i = 0; i < allergenNameEn.length; i++) {
      allergenNameEnView = allergenNameEn[i].allergenTranslations[0].name;
    }
  }

  Allergens.findAll({
    where: { id: allId },
    include: [
      {
        model: AllergensTranslation,
      },
    ],
  })
    .then((allergen) => {
      getAllergenNameRo();
      getAllergenNameHu();
      getAllergenNameEn();
      res.render("super-admin/allergen/edit-allergen", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        allergenId: allId,
        allergen: allergen,
        allergenNameRoView: allergenNameRoView,
        allergenNameHuView: allergenNameHuView,
        allergenNameEnView: allergenNameEnView,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postEditAllergen = async (req, res, next) => {
  const catId = req.body.categoryId;

  // Description
  const categoryNameRoView = req.body.categoryNameRoView;
  const categoryNameHuView = req.body.categoryNameHuView;
  const categoryNameEnView = req.body.categoryNameEnView;

  Category.findAll({
    include: [
      {
        model: CategoryTranslation,
      },
    ],
  })
    .then((result) => {
      async function updateExtra() {
        await CategoryTranslation.update(
          {
            name: categoryNameRoView,
          },
          { where: { productCategoryId: catId, languageId: 1 } }
        );

        await CategoryTranslation.update(
          {
            name: categoryNameHuView,
          },
          { where: { productCategoryId: catId, languageId: 2 } }
        );

        await CategoryTranslation.update(
          {
            name: categoryNameEnView,
          },
          { where: { productCategoryId: catId, languageId: 3 } }
        );
      }
      updateExtra();
      res.redirect("/super-admin/categorys");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
