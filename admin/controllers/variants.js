const fileHelper = require("../../util/file");
const { validationResult } = require("express-validator/check");
// const Variant = require("../../models/Prod");
const VariantTranslation = require("../../models/ProductVariantTranslation");
const ProductCategoryTranslation = require("../../models/ProductCategoryTranslation");

const ProductExtra = require("../../models/Extra");

exports.getIndex = async (req, res, next) => {
  res
    .render("variant/index", {
      pageTitle: "Admin Products",
      path: "/admin/products",
    })

    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getAddVariant = async (req, res, next) => {
  const ext = 0;
  res.render("variant/edit-variant", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    hasError: false,
    ext: ext,
    errorMessage: null,

    validationErrors: [],
  });
};

exports.postAddVariant = async (req, res, next) => {
  const roName = req.body.roName;
  const huName = req.body.huName;
  const enName = req.body.enName;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).render("admin/edit-product", {
      pageTitle: "Add Product",
      path: "/admin/add-product",
      editing: false,
      hasError: true,
      variant: {
        roName: roName,
        huName: huName,
        enName: enName,
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
    });
  }

  const variant = await req.admin.createProductVariant();

  async function productVariantTransaltion() {
    await VariantTranslation.create({
      name: roName,
      languageId: 1,
      productVariantId: variant.id,
    });
    await VariantTranslation.create({
      name: huName,
      languageId: 2,
      productVariantId: variant.id,
    });

    await VariantTranslation.create({
      name: enName,
      languageId: 3,
      productVariantId: variant.id,
    });
  }

  productVariantTransaltion()
    .then((result) => {
      // //localhost:5000/admin/edit-product/1?edit=true
      // http: product.title[`${currentLanguage}`];
      // //localhost:5000/admin/edit-product/?edit=true
      // http:
      res.redirect("/admin/edit-variant/" + variant.id + "/?edit=true");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getEditVariant = async (req, res, next) => {
  const ext = await req.admin.getExtras();
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const vrId = req.params.variantId;
  req.admin
    .getProductVariants({ where: { id: vrId } })
    .then((variants) => {
      const variant = variants[0];
      if (!variant) {
        return res.redirect("/");
      }
      res.render("variant/edit-variant", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        variantId: vrId,
        errorMessage: null,
        validationErrors: [],
        ext: ext,
        variant: variant,
      });
    })
    .catch((err) => console.log(err));
};

// exports.postEditVariant = (req, res, next) => {
//   const vrId = req.body.variantId;
//   // Title
//   const updatedRoName = req.body.roName;
//   const updatedHuName = req.body.huName;
//   const updatedEnName = req.body.enName;

//   //
//   const updatedPrice = req.body.price;

//   const errors = validationResult(req);

//   if (!errors.isEmpty()) {
//     console.log(errors.array());
//     return res.status(422).render("variant/edit-variant", {
//       pageTitle: "Edit Product",
//       path: "/admin/edit-product",
//       editing: true,
//       hasError: true,
//       variant: {
//         name: updatedRoName,
//         name: updatedHuName,
//         name: updatedEnName,
//         price: updatedPrice,

//         id: vrId,
//       },

//       errorMessage: errors.array()[0].msg,
//       validationErrors: errors.array(),
//     });
//   }
//   async function productVariantUpdate() {
//     await Variant.create({
//       name: updatedRoName,
//       languageId: 1,
//       productVariantId: variant.id,
//     });
//     await Variant.create({
//       name: updatedHuName,
//       languageId: 2,
//       productVariantId: variant.id,
//     });

//     await Variant.create({
//       name: updatedEnName,
//       languageId: 3,
//       productVariantId: variant.id,
//     });
//   }

//   Variant.findByPk(vrId)
//     .then((variant) => {
//       // if (variant.adminId.toString() !== req.admin.id.toString()) {
//       //   return res.redirect("/");
//       // }
//       productVariantUpdate();

//       return variant.save().then((result) => {
//         console.log("UPDATED PRODUCT!");
//         res.redirect("/admin/products");
//       });
//     })
//     .catch((err) => {
//       const error = new Error(err);
//       error.httpStatusCode = 500;
//       return next(error);
//     });
// };

exports.postEditVariant = async (req, res, next) => {
  const vrId = req.body.variantId;
  const updatedRoName = req.body.roName;
  const updatedHuName = req.body.huName;
  const updatedEnName = req.body.enName;
  console.log(updatedRoName);
  // console.log(req.params);
  await VariantTranslation.update(
    { name: updatedRoName },
    { where: { productVariantId: vrId, languageId: 1 } }
  );
  await VariantTranslation.update(
    { name: updatedHuName },
    { where: { productVariantId: vrId, languageId: 2 } }
  );
  await VariantTranslation.update(
    { name: updatedEnName },
    { where: { productVariantId: vrId, languageId: 3 } }
  );

  // res.redirect("/admin/products");
  // })
  // .catch((err) => console.log(err));
};

exports.getEditVariant = async (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const vrId = req.params.variantId;
  const variant = await VariantTranslation.findAll({
    where: { productVariantId: vrId },
  });
  console.log(variant[0].name);

  if (!variant) {
    return res.redirect("/");
  }

  res.render("variant/edit-variant", {
    pageTitle: "Edit Product",
    path: "/admin/edit-product",
    editing: editMode,
    variant: variant,
    variantId: vrId,
    hasError: false,
    errorMessage: null,
    validationErrors: [],
  });
};

//////
exports.getAddProductCategory = (req, res, next) => {
  res.render("category/edit-category", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    hasError: false,
    errorMessage: null,
    validationErrors: [],
  });
};
exports.postAddProductCategory = async (req, res, next) => {
  const roName = req.body.roName;
  const huName = req.body.huName;
  const enName = req.body.enName;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).render("category/edit-category", {
      pageTitle: "Add Product",
      path: "/admin/add-product",
      editing: false,
      hasError: true,
      category: {
        roName: roName,
        huName: huName,
        enName: enName,
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
    });
  }

  const category = await req.admin.createProductCategory();

  async function productCategoryTransaltion() {
    await ProductCategoryTranslation.create({
      name: roName,
      languageId: 1,
      productCategoryId: category.id,
    });
    await ProductCategoryTranslation.create({
      name: huName,
      languageId: 2,
      productCategoryId: category.id,
    });

    await ProductCategoryTranslation.create({
      name: enName,
      languageId: 3,
      productCategoryId: category.id,
    });
  }

  productCategoryTransaltion()
    .then((result) => {
      res.redirect("/admin/g/");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
