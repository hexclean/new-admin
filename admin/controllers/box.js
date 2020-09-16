const Box = require("../../models/Box");
const BoxTranslation = require("../../models/BoxTranslation");

exports.getAddBox = (req, res, next) => {
  res.render("box/edit-box", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    hasError: false,
    errorMessage: null,
    validationErrors: [],
  });
};

exports.postAddBox = async (req, res, next) => {
  const roName = req.body.roName;
  const huName = req.body.huName;
  const enName = req.body.enName;
  const price = req.body.price;
  console.log("roName", roName);
  console.log("huName", huName);
  console.log("enName", enName);
  console.log("price", price);
  const box = await Box.create({
    adminId: req.admin.id,
    price: price,
  });

  async function createBox() {
    await BoxTranslation.create({
      name: roName,
      languageId: 1,
      boxId: box.id,
      adminId: req.admin.id,
    });
    await BoxTranslation.create({
      name: huName,
      languageId: 2,
      adminId: req.admin.id,
      boxId: box.id,
    });

    await BoxTranslation.create({
      name: enName,
      languageId: 3,
      boxId: box.id,
      adminId: req.admin.id,
    });
  }

  createBox()
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getEditCategory = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const catId = req.params.categoryId;

  Category.findAll({
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
      // console.log("catId", catId);

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
  console.log("catTranId", catTranId);
  console.log("catId", catId);

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
