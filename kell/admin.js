const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false
  });
};

// exports.postAddProduct = (req, res, next) => {
// const title = req.body.title;
// const imageUrl = req.body.imageUrl;
// const preview = req.body.preview;
// const price = req.body.price;
// const description = req.body.description;
// const enabled = req.body.enabled;
// const category = req.body.category;
// const createDate = req.body.createDate;
//   const product = new Product({
// title: title,
// price: price,
// imageUrl: imageUrl,
// preview: preview,
// description: description,
// enabled: enabled,
// category: category,
// createDate: createDate
//   });
//   product
//     .save()
//     .then(result => {
//       console.log("Created Product");
//       res.redirect("/admin/products");
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const preview = req.body.preview;
  const price = req.body.price;
  const description = req.body.description;
  const enabled = req.body.enabled;
  const category = req.body.category;
  const createDate = req.body.createDate;
  req.user
    .createProduct({
      title: title,
      price: price,
      imageUrl: imageUrl,
      preview: preview,
      description: description,
      enabled: enabled,
      category: category,
      createDate: createDate
    })
    .then(result => {
      // console.log(result);
      console.log("Created Product");
      res.redirect("/admin/products");
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.findByPk(prodId)
    .then(product => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product
      });
    })
    .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedCategory = req.body.category;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  const updatedPreview = req.body.preview;
  const updatedEnabled = req.body.enabled;
  const updatedDate = req.body.createDate;
  Product.findByPk(prodId)
    .then(product => {
      product.title = updatedTitle;
      product.preview = updatedPreview;
      product.enabled = updatedEnabled;
      product.price = updatedPrice;
      product.description = updatedDesc;
      product.imageUrl = updatedImageUrl;
      product.category = updatedCategory;
      product.createDate = updatedDate;

      return product.save();
    })
    .then(result => {
      console.log("UPDATED PRODUCT!");
      res.redirect("/admin/products");
    })
    .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products"
      });
    })
    .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
    .then(product => {
      return product.destroy();
    })
    .then(result => {
      console.log("DESTROYED PRODUCT");
      res.redirect("/admin/products");
    })
    .catch(err => console.log(err));
};
