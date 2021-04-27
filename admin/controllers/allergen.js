const Allergen = require("../../models/Allergen");
const AllergensTranslation = require("../../models/AllergenTranslation");
const Sequelize = require("sequelize");
const Extra = require("../../models/Extra");
const ExtraHasAllergen = require("../../models/ExtraHasAllergen");
const Product = require("../../models/Product");
const ProductHasAllergen = require("../../models/ProductHasAllergen");
const Op = Sequelize.Op;

// GET
// Allergén létrehozás oldal betöltése
exports.getAddAllergen = async (req, res, next) => {
  res.render("allergen/edit-allergen", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

// POST
// Allergén létrehozása
exports.postAddAllergen = async (req, res, next) => {
  const roName = req.body.roName;
  const huName = req.body.huName;
  const enName = req.body.enName;
  if (roName.length == 0 || huName.length == 0 || enName.length == 0) {
    return res.redirect("/admin/allergen-index");
  }

  try {
    const allergen = await Allergen.create({
      restaurantId: req.admin.id,
    });

    async function createAllergenTranslation() {
      await AllergensTranslation.create({
        name: roName,
        languageId: 1,
        allergenId: allergen.id,
        restaurantId: req.admin.id,
      });
      await AllergensTranslation.create({
        name: huName,
        languageId: 2,
        restaurantId: req.admin.id,

        allergenId: allergen.id,
      });

      await AllergensTranslation.create({
        name: enName,
        languageId: 3,
        allergenId: allergen.id,
        restaurantId: req.admin.id,
      });
    }

    async function createAllergenToProduct() {
      const totalProducts = await Product.findAll({
        where: { restaurantId: req.admin.id },
      });

      for (let i = 0; i <= totalProducts.length - 1; i++) {
        await ProductHasAllergen.create({
          active: 0,
          restaurantId: req.admin.id,
          allergenId: allergen.id,
          productId: totalProducts[i].id,
        });
      }
    }

    await createAllergenTranslation();
    await createAllergenToProduct();

    res.redirect("/admin/allergen-index");
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

// GET
// Allergén szerkesztés oldal betöltése
exports.getEditAllergen = async (req, res, next) => {
  const editMode = req.query.edit;
  const allergenId = req.params.allergenId;

  // Ha nem az étteremhez tartozik, akkor átírányítás
  await Allergen.findByPk(allergenId).then((allergen) => {
    if (!allergen || !editMode) {
      return res.redirect("/");
    }
  });

  try {
    const allergen = await Allergen.findAll({
      where: {
        id: allergenId,
      },
      include: [
        {
          model: AllergensTranslation,
        },
      ],
    });
    res.render("allergen/edit-allergen", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      allergen: allergen,
      allergenId: allergenId,
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

// POST
// Allergén módosítása
exports.postEditAllergen = async (req, res, next) => {
  const updatedRoName = req.body.roName;
  const updatedHuName = req.body.huName;
  const updatedEnName = req.body.enName;
  const allergenId = req.body.allergenId;
  if (
    updatedRoName.length == 0 ||
    updatedHuName.length == 0 ||
    updatedEnName.length == 0
  ) {
    return res.redirect("/admin/allergen-index");
  }
  try {
    async function updateAllergen() {
      await AllergensTranslation.update(
        { name: updatedRoName },
        { where: { allergenId: allergenId, languageId: 1 } }
      );

      await AllergensTranslation.update(
        { name: updatedHuName },
        { where: { allergenId: allergenId, languageId: 2 } }
      );

      await AllergensTranslation.update(
        { name: updatedEnName },
        { where: { allergenId: allergenId, languageId: 3 } }
      );
    }

    await updateAllergen();
    res.redirect("/admin/allergen-index");
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};
