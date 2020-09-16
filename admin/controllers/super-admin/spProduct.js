const Products = require("../../../models/Product");
const ProductsTranslation = require("../../../models/ProductTranslation");

exports.getProducts = (req, res, next) => {
  Products.findAll({
    include: [
      {
        model: ProductsTranslation,
      },
    ],
  })
    .then((products) => {
      res.render("super-admin/products/products", {
        prod: products,
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

  let productTitleRoView;
  let productTitleHuView;
  let productTitleEnView;
  let productDescriptionRoView;
  let productDescriptionHuView;
  let productDescriptionEnView;

  const prodId = req.params.productId;

  const productTitRo = await Products.findAll({
    where: { id: prodId },
    include: [
      {
        model: ProductsTranslation,
        where: { languageId: 1 },
      },
    ],
  });

  async function getProductTitRo() {
    for (let i = 0; i < productTitRo.length; i++) {
      productTitleRoView = productTitRo[i].productTranslations[0].title;
    }
  }

  const productTitHu = await Products.findAll({
    where: { id: prodId },
    include: [
      {
        model: ProductsTranslation,
        where: { languageId: 2 },
      },
    ],
  });

  async function getProductTitHu() {
    for (let i = 0; i < productTitHu.length; i++) {
      productTitleHuView = productTitHu[i].productTranslations[0].title;
    }
  }

  const productTitEn = await Products.findAll({
    where: { id: prodId },
    include: [
      {
        model: ProductsTranslation,
        where: { languageId: 3 },
      },
    ],
  });

  async function getProductTitEn() {
    for (let i = 0; i < productTitEn.length; i++) {
      productTitleEnView = productTitEn[i].productTranslations[0].title;
    }
  }

  //

  const productDescriptionRo = await Products.findAll({
    where: { id: prodId },
    include: [
      {
        model: ProductsTranslation,
        where: { languageId: 1 },
      },
    ],
  });

  async function getProductDescriptionRo() {
    for (let i = 0; i < productDescriptionRo.length; i++) {
      productDescriptionRoView =
        productDescriptionRo[i].productTranslations[0].description;
    }
  }

  const productDescriptionHu = await Products.findAll({
    where: { id: prodId },
    include: [
      {
        model: ProductsTranslation,
        where: { languageId: 2 },
      },
    ],
  });

  async function getProductDescriptionHu() {
    for (let i = 0; i < productDescriptionHu.length; i++) {
      productDescriptionHuView =
        productDescriptionHu[i].productTranslations[0].description;
    }
  }

  const productDescriptionEn = await Products.findAll({
    where: { id: prodId },
    include: [
      {
        model: ProductsTranslation,
        where: { languageId: 3 },
      },
    ],
  });

  async function getProductDescriptionEn() {
    for (let i = 0; i < productDescriptionEn.length; i++) {
      productDescriptionEnView =
        productDescriptionEn[i].productTranslations[0].description;
    }
  }

  Products.findAll({
    where: { id: prodId },
    include: [
      {
        model: ProductsTranslation,
      },
    ],
  })
    .then((product) => {
      getProductTitRo();
      getProductTitHu();
      getProductTitEn();
      getProductDescriptionRo();
      getProductDescriptionHu();
      getProductDescriptionEn();

      res.render("super-admin/products/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        productId: prodId,
        product: product,

        productTitleRoView: productTitleRoView,
        productTitleHuView: productTitleHuView,
        productTitleEnView: productTitleEnView,

        productDescriptionRoView: productDescriptionRoView,
        productDescriptionHuView: productDescriptionHuView,
        productDescriptionEnView: productDescriptionEnView,
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

  // Title
  const productTitleRoView = req.body.productTitleRoView;
  const productTitleHuView = req.body.productTitleHuView;
  const productTitleEnView = req.body.productTitleEnView;

  // Description
  const productDescriptionRoView = req.body.productDescriptionRoView;
  const productDescriptionHuView = req.body.productDescriptionHuView;
  const productDescriptionEnView = req.body.productDescriptionEnView;

  Products.findAll({
    include: [
      {
        model: ProductsTranslation,
      },
    ],
  })
    .then((result) => {
      async function updateLocationName() {
        await ProductsTranslation.update(
          {
            title: productTitleRoView,
            description: productDescriptionRoView,
          },
          { where: { productId: prodId, languageId: 1 } }
        );

        await ProductsTranslation.update(
          {
            title: productTitleHuView,
            description: productDescriptionHuView,
          },
          { where: { productId: prodId, languageId: 2 } }
        );

        await ProductsTranslation.update(
          {
            title: productTitleEnView,
            description: productDescriptionEnView,
          },
          { where: { productId: prodId, languageId: 3 } }
        );
      }
      updateLocationName();
      res.redirect("/super-admin/products");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
