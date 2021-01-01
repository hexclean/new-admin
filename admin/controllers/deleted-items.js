const Products = require("../../models/Product");
const ProductsTranslation = require("../../models/ProductTranslation");
const ITEMS_PER_PAGE = 30;

exports.getIndex = async (req, res, next) => {
  res.render("deleted-items/index", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
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

  await Products.findAll({
    where: {
      restaurantId: req.admin.id,
      active: 0,
    },
    include: [
      {
        model: ProductsTranslation,
        where: { languageId: languageCode },
      },
    ],
  })
    .then((numProducts) => {
      totalItems = numProducts;
      return Products.findAll({
        where: {
          restaurantId: req.admin.id,
          active: 0,
        },
        include: [
          {
            model: ProductsTranslation,
            where: { languageId: languageCode },
          },
        ],
        offset: (page - 1) * ITEMS_PER_PAGE,
        limit: ITEMS_PER_PAGE,
      });
    })
    .then((products) => {
      console.log(products);
      res.render("deleted-items/deleted-products", {
        pageTitle: "Admin Products",
        path: "/admin/products",
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems.length,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItems.length / ITEMS_PER_PAGE),
        prod: products,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postRestoreProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Products.findByPk(prodId)
    .then((product) => {
      if (!product) {
        return next(new Error("Product not found."));
      }
      product.active = 1;
      return product.save().then((result) => {
        res.redirect("/admin/deleted-products");
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
