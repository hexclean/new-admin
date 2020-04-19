const fileHelper = require("../../util/file");
const { validationResult } = require("express-validator/check");
const Product = require("../../models/Product");
const Language = require("../../models/Language");
const ProductTranslation = require("../../models/ProductTranslation");

exports.getSearchProduct = (req, res, next) => {
  let { term } = req.query;
  console.log("req.query", req.query);
  Product.find({
    adminId: req.admin._id,
    dailyMenu: { $ne: "yes" },
    active: 1,
    $text: { $search: "%" + term + "%" },
  })
    .then((products) => {
      var currentLanguage = req.cookies.language;
      res.render("admin/products", {
        prods: products,
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

exports.getAddProduct = async (req, res, next) => {
  const ext = await req.admin.getProductVariants();
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
  const price = req.body.price;
  //
  const roDescription = req.body.roDescription;
  const huDescription = req.body.huDescription;
  const enDescription = req.body.enDescription;
  //

  const roCategory = req.body.roCategory;
  const huCategory = req.body.huCategory;
  const enCategory = req.body.enCategory;
  //
  const image = req.file;
  if (!image) {
    return res.status(422).render("admin/edit-product", {
      pageTitle: "Add Product",
      path: "/admin/add-product",
      editing: false,
      hasError: true,
      product: {
        title: huTitle,
        title: enTitle,
        title: roTitle,
        description: enDescription,
        description: huDescription,
        description: roDescription,

        price: price,
        category: enCategory,
        category: huCategory,
        category: roCategory,
      },
      errorMessage: "Attached file is not an image.",
      validationErrors: [],
    });
  }
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).render("admin/edit-product", {
      pageTitle: "Add Product",
      path: "/admin/add-product",
      editing: false,
      hasError: true,
      product: {
        huTitle: huTitle,
        price: price,
        title: roTitle,
        description: enDescription,
        description: huDescription,
        description: roDescription,

        category: enCategory,
        category: huCategory,
        category: roCategory,
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
    });
  }

  const imageUrl = image.path;

  const product = await req.admin.createProduct({
    imageUrl: imageUrl,
    price: price,
  });
  const ext = await req.admin.getProductVariants();
  async function productTransaltion() {
    await ProductTranslation.create({
      title: roTitle,
      languageId: 1,
      description: roDescription,
      productId: product.id,
      category: roCategory,
    });
    await ProductTranslation.create({
      title: huTitle,
      languageId: 2,
      description: huDescription,
      productId: product.id,
      category: huCategory,
    });

    await ProductTranslation.create({
      title: enTitle,
      languageId: 3,
      description: enDescription,
      productId: product.id,
      category: enCategory,
    });
  }

  productTransaltion()
    .then((result) => {
      res.redirect("/admin/add-product"),
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
exports.getExtras = (req, res, next) => {
  ExtraAdd.find({ adminId: req.admin._id })

    .then((orders) => {
      var currentLanguage = req.cookies.language;
      console.log(orders);
      res.render("extra/extra-list", {
        ords: orders,
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

exports.getEditProduct = async (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = await req.params.productId;
  req.admin
    .getProducts({ where: { id: prodId } })

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
      });
    })
    .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  // Title
  const updatedRoTitle = req.body.roTitle;
  const updatedHuTitle = req.body.huTitle;
  const updatedEnTitle = req.body.enTitle;
  // Category
  const updatedRoCategory = req.body.roCategory;
  const updatedHuCategory = req.body.huCategory;
  const updatedEnCategory = req.body.enCategory;
  // Description
  const updatedRoDesc = req.body.roDescription;
  const updatedHuDesc = req.body.huDescription;
  const updatedEnDesc = req.body.enDescription;
  //
  const updatedPrice = req.body.price;
  const image = req.file;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: true,
      hasError: true,
      product: {
        title: updatedEnTitle,
        title: updatedHuTitle,
        roTitle: updatedRoTitle,
        price: updatedPrice,
        description: updatedEnDesc,
        description: updatedHuDesc,
        description: updatedRoDesc,
        category: updatedEnCategory,
        category: updatedHuCategory,
        category: updatedRoCategory,
        _id: prodId,
      },

      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
    });
  }

  Product.findById(prodId)
    .then((product) => {
      if (product.adminId.toString() !== req.admin._id.toString()) {
        return res.redirect("/");
      }
      product.title = {
        en: updatedEnTitle,
        hu: updatedHuTitle,
        ro: updatedRoTitle,
      };
      product.price = updatedPrice;
      product.category = {
        en: updatedEnCategory,
        hu: updatedHuCategory,
        ro: updatedRoCategory,
      };
      product.description = {
        en: updatedEnDesc,
        hu: updatedHuDesc,
        ro: updatedRoDesc,
      };
      if (image) {
        fileHelper.deleteFile(product.imageUrl);
        product.imageUrl = image.path;
      }
      return product.save().then((result) => {
        console.log("UPDATED PRODUCT!");
        res.redirect("/admin/products");
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getProducts = async (req, res, next) => {
  await req.admin
    .getProducts({
      include: [
        {
          model: ProductTranslation,
        },
      ],
    })
    .then((products) => {
      var currentLanguage = req.cookies.language;
      if (currentLanguage == "ro") {
        currentLanguage = 0;
      } else if (currentLanguage == "hu") {
        currentLanguage = 1;
      } else {
        currentLanguage = 2;
      }

      res.render("admin/products", {
        prods: products,
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

exports.getOk = async (req, res, next) => {
  await req.admin
    .getProducts({
      include: [
        {
          model: ProductTranslation,
        },
      ],
    })
    .then((products) => {
      var currentLanguage = req.cookies.language;
      if (currentLanguage == "ro") {
        currentLanguage = 0;
      } else if (currentLanguage == "hu") {
        currentLanguage = 1;
      } else {
        currentLanguage = 2;
      }

      res.render("admin/ok", {
        prods: products,
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
