const Category = require("../../models/ProductCategory");
const CategoryTranslation = require("../../models/ProductCategoryTranslation");

exports.getAddCategory = (req, res, next) => {
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
  const sku = req.body.sku;

  const category = await Category.create({
    adminId: req.admin.id,
    sku: sku,
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

// exports.getCategory = (req, res, next) => {
//   VariantCategory.findAll({ where: { adminId: req.admin.id } })
//     .then((extra) => {
//       var currentLanguage = req.cookies.language;
//       res.render("extra/extras", {
//         ext: extra,
//         currentLanguage: currentLanguage,
//         pageTitle: "Admin Products",
//         path: "/admin/products",
//       });
//     })
//     .catch((err) => {
//       const error = new Error(err);
//       error.httpStatusCode = 500;
//       return next(error);
//     });
// };

// exports.getEditCategory = (req, res, next) => {
//   const editMode = req.query.edit;
//   if (!editMode) {
//     return res.redirect("/");
//   }
//   const catId = req.params.categoryId;

//   VariantCategory.findAll({
//     where: {
//       id: catId,
//     },
//     include: [
//       {
//         model: VariantCategoryTranslation,
//       },
//     ],
//   })
//     .then((category) => {
//       // const extra = extras[0];
//       console.log(category);
//       // if (extra[0].adminId !== req.admin.id) {
//       //   return res.redirect("/");
//       // }
//       // console.log(extra.adminId);
//       console.log("req.admin", extra[0].adminId);
//       //   if (extra[0].adminId !== req.admin.id) {
//       //     return res.redirect("/");
//       //   }
//       res.render("extra/edit-extra", {
//         pageTitle: "Edit Product",
//         path: "/admin/edit-product",
//         editing: editMode,
//         category: category,
//         hasError: false,
//         errorMessage: null,
//         validationErrors: [],
//         // extTranslations: category[0].extraTranslations,
//       });
//     })
//     .catch((err) => {
//       const error = new Error(err);
//       error.httpStatusCode = 500;
//       return next(error);
//     });
// };

// exports.postEditCategory = async (req, res, next) => {
//   const updatedRoName = req.body.roName;
//   const updatedHuName = req.body.huName;
//   const updatedEnName = req.body.enName;
//   const extTranId = req.body.extTranId;

//   VariantCategory.findAll({
//     include: [
//       {
//         model: VariantCategoryTranslation,
//       },
//     ],
//   })
//     .then((extra) => {
//       // console.log(extra);
//       // if (extra.adminId != req.admin.id) {
//       //   return res.redirect("/");
//       // }

//       async function msg() {
//         await VariantCategoryTranslation.update(
//           { name: updatedRoName },
//           { where: { id: extTranId[0], languageId: 1 } }
//         );

//         await VariantCategoryTranslation.update(
//           { name: updatedHuName },
//           { where: { id: extTranId[1], languageId: 2 } }
//         );

//         await VariantCategoryTranslation.update(
//           { name: updatedEnName },
//           { where: { id: extTranId[2], languageId: 3 } }
//         );
//       }
//       msg();

//       res.redirect("/admin/vr-index");
//     })
//     .catch((err) => {
//       const error = new Error(err);
//       error.httpStatusCode = 500;
//       return next(error);
//     });
// };
