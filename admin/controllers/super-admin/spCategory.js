const Category = require("../../../models/ProductCategory");
const CategoryTranslation = require("../../../models/ProductCategoryTranslation");

exports.getCategory = (req, res, next) => {
  Category.findAll({
    include: [
      {
        model: CategoryTranslation,
      },
    ],
  })
    .then((category) => {
      res.render("super-admin/category/category", {
        cat: category,
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

exports.getEditCategory = async (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }

  let categoryNameRoView;
  let categoryNameHuView;
  let categoryNameEnView;

  const catId = req.params.categoryId;

  const categoryNameRo = await Category.findAll({
    where: { id: catId },
    include: [
      {
        model: CategoryTranslation,
        where: { languageId: 1 },
      },
    ],
  });

  async function getCategoryNameRo() {
    for (let i = 0; i < categoryNameRo.length; i++) {
      categoryNameRoView =
        categoryNameRo[i].productCategoryTranslations[0].name;
    }
  }

  const categoryNameHu = await Category.findAll({
    where: { id: catId },
    include: [
      {
        model: CategoryTranslation,
        where: { languageId: 2 },
      },
    ],
  });

  async function getCategoryNameHu() {
    for (let i = 0; i < categoryNameHu.length; i++) {
      categoryNameHuView =
        categoryNameHu[i].productCategoryTranslations[0].name;
    }
  }

  const categoryNameEn = await Category.findAll({
    where: { id: catId },
    include: [
      {
        model: CategoryTranslation,
        where: { languageId: 3 },
      },
    ],
  });

  async function getCategoryNameEn() {
    for (let i = 0; i < categoryNameEn.length; i++) {
      categoryNameEnView =
        categoryNameEn[i].productCategoryTranslations[0].name;
    }
  }

  Category.findAll({
    where: { id: catId },
    include: [
      {
        model: CategoryTranslation,
      },
    ],
  })
    .then((category) => {
      getCategoryNameRo();
      getCategoryNameHu();
      getCategoryNameEn();
      res.render("super-admin/category/edit-category", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        categoryId: catId,
        category: category,

        categoryNameRoView: categoryNameRoView,
        categoryNameHuView: categoryNameHuView,
        categoryNameEnView: categoryNameEnView,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postEditCategory = async (req, res, next) => {
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
