const fileHelper = require("../../util/file");
const Product = require("../../models/Product");
const ProductVariant = require("../../models/ProductVariant");
const ProductTranslation = require("../../models/ProductTranslation");
const ProductFinal = require("../../models/ProductFinal");
const Admin = require("../../models/Restaurant");
const Sequelize = require("sequelize");
const Allergen = require("../../models/Allergen");
const ProductHasAllergen = require("../../models/ProductHasAllergen");
const ProductVariants = require("../../models/ProductVariant");
const AllegenTranslation = require("../../models/AllergenTranslation");
const Category = require("../../models/ProductCategory");
const CategoryTranslation = require("../../models/ProductCategoryTranslation");
const Box = require("../../models/Box");
const BoxTranslation = require("../../models/BoxTranslation");
exports.getAddProduct = async (req, res, next) => {
  const allergen = await Allergen.findAll({
    where: {
      restaurantId: req.admin.id,
    },
    include: [
      {
        model: AllegenTranslation,
      },
    ],
  });
  const box = await Box.findAll({
    where: {
      restaurantId: req.admin.id,
    },
    include: [
      {
        model: BoxTranslation,
      },
    ],
  });
  const cat = await Category.findAll({
    where: {
      restaurantId: req.admin.id,
    },
    include: [
      {
        model: CategoryTranslation,
      },
    ],
  });

  const ext = await ProductVariant.findAll({
    where: {
      restaurantId: req.admin.id,
    },
  });

  const checkVariantLength = await ProductVariants.findAll({
    where: { restaurantId: req.admin.id },
  });
  const checkBoxLength = await Box.findAll({
    where: { restaurantId: req.admin.id },
  });

  if (checkVariantLength.length === 0) {
    return res.redirect("/admin/products");
  }

  if (checkBoxLength.length === 0) {
    return res.redirect("/admin/products");
  }

  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    ext: ext,
    cat: cat,
    boxArray: box,
    checkBoxLength: checkBoxLength,
    checkVariantLength: checkVariantLength,
    hasError: false,
    allergenArray: allergen,
    errorMessage: null,
    validationErrors: [],
  });
};

