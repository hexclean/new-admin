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
  const allId = req.body.allergenId;

  // Description
  const allergenNameRoView = req.body.allergenNameRoView;
  const allergenNameHuView = req.body.allergenNameHuView;
  const allergenNameEnView = req.body.allergenNameEnView;

  Allergens.findAll({
    include: [
      {
        model: AllergensTranslation,
      },
    ],
  })
    .then((result) => {
      async function updateAllergen() {
        await AllergensTranslation.update(
          {
            name: allergenNameRoView,
          },
          { where: { allergenId: allId, languageId: 1 } }
        );

        await AllergensTranslation.update(
          {
            name: allergenNameHuView,
          },
          { where: { allergenId: allId, languageId: 2 } }
        );

        await AllergensTranslation.update(
          {
            name: allergenNameEnView,
          },
          { where: { allergenId: allId, languageId: 3 } }
        );
      }
      updateAllergen();
      res.redirect("/super-admin/allergens");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
