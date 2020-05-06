const fileHelper = require("../../util/file");
const Product = require("../../models/Product");
const ProductVariant = require("../../models/ProductVariant");
const ProductTranslation = require("../../models/ProductTranslation");
const ProductFinal = require("../../models/ProductFinal");

exports.getAddProduct = async (req, res, next) => {
  const ext = await ProductVariant.findAll({
    where: {
      adminId: req.admin.id,
    },
  });

  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    ext: ext,
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
  const price = req.body.priceProduct;
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
  const updatedExtraPrice = req.body.price;
  const extId = req.body.extraId;
  console.log("extraId", extId);
  var filteredStatus = req.body.status.filter(Boolean);

  const ext = await ProductVariant.findAll({
    where: {
      adminId: req.admin.id,
    },
  });

  const product = await req.admin.createProduct({
    imageUrl: imageUrl,
    price: price,
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
  console.log("11111product.id", product.id);

  if (Array.isArray(ext)) {
    for (let i = 0; i <= ext.length - 1; i++) {
      await ProductFinal.create({
        price: updatedExtraPrice[i] || 0,
        productId: product.id,
        variantId: extId[i],

        active: filteredStatus[i] == "on" ? 1 : 0,
      });
      console.log("22222extId[i]", extId);
      console.log("22222product.id", product.id);
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
  const x = await ProductFinal.findAll();
  console.log(x);
  req.admin
    .getProducts({
      where: { id: prodId },
      include: [
        {
          model: ProductTranslation,
          // as: "TheTranslation",
          // where: { id: prodId },
        },
      ],
    })

    .then((products) => {
      const product = products[0];
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
        hasError: false,
        errorMessage: null,
        validationErrors: [],

        isActive: product.allergen,
      });
    })
    .catch((err) => console.log(err));
};

exports.postEditProduct = async (req, res, next) => {
  const prodId = req.body.productId;

  // Title
  const updatedRoTitle = req.body.roTitle;
  const updatedHuTitle = req.body.huTitle;
  const updatedEnTitle = req.body.enTitle;

  // Description
  const updatedRoDesc = req.body.roDescription;
  const updatedHuDesc = req.body.huDescription;
  const updatedEnDesc = req.body.enDescription;
  //
  const status = req.body.status;
  const updatedPrice = req.body.price;
  const image = req.file;

  await Product.findByPk(prodId).then((product) => {
    if (product.adminId.toString() !== req.admin.id.toString()) {
      return res.redirect("/");
    }
    product.price = updatedPrice;
    if (image) {
      fileHelper.deleteFile(product.imageUrl);
      product.imageUrl = image.path;
    }
    return product.save();
  });
  async function msg() {
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
  msg();
  console.log("status", status);
  res.redirect("/admin/products");
};
exports.getProducts = (req, res, next) => {
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
