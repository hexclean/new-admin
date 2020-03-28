const fileHelper = require("../../util/file");
const { validationResult } = require("express-validator/check");
const Coupon = require("../../models/Coupon");

exports.getAddCoupon = (req, res, next) => {
  res.render("coupon/edit-coupon", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    hasError: false,
    errorMessage: null,
    validationErrors: []
  });
};

exports.postAddCoupon = async (req, res, next) => {
  const name = req.body.name;
  const discount = req.body.discount;
  //   if (!image) {
  //     return res.status(422).render("admin/edit-product", {
  //       pageTitle: "Add Product",
  //       path: "/admin/add-product",
  //       editing: false,
  //       hasError: true,
  //       coupon: [
  //         {
  //           name: name,

  //           discount: discount
  //         }
  //       ],
  //       errorMessage: "Attached file is not an image.",
  //       validationErrors: []
  //     });
  //   }
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).render("coupon/edit-coupon", {
      pageTitle: "Add Product",
      path: "/admin/add-product",
      editing: false,
      hasError: true,
      coupon: {
        name: name,
        discount: discount
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array()
    });
  }

  await Coupon.create({
    adminId: req.admin,
    discount: discount,
    name: name
  })
    .then(result => {
      console.log("Created Product");
      res.redirect("/admin/discount-list");
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

// exports.getEditProduct = (req, res, next) => {
//   const editMode = req.query.edit;
//   if (!editMode) {
//     return res.redirect("/");
//   }
//   const prodId = req.params.productId;
//   Product.findById(prodId)
//     .then(product => {
//       if (!product) {
//         return res.redirect("/");
//       }
//       res.render("admin/edit-product", {
//         pageTitle: "Edit Product",
//         path: "/admin/edit-product",
//         editing: editMode,
//         product: product,
//         hasError: false,
//         errorMessage: null,
//         validationErrors: []
//       });
//     })
//     .catch(err => {
//       const error = new Error(err);
//       error.httpStatusCode = 500;
//       return next(error);
//     });
// };

// exports.postEditProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   // Title
//   const updatedRoTitle = req.body.roTitle;
//   const updatedHuTitle = req.body.huTitle;
//   const updatedEnTitle = req.body.enTitle;
//   // Category
//   const updatedRoCategory = req.body.roCategory;
//   const updatedHuCategory = req.body.huCategory;
//   const updatedEnCategory = req.body.enCategory;
//   // Description
//   const updatedRoDesc = req.body.roDescription;
//   const updatedHuDesc = req.body.huDescription;
//   const updatedEnDesc = req.body.enDescription;
//   //
//   const updatedPrice = req.body.price;
//   const image = req.file;
//   const errors = validationResult(req);

//   if (!errors.isEmpty()) {
//     return res.status(422).render("admin/edit-product", {
//       pageTitle: "Edit Product",
//       path: "/admin/edit-product",
//       editing: true,
//       hasError: true,
//       product: [
//         {
//           title: { en: updatedEnTitle, hu: updatedHuTitle, ro: updatedRoTitle },
//           price: updatedPrice,
//           description: {
//             en: updatedEnDesc,
//             hu: updatedHuDesc,
//             ro: updatedRoDesc
//           },
//           category: {
//             en: updatedEnCategory,
//             hu: updatedHuCategory,
//             ro: updatedRoCategory
//           },
//           _id: prodId
//         }
//       ],
//       errorMessage: errors.array()[0].msg,
//       validationErrors: errors.array()
//     });
//   }

//   Product.findById(prodId)
//     .then(product => {
//       if (product.adminId.toString() !== req.admin._id.toString()) {
//         return res.redirect("/");
//       }
//       product.title = {
//         en: updatedEnTitle,
//         hu: updatedHuTitle,
//         ro: updatedRoTitle
//       };
//       product.price = updatedPrice;
//       product.category = {
//         en: updatedEnCategory,
//         hu: updatedHuCategory,
//         ro: updatedRoCategory
//       };
//       product.description = {
//         en: updatedEnDesc,
//         hu: updatedHuDesc,
//         ro: updatedRoDesc
//       };
//       if (image) {
//         fileHelper.deleteFile(product.imageUrl);
//         product.imageUrl = image.path;
//       }
//       return product.save().then(result => {
//         console.log("UPDATED PRODUCT!");
//         res.redirect("/admin/products");
//       });
//     })
//     .catch(err => {
//       const error = new Error(err);
//       error.httpStatusCode = 500;
//       return next(error);
//     });
// };

exports.getCoupons = (req, res, next) => {
  Coupon.find({ adminId: req.admin._id })
    .then(coupon => {
      var currentLanguage = req.cookies.language;
      res.render("coupon/coupon-list", {
        cp: coupon,
        currentLanguage: currentLanguage,
        pageTitle: "Admin Products",
        path: "/admin/products"
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

// exports.postDeleteProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   Product.findById(prodId)
//     .then(product => {
//       if (!product) {
//         return next(new Error("Product not found."));
//       }
//       fileHelper.deleteFile(product.imageUrl);
//       return Product.deleteOne({ _id: prodId, adminId: req.admin._id });
//     })
//     .then(() => {
//       console.log("DESTROYED PRODUCT");
//       res.redirect("/admin/products");
//     })
//     .catch(err => {
//       const error = new Error(err);
//       error.httpStatusCode = 500;
//       return next(error);
//     });
// };
