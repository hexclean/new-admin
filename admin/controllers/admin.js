const fileHelper = require("../../util/file");
const Product = require("../../models/Product");
const Variant = require("../../models/Variant");
const ProductTranslation = require("../../models/ProductTranslation");
const ProductFinal = require("../../models/ProductFinal");
const Sequelize = require("sequelize");
const Allergen = require("../../models/Allergen");
const ProductHasAllergen = require("../../models/ProductHasAllergen");
const ProductVariants = require("../../models/Variant");
const AllergenTranslation = require("../../models/AllergenTranslation");
const Category = require("../../models/Category");
const CategoryTranslation = require("../../models/CategoryTranslation");
const Box = require("../../models/Box");
const BoxTranslation = require("../../models/BoxTranslation");
const ITEMS_PER_PAGE = 30;

exports.getAddProduct = async (req, res, next) => {
  let languageCode;

  if (req.cookies.language == "ro") {
    languageCode = 1;
  } else if (req.cookies.language == "hu") {
    languageCode = 2;
  } else {
    languageCode = 3;
  }

  try {
    const allergen = await Allergen.findAll({
      where: {
        restaurantId: req.admin.id,
      },
      include: [
        {
          model: AllergenTranslation,
          where: { languageId: languageCode },
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
          where: { languageId: languageCode },
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
          where: { languageId: languageCode },
        },
      ],
    });

    const ext = await Variant.findAll({
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

    if (checkVariantLength.length < 2) {
      return res.redirect("/admin/products");
    }

    if (checkBoxLength.length < 1) {
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
      allergenArray: allergen,
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

exports.postAddProduct = async (req, res, next) => {
  const allergenId = req.body.allergenId;
  var filteredStatus = req.body.status.filter(Boolean);
  const roTitle = req.body.roTitle;
  const huTitle = req.body.huTitle;
  const enTitle = req.body.enTitle;
  const boxId = req.body.boxId;
  const price = req.body.price;
  const roDescription = req.body.roDescription;
  const huDescription = req.body.huDescription;
  const enDescription = req.body.enDescription;
  const extId = req.body.extraId;
  const filteredStatusAllergen = req.body.statusAllergen.filter(Boolean);
  const filteredStatusBox = req.body.statusBox.filter(Boolean);

  if (!req.file || !req.file.path) {
    return res.redirect("/admin/products");
  }
  const image = req.file;
  const imageUrl = image.path;
  if (
    roTitle.length == 0 ||
    allergenId.length == 0 ||
    filteredStatus.length == 0 ||
    huTitle.length == 0 ||
    enTitle.length == 0 ||
    price.length == 0 ||
    roDescription.length == 0 ||
    huDescription.length == 0 ||
    enDescription.length == 0 ||
    extId.length == 0 ||
    filteredStatusAllergen.length == 0 ||
    filteredStatusBox.length == 0
  ) {
    return res.redirect("/admin/products");
  }
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
        model: AllergenTranslation,
      },
    ],
  });

  const ext = await Variant.findAll({
    where: {
      restaurantId: req.admin.id,
    },
  });

  let productId;

  if (req.body.isDailyMenu == 1) {
    console.log(req.body);
    const product = await req.admin.createProduct({
      productImagePath: imageUrl,
      active: 1,
      isDailyMenu: 1,
      soldOut: 0,
      startTime: req.body.startDate,
      endTime: req.body.endDate,
    });
    productId = product.id;
  } else {
    const product = await req.admin.createProduct({
      productImagePath: imageUrl,
      active: 1,
      isDailyMenu: 0,
    });
    productId = product.id;
  }

  async function productTranslation() {
    await ProductTranslation.create({
      title: roTitle,
      languageId: 1,
      description: roDescription,
      productId: productId,
    });
    await ProductTranslation.create({
      title: huTitle,
      languageId: 2,
      description: huDescription,
      productId: productId,
    });

    await ProductTranslation.create({
      title: enTitle,
      languageId: 3,
      description: enDescription,
      productId: productId,
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
      await ProductFinal.create({
        price: price[i] || 0,
        productId: productId,
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
          productId: productId,
          allergenId: allergenId[i],
          active: filteredStatusAllergen[i] == "on" ? 1 : 0,
          restaurantId: req.admin.id,
        });
      }
    }

    await Category.update(
      {
        active: 1,
      },
      {
        where: {
          id: req.body.categoryId,
        },
      }
    );
  }

  productTranslation()
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
  await Product.findByPk(prodId).then((product) => {
    if (!product || !editMode) {
      return res.redirect("/");
    }
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
        model: AllergenTranslation,
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
        model: AllergenTranslation,
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

  const test78 = await Product.findAll({
    where: {
      id: prodId,
      restaurantId: req.admin.id,
    },
    include: [
      {
        model: ProductTranslation,
      },
      {
        model: ProductFinal,
        where: { active: 1 },
        include: [
          {
            model: Variant,
          },
        ],
      },
    ],
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
      {
        model: ProductFinal,
        include: [
          {
            model: Variant,
          },
        ],
      },
    ],
  })
    .then((product) => {
      let startDateFin;
      let endDateFin;
      if (product[0].isDailyMenu == 1) {
        startDateFin = product[0].startTime;
        endDateFin = product[0].endTime;
      }
      let productVariantTest = [];
      for (let i = 0; i < product.length; i++) {
        productVariantTest = product[i].ProductFinals;
      }
      res.render("admin/edit-product", {
        isActiveAllergen: allergenTest,
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        currentCat: test78[0].ProductFinals[0].Variant.categoryId,
        allergenArray: allergen,
        product: product,
        variantIdByParams: prodId,
        cat: cat,
        productIds: prodId,
        productId: prodId,
        ext: productFinal,
        netest: productVariantTest,
        boxArray: box,
        productVariant: prodVariant,
        errorMessage: null,
        validationErrors: [],
        boxEnabled: productFinal,
        extTranslations: product[0].productTranslations,
        isActive: product[0].allergen,
        isActiveVariant: productFinal,
        startDateFin: startDateFin,
        endDateFin: endDateFin,
      });
    })
    .catch((err) => {
      console.log(err);
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
          if (req.body.isDailyMenu == 1) {
            if (image) {
              fileHelper.deleteFile(product.productImagePath);
              Product.update(
                {
                  productImagePath: image.path,
                  active: 1,
                  isDailyMenu: 1,
                  soldOut: 0,
                  startTime: req.body.startDate,
                  endTime: req.body.endDate,
                },
                { where: { id: prodId } }
              );
            }
          } else {
            if (image) {
              fileHelper.deleteFile(product.productImagePath);
              Product.update(
                {
                  productImagePath: image.path,
                  active: 1,
                  isDailyMenu: 0,
                },
                { where: { id: prodId } }
              );
            }
          }

          // if (image) {
          //   fileHelper.deleteFile(product.productImagePath);
          //   product.productImagePath = image.path;
          // }
          // return product.save();
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
        await Category.update(
          {
            active: 1,
          },
          {
            where: {
              id: req.body.categoryId,
            },
          }
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
            console.log(err);
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
          console.log(req.body);
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
  const page = +req.query.page || 1;
  let totalItems;
  let languageCode;

  if (req.cookies.language == "ro") {
    languageCode = 1;
  } else if (req.cookies.language == "hu") {
    languageCode = 2;
  } else {
    languageCode = 3;
  }
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
        where: { languageId: languageCode },
      },
      { model: ProductFinal, where: { active: 1 } },
    ],
  })
    .then((numAllergen) => {
      totalItems = numAllergen;
      return Product.findAll({
        where: {
          restaurantId: req.admin.id,
          active: 1,
        },
        include: [
          {
            model: ProductTranslation,
            where: { languageId: languageCode },
          },
          {
            model: ProductFinal,
            where: { active: 1 },
            include: [{ model: Variant }],
          },
        ],
        offset: (page - 1) * ITEMS_PER_PAGE,
        limit: ITEMS_PER_PAGE,
      });
    })
    .then((product) => {
      res.render("admin/products", {
        pageTitle: "Admin Products",
        path: "/admin/products",
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems.length,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItems.length / ITEMS_PER_PAGE),
        prods: product,
        checkVariantLength: checkVariantLength,
        checkBoxLength: checkBoxLength,
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