exports.postAddProduct = async (req, res, next) => {
  const allergenId = req.body.allergenId;
  var filteredStatus = req.body.status.filter(Boolean);
  const roTitle = req.body.roTitle;
  const huTitle = req.body.huTitle;
  const enTitle = req.body.enTitle;
  const boxId = req.body.boxId;
  //
  const price = req.body.price;
  //
  const roDescription = req.body.roDescription;
  const huDescription = req.body.huDescription;
  const enDescription = req.body.enDescription;
  //
  const image = req.file;
  const imageUrl = image.path;
  const extId = req.body.extraId;
  var filteredStatusAllergen = req.body.statusAllergen.filter(Boolean);
  var filteredStatusBox = req.body.statusBox.filter(Boolean);
  const commission = await Admin.findByPk(req.admin.id);
  let commissionCode = commission.commissionCode;
  const box = await Box.findAll({
    where: {
      restaurantId: req.admin.id,
    },
    include: [
      {
        model: BoxTranslation,
      },
    ],
  });
  const allergen = await Allergen.findAll({
    where: {
      restaurantId: req.admin.id,
    },
    include: [
      {
        model: AllegenTranslation,
      },
    ],
  });

  const ext = await ProductVariant.findAll({
    where: {
      restaurantId: req.admin.id,
    },
  });

  const product = await req.admin.createProduct({
    imageUrl: imageUrl,
    active: 1,
  });

  async function productTransaltion() {
    await ProductTranslation.create({
      title: roTitle,
      languageId: 1,
      description: roDescription,
      productId: product.id,
    });
    await ProductTranslation.create({
      title: huTitle,
      languageId: 2,
      description: huDescription,
      productId: product.id,
    });

    await ProductTranslation.create({
      title: enTitle,
      languageId: 3,
      description: enDescription,
      productId: product.id,
    });
  }

  async function createVariant() {
    let boxIdFinal = 0;
    for (let i = 0; i < box.length; i++) {
      if (filteredStatusBox[i] == "on") {
        boxIdFinal = filteredStatusBox[i].substring(2) + boxId[i];
      }
    }

    for (let i = 0; i <= ext.length - 1; i++) {
      console.log("price[i]", price[i]);
      await ProductFinal.create({
        price: price[i] || 0,
        productId: product.id,
        variantId: extId[i],
        discountedPrice: 0,
        active: filteredStatus[i] == "on" ? 1 : 0,
        boxId: Number.isInteger(boxIdFinal) ? null : boxIdFinal,
      });
    }
  }

  async function allergens() {
    if (Array.isArray(allergen)) {
      for (let i = 0; i <= allergen.length - 1; i++) {
        await ProductHasAllergen.create({
          productId: product.id,
          allergenId: allergenId[i],
          active: filteredStatusAllergen[i] == "on" ? 1 : 0,
          restaurantId: req.admin.id,
        });
      }
    }
  }

  productTransaltion()
    .then((result) => {
      createVariant();
      allergens();
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
  const prodId = req.params.productId;
  const productId = [prodId];
  const Op = Sequelize.Op;

  if (!editMode) {
    return res.redirect("/");
  }

  await Product.findByPk(prodId).then((product) => {
    if (!product) {
      return res.redirect("/");
    }
  });

  const box = await Box.findAll({
    where: {
      restaurantId: req.admin.id,
    },
    include: [
      {
        model: BoxTranslation,
      },
    ],
  });
  const allergen = await Allergen.findAll({
    where: {
      restaurantId: req.admin.id,
    },
    include: [
      {
        model: AllegenTranslation,
      },
      { model: ProductHasAllergen },
    ],
  });

  const allergenTest = await Allergen.findAll({
    where: {
      restaurantId: req.admin.id,
    },
    include: [
      {
        model: AllegenTranslation,
      },
      {
        model: ProductHasAllergen,
        where: {
          productId: { [Op.in]: productId },
          restaurantId: req.admin.id,
        },
      },
    ],
  });

  const prodVariant = await ProductVariants.findAll({
    where: {
      restaurantId: req.admin.id,
    },
    include: [
      {
        model: ProductFinal,
      },
    ],
  });
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
      restaurantId: req.admin.id,
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
        isActiveAllergen: allergenTest,
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        allergenArray: allergen,
        product: product,
        variantIdByParams: prodId,
        hasError: false,
        productIds: prodId,
        productId: prodId,
        ext: productFinal,
        boxArray: box,
        productVariant: prodVariant,
        errorMessage: null,
        validationErrors: [],
        boxEnabled: productFinal,
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
  const varId = req.body.variantIdUp;
  const allergenId = req.body.allergenId;
  const filteredStatusBox = req.body.statusBox.filter(Boolean);
  const boxId = req.body.boxId;
  const filteredStatusAllergen = req.body.statusAllergen.filter(Boolean);
  // Title
  const updatedRoTitle = req.body.roTitle;
  const updatedHuTitle = req.body.huTitle;
  const updatedEnTitle = req.body.enTitle;

  // Description
  const updatedRoDesc = req.body.roDescription;
  const updatedHuDesc = req.body.huDescription;
  const updatedEnDesc = req.body.enDescription;
  //
  const updatedExtraPrice = req.body.price;
  const image = req.file;
  const filteredStatus = req.body.status.filter(Boolean);
  const Op = Sequelize.Op;
  const productArray = [prodId];
  //
  const box = await Box.findAll({
    where: {
      restaurantId: req.admin.id,
    },
    include: [
      {
        model: BoxTranslation,
      },
    ],
  });
  const productHasAllergen = await ProductHasAllergen.findAll({
    where: {
      productId: {
        [Op.in]: productArray,
      },
    },
  });

  const variants = await ProductVariants.findAll({
    where: {
      restaurantId: req.admin.id,
    },
    include: [
      {
        model: ProductFinal,
      },
    ],
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
          if (product.restaurantId.toString() !== req.admin.id.toString()) {
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
      }

      async function variantsFn() {
        const Op = Sequelize.Op;
        let boxIdFinal = 0;
        for (let i = 0; i < box.length; i++) {
          if (filteredStatusBox[i] == "on") {
            boxIdFinal = filteredStatusBox[i].substring(2) + boxId[i];
          }
        }

        for (let i = 0; i < variants.length; i++) {
          let variIds = [varId[i]];
          let prodIds = [prodId];
          await ProductFinal.update(
            {
              price: updatedExtraPrice[i] || 0,
              discountedPrice: updatedExtraPrice[i] || 0,
              active: filteredStatus[i] == "on" ? 1 : 0,
              boxId: Number.isInteger(boxIdFinal) ? null : boxIdFinal,
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
          ).catch((err) => {
            console.log("error1111", err);
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
          });
        }
      }

      async function productHasAllergenFn() {
        if (Array.isArray(productHasAllergen)) {
          const Op = Sequelize.Op;
          for (let i = 0; i <= productHasAllergen.length - 1; i++) {
            let productIds = [allergenId[i]];
            let productId = [prodId];
            await ProductHasAllergen.update(
              {
                active: filteredStatusAllergen[i] == "on" ? 1 : 0,
              },
              {
                where: {
                  restaurantId: req.admin.id,
                  allergenId: {
                    [Op.in]: productIds,
                  },
                  productId: {
                    [Op.in]: productId,
                  },
                },
              }
            ).catch((err) => {
              const error = new Error(err);
              error.httpStatusCode = 500;
              return next(error);
            });
          }
        }
      }
      msg()
        .then((result) => {
          variantsFn();
          productHasAllergenFn();
          res.redirect("/admin/products");
        })
        .catch((err) => {
          const error = new Error(err);
          error.httpStatusCode = 500;
          return next(error);
        });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getProducts = async (req, res, next) => {
  let currentProductName = [];
  let currentProductDescription = [];

  const checkVariantLength = await ProductVariants.findAll({
    where: { restaurantId: req.admin.id },
  });
  const checkBoxLength = await Box.findAll({
    where: { restaurantId: req.admin.id },
  });

  await Product.findAll({
    where: { restaurantId: req.admin.id, active: 1 },
    include: [
      {
        model: ProductTranslation,
      },
      { model: ProductFinal },
    ],
  })

    .then((product) => {
      for (let i = 0; i < product.length; i++) {
        var currentLanguage = req.cookies.language;

        if (currentLanguage == "ro") {
          currentProductName[i] = product[i].productTranslations[0].title;
        } else if (currentLanguage == "hu") {
          currentProductName[i] = product[i].productTranslations[1].title;
        } else {
          currentProductName[i] = product[i].productTranslations[2].title;
        }
      }

      for (let i = 0; i < product.length; i++) {
        var currentLanguage = req.cookies.language;

        if (currentLanguage == "ro") {
          currentProductDescription[i] =
            product[i].productTranslations[0].description;
        } else if (currentLanguage == "hu") {
          currentProductDescription[i] =
            product[i].productTranslations[1].description;
        } else {
          currentProductDescription[i] =
            product[i].productTranslations[2].description;
        }
      }
      res.render("admin/products", {
        prods: product,
        checkVariantLength: checkVariantLength,
        currentLanguage: currentLanguage,
        currentProductName: currentProductName,
        currentProductDescription: currentProductDescription,
        checkBoxLength: checkBoxLength,
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
  Product.findByPk(prodId)
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

exports.getCategoryVariants = async (req, res, next) => {
  const categoryId = req.params.categoryId;

  await ProductVariant.findAll({
    where: {
      restaurantId: req.admin.id,
      categoryId: categoryId,
    },
  })

    .then((variant) => {
      console.log(variant);
      res.render("admin/searchedVariants", {
        variants: variant,
        editing: false,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
