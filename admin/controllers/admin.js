const fileHelper = require("../../util/file");
const Product = require("../../models/Product");
const ProductVariant = require("../../models/ProductVariant");
const ProductTranslation = require("../../models/ProductTranslation");
const ProductFinal = require("../../models/ProductFinal");
const Admin = require("../../models/Admin");
var Sequelize = require("sequelize");
const ProductVariants = require("../../models/ProductVariant");

exports.getAddProduct = async (req, res, next) => {
  const ext = await ProductVariant.findAll({
    where: {
      adminId: req.admin.id,
    },
  });
  const checkVariantLength = await ProductVariants.findAll({
    where: { adminId: req.admin.id },
  });

  if (checkVariantLength.length === 0) {
    return res.redirect("/admin/products");
  }

  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    ext: ext,
    checkVariantLength: checkVariantLength,
    hasError: false,
    errorMessage: null,
    validationErrors: [],
  });
};

exports.postAddProduct = async (req, res, next) => {
  const roTitle = req.body.roTitle;
  const huTitle = req.body.huTitle;
  const enTitle = req.body.enTitle;
  //
  const price = req.body.price;
  //
  const roDescription = req.body.roDescription;
  const huDescription = req.body.huDescription;
  const enDescription = req.body.enDescription;
  //
  const status = req.body.statusAllergen;
  const image = req.file;
  const imageUrl = image.path;

  const roCategory = req.body.roCategory;
  const huCategory = req.body.huCategory;
  const enCategory = req.body.enCategory;
  //
  // Add Variant elements
  const extId = req.body.extraId;
  var filteredStatus = req.body.status.filter(Boolean);
  const commission = await Admin.findByPk(req.admin.id);
  let commissionCode = commission.commissionCode;

  const ext = await ProductVariant.findAll({
    where: {
      adminId: req.admin.id,
    },
  });

  const product = await req.admin.createProduct({
    imageUrl: imageUrl,
    allergen: typeof status !== "undefined" ? 1 : 0,
  });

  async function productTransaltion() {
    await ProductTranslation.create({
      title: roTitle,
      languageId: 1,
      description: roDescription,
      productId: product.id,
      category: roCategory,
      allergen: typeof status !== "undefined" ? 1 : 0,
    });
    await ProductTranslation.create({
      title: huTitle,
      languageId: 2,
      description: huDescription,
      productId: product.id,
      category: huCategory,
      allergen: typeof status !== "undefined" ? 1 : 0,
    });

    await ProductTranslation.create({
      title: enTitle,
      languageId: 3,
      description: enDescription,
      productId: product.id,
      category: enCategory,
      allergen: typeof status !== "undefined" ? 1 : 0,
    });
  }

  if (Array.isArray(ext)) {
    for (let i = 0; i <= ext.length - 1; i++) {
      await ProductFinal.create({
        price: price[i] || 0,
        productId: product.id,
        variantId: extId[i],
        discountedPrice: 0,
        active: filteredStatus[i] == "on" ? 1 : 0,
      });
    }
  }

  productTransaltion()
    .then((result) => {
      res.redirect("/admin/products"),
        {
          ext: ext,
        };
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getEditProduct = async (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }

  const prodId = req.params.productId;
  let productId = [prodId];
  const Op = Sequelize.Op;
  let productFinal = await ProductFinal.findAll({
    where: {
      productId: {
        [Op.in]: productId,
      },
    },
  });
  Product.findAll({
    where: {
      id: prodId,
      adminId: req.admin.id,
    },
    include: [
      {
        model: ProductTranslation,
      },
      { model: ProductFinal },
    ],
  })
    .then((product) => {
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
        variantIdByParams: prodId,
        hasError: false,
        productIds: prodId,
        productId: prodId,
        ext: productFinal,
        productVariant: productFinal,
        errorMessage: null,
        validationErrors: [],

        extTranslations: product[0].productTranslations,
        isActive: product[0].allergen,
        isActiveVariant: productFinal,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
exports.postEditProduct = async (req, res, next) => {
  const prodId = req.body.productId;
  const varId = req.body.variantId;
  let variantId = [varId];
  var filteredStatus = req.body.status.filter(Boolean);
  // Title
  console.log("variantId", varId);
  const updatedRoTitle = req.body.roTitle;
  const updatedHuTitle = req.body.huTitle;
  const updatedEnTitle = req.body.enTitle;

  // Description
  const updatedRoDesc = req.body.roDescription;
  const updatedHuDesc = req.body.huDescription;
  const updatedEnDesc = req.body.enDescription;
  //
  const price = req.body.price;
  console.log("price", price);
  const image = req.file;
  const Op = Sequelize.Op;
  const variants = await ProductFinal.findAll({
    where: {
      variantId: {
        [Op.in]: variantId,
      },
    },
  });

  Product.findAll({
    include: [
      {
        model: ProductTranslation,
      },
    ],
  })
    .then((result) => {
      async function msg() {
        await Product.findByPk(prodId).then((product) => {
          if (product.adminId.toString() !== req.admin.id.toString()) {
            return res.redirect("/");
          }
          if (image) {
            fileHelper.deleteFile(product.imageUrl);
            product.imageUrl = image.path;
          }
          return product.save();
        });
        await ProductTranslation.update(
          {
            title: updatedRoTitle,
            description: updatedRoDesc,
          },
          { where: { productId: prodId, languageId: 1 } }
        );

        await ProductTranslation.update(
          {
            title: updatedHuTitle,
            description: updatedHuDesc,
          },
          { where: { productId: prodId, languageId: 2 } }
        );

        await ProductTranslation.update(
          {
            title: updatedEnTitle,
            description: updatedEnDesc,
          },
          { where: { productId: prodId, languageId: 3 } }
        );
        if (Array.isArray(variants)) {
          const Op = Sequelize.Op;
          for (let i = 0; i <= variants.length - 1; i++) {
            let variIds = [varId[i]];
            let prodIds = [prodId];
            console.log("priceiiii", price[i]);
            await ProductFinal.update(
              {
                price: price[i] || 0,
                discountedPrice: price[i] || 0,
                active: filteredStatus[i] == "on" ? 1 : 0,
              },
              {
                where: {
                  variantId: {
                    [Op.in]: variIds,
                  },
                  productId: {
                    [Op.in]: prodIds,
                  },
                },
              }
            );
            console.log("variantId", variIds);
            console.log("prodIds", prodIds);
          }
        }
      }
      msg();
      res.redirect("/admin/products");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
exports.getProducts = async (req, res, next) => {
  const checkVariantLength = await ProductVariants.findAll({
    where: { adminId: req.admin.id },
  });
  req.admin
    .getProducts({
      include: [
        {
          model: ProductTranslation,
        },
      ],
    })
    .then((product) => {
      // console.log(products[2].title);
      var currentLanguage = req.cookies.language;
      if (currentLanguage == "ro") {
        currentLanguage = 0;
      } else if (currentLanguage == "hu") {
        currentLanguage = 1;
      } else {
        currentLanguage = 2;
      }

      res.render("admin/products", {
        prods: product,
        checkVariantLength: checkVariantLength,
        currentLanguage: currentLanguage,
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

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then((product) => {
      if (!product) {
        return next(new Error("Product not found."));
      }
      product.active = 0;
      return product.save().then((result) => {
        res.redirect("/admin/products");
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postDeleteDailyMenu = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then((product) => {
      if (!product) {
        return next(new Error("Product not found."));
      }
      product.active = 0;
      return product.save().then((result) => {
        res.redirect("/admin/daily-menus");
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
