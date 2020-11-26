const Category = require("../../models/Category");
const CategoryTranslation = require("../../models/CategoryTranslation");
const Allergen = require("../../models/Allergen");

exports.getAddCategory = async (req, res, next) => {
  const checkAllergenLength = await Allergen.findAll({
    where: {
      restaurantId: req.admin.id,
    },
  });
  if (checkAllergenLength.length === 0) {
    return res.redirect("/admin/category-index");
  }
  res.render("category/edit-category", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddCategory = async (req, res, next) => {
  const roName = req.body.roName;
  const huName = req.body.huName;
  const enName = req.body.enName;

  if (roName == "" || huName == "" || enName == "") {
    return res.redirect("/admin/category-index");
  }

  try {
    const category = await Category.create({
      restaurantId: req.admin.id,
    });

    await CategoryTranslation.create({
      name: roName,
      languageId: 1,
      categoryId: category.id,
      restaurantId: req.admin.id,
    });

    await CategoryTranslation.create({
      name: huName,
      languageId: 2,
      categoryId: category.id,
      restaurantId: req.admin.id,
    });

    await CategoryTranslation.create({
      name: enName,
      languageId: 3,
      categoryId: category.id,
      restaurantId: req.admin.id,
    });

    res.redirect("/admin/category-index");
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

exports.getEditCategory = async (req, res, next) => {
  const editMode = req.query.edit;
  const categoryId = req.params.categoryId;

  if (!editMode) {
    return res.redirect("/");
  }

  await Category.findByPk(categoryId).then((category) => {
    if (!category || category.restaurantId != req.admin.id) {
      return res.redirect("/");
    }
  });

  try {
    await Category.findAll({
      where: {
        id: categoryId,
        restaurantId: req.admin.id,
      },
      include: [
        {
          model: CategoryTranslation,
        },
      ],
    }).then((category) => {
      res.render("category/edit-category", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        category: category,
        categoryId: categoryId,
        extTranslations: category[0].CategoryTranslations,
      });
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

exports.postEditCategory = async (req, res, next) => {
  const updatedRoName = req.body.roName;
  const updatedHuName = req.body.huName;
  const updatedEnName = req.body.enName;
  const categoryTranslationId = req.body.categoryTranslationId;

  if (
    updatedRoName == "" ||
    updatedHuName == "" ||
    updatedEnName == "" ||
    categoryTranslationId == ""
  ) {
    return res.redirect("/admin/category-index");
  }

  try {
    Category.findAll({
      where: { restaurantId: req.admin.id },
      include: [
        {
          model: CategoryTranslation,
        },
      ],
    }).then(async (result) => {
      console.log(result);
      await CategoryTranslation.update(
        { name: updatedRoName },
        { where: { id: categoryTranslationId[0], languageId: 1 } }
      );

      await CategoryTranslation.update(
        { name: updatedHuName },
        { where: { id: categoryTranslationId[1], languageId: 2 } }
      );

      await CategoryTranslation.update(
        { name: updatedEnName },
        { where: { id: categoryTranslationId[2], languageId: 3 } }
      );
    });
    res.redirect("/admin/category-index");
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};
