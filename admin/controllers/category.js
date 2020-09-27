const Category = require("../../models/ProductCategory");
const CategoryTranslation = require("../../models/ProductCategoryTranslation");
const Allergen = require("../../models/Allergen");

exports.getAddCategory = async (req, res, next) => {
  const checkAllergenLength = await Allergen.findAll({
    where: {
      adminId: req.admin.id,
    },
  });
  if (checkAllergenLength.length === 0) {
    return res.redirect("/admin/vr-index");
  }
  res.render("category/edit-category", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    hasError: false,
    errorMessage: null,
    validationErrors: [],
  });
};

exports.postAddCategory = async (req, res, next) => {
  const roName = req.body.roName;
  const huName = req.body.huName;
  const enName = req.body.enName;

  const category = await Category.create({
    adminId: req.admin.id,
  });

  async function extraTransaltion() {
    await CategoryTranslation.create({
      name: roName,
      languageId: 1,
      productCategoryId: category.id,
      adminId: req.admin.id,
    });
    await CategoryTranslation.create({
      name: huName,
      languageId: 2,
      adminId: req.admin.id,

      productCategoryId: category.id,
    });

    await CategoryTranslation.create({
      name: enName,
      languageId: 3,
      productCategoryId: category.id,
      adminId: req.admin.id,
    });
  }

  extraTransaltion()
    .then((result) => {
      res.redirect("/admin/vr-index");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getEditCategory = async (req, res, next) => {
  const editMode = req.query.edit;
  const catId = req.params.categoryId;

  if (!editMode) {
    return res.redirect("/");
  }

  await Category.findByPk(catId).then((category) => {
    if (!category) {
      return res.redirect("/");
    }
  });

  await Category.findAll({
    where: {
      id: catId,
      adminId: req.admin.id,
    },
    include: [
      {
        model: CategoryTranslation,
      },
    ],
  })
    .then((category) => {
      if (category[0].adminId !== req.admin.id) {
        return res.redirect("/");
      }

      res.render("category/edit-category", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        cat: category,
        catId: catId,
        hasError: false,
        errorMessage: null,
        validationErrors: [],
        extTranslations: category[0].productCategoryTranslations,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postEditCategory = async (req, res, next) => {
  const updatedRoName = req.body.roName;
  const updatedHuName = req.body.huName;
  const updatedEnName = req.body.enName;
  const updatedSku = req.body.sku;
  const catId = req.body.categoryId;

  const catTranId = req.body.catTranId;

  Category.findAll({
    where: { adminId: req.admin.id },
    include: [
      {
        model: CategoryTranslation,
      },
    ],
  })
    .then((category) => {
      async function msg() {
        await Category.update({ sku: updatedSku }, { where: { id: catId } });
        await CategoryTranslation.update(
          { name: updatedRoName },
          { where: { id: catTranId[0], languageId: 1 } }
        );

        await CategoryTranslation.update(
          { name: updatedHuName },
          { where: { id: catTranId[1], languageId: 2 } }
        );

        await CategoryTranslation.update(
          { name: updatedEnName },
          { where: { id: catTranId[2], languageId: 3 } }
        );
      }
      msg();

      res.redirect("/admin/vr-index");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
