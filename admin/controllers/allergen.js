const Allergen = require("../../models/Allergen");
const AllergensTranslation = require("../../models/AllergenTranslation");
const Sequelize = require("sequelize");
const Extra = require("../../models/Extra");
const ExtraHasAllergen = require("../../models/ExtraHasAllergen");
const Product = require("../../models/Product");
const ProductHasAllergen = require("../../models/ProductHasAllergen");
const Op = Sequelize.Op;
const ITEMS_PER_PAGE = 30;

exports.getAddAllergen = async (req, res, next) => {
  res.render("allergen/edit-allergen", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddAllergen = async (req, res, next) => {
  const roName = req.body.roName;
  const huName = req.body.huName;
  const enName = req.body.enName;
  if (roName.length == 0 || huName.length == 0 || enName.length == 0) {
    return res.redirect("/admin/allergen-index");
  }
  const allergen = await Allergen.create({
    restaurantId: req.admin.id,
  });

  async function extraTranslation() {
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

  async function extraMenuAllergen() {
    const totalExtras = await Extra.findAll({
      where: { restaurantId: req.admin.id },
    });
    if (Array.isArray(totalExtras)) {
      for (let i = 0; i <= totalExtras.length - 1; i++) {
        await ExtraHasAllergen.create({
          active: 0,
          restaurantId: req.admin.id,
          allergenId: allergen.id,
          extraId: totalExtras[i].id,
        });
      }
    } else {
      return;
    }
  }
  async function productMenuAllergen() {
    const totalProducts = await Product.findAll({
      where: { restaurantId: req.admin.id },
    });
    if (Array.isArray(totalProducts)) {
      for (let i = 0; i <= totalProducts.length - 1; i++) {
        await ProductHasAllergen.create({
          active: 0,
          restaurantId: req.admin.id,
          allergenId: allergen.id,
          productId: totalProducts[i].id,
        });
      }
    } else {
      return;
    }
  }

  extraTranslation()
    .then((result) => {
      extraMenuAllergen();
      productMenuAllergen();

      res.redirect("/admin/allergen-index");
      // res.write(
      //   '<script>window.alert("dasd");window.location="/admin/allergen-index"</script>'
      // );
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getEditAllergen = async (req, res, next) => {
  const editMode = req.query.edit;
  const allergenId = req.params.allergenId;
  await Allergen.findByPk(allergenId).then((allergen) => {
    if (!allergen || !editMode) {
      return res.redirect("/");
    }
  });

  await Allergen.findAll({
    where: {
      id: allergenId,
    },
    include: [
      {
        model: AllergensTranslation,
      },
    ],
  })
    .then((allergen) => {
      res.render("allergen/edit-allergen", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        allergen: allergen,
        allergenId: allergenId,
        extTranslations: allergen[0].AllergenTranslations,
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
  const allergenTranId = req.body.allergenTranId;

  if (
    updatedRoName.length == 0 ||
    updatedHuName.length == 0 ||
    updatedEnName.length == 0
  ) {
    return res.redirect("/admin/allergen-index");
  }
  Allergen.findAll({
    include: [
      {
        model: AllergensTranslation,
      },
    ],
  })
    .then((allergen) => {
      async function msg() {
        await AllergensTranslation.update(
          { name: updatedRoName },
          { where: { id: allergenTranId[0], languageId: 1 } }
        );

        await AllergensTranslation.update(
          { name: updatedHuName },
          { where: { id: allergenTranId[1], languageId: 2 } }
        );

        await AllergensTranslation.update(
          { name: updatedEnName },
          { where: { id: allergenTranId[2], languageId: 3 } }
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
