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
  let productDescriptionRo;
  let productDescriptionHu;
  let productDescriptionEn;

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

  async function getproductTitRo() {
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

  async function getproductTitHu() {
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

  async function getproductTitEn() {
    for (let i = 0; i < productTitEn.length; i++) {
      productTitleEnView = productTitEn[i].productTranslations[0].title;
    }
  }

  // const partnerAdressRo = await Partners.findAll({
  //   where: { id: partId },
  //   include: [
  //     {
  //       model: PartnersTranslation,
  //       where: { languageId: 1 },
  //     },
  //   ],
  // });

  // async function getPartnerAdressRo() {
  //   for (let i = 0; i < partnerAdressRo.length; i++) {
  //     partnerAdressRoView = partnerAdressRo[i].adminInfos[0].adress;
  //   }
  // }

  // const partnerAdressHu = await Partners.findAll({
  //   where: { id: partId },
  //   include: [
  //     {
  //       model: PartnersTranslation,
  //       where: { languageId: 2 },
  //     },
  //   ],
  // });

  // async function getPartnerAddressHu() {
  //   for (let i = 0; i < partnerAdressHu.length; i++) {
  //     partnerAdressHuView = partnerAdressHu[i].adminInfos[0].adress;
  //   }
  // }

  // const partnerAdressEn = await Partners.findAll({
  //   where: { id: partId },
  //   include: [
  //     {
  //       model: PartnersTranslation,
  //       where: { languageId: 3 },
  //     },
  //   ],
  // });

  // async function getPartnerAddressEn() {
  //   for (let i = 0; i < partnerAdressEn.length; i++) {
  //     partnerAdressEnView = partnerAdressEn[i].adminInfos[0].adress;
  //   }
  // }

  Products.findAll({
    where: { id: prodId },
    include: [
      {
        model: ProductsTranslation,
      },
    ],
  })
    .then((product) => {
      getproductTitRo();
      getproductTitHu();
      getproductTitEn();
      // getPartnerAdressRo();
      // getPartnerAddressHu();
      // getPartnerAddressEn();
      res.render("super-admin/products/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        productId: prodId,
        product: product,

        productTitleRoView: productTitleRoView,
        productTitleHuView: productTitleHuView,
        productTitleEnView: productTitleEnView,

        // partnerAdressRoView: partnerAdressRoView,
        // partnerAdressHuView: partnerAdressHuView,
        // partnerAdressEnView: partnerAdressEnView,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

// exports.postEditPartner = async (req, res, next) => {
//   const partId = req.body.partnerId;
//   // Title
//   const fullName = req.body.fullName;
//   const phoneNumber = req.body.phoneNumber;
//   const email = req.body.email;
//   const commission = req.body.commission;
//   const open = req.body.open;
//   const close = req.body.close;

//   const partnerShortDescRoView = req.body.partnerShortDescRoView;
//   const partnerShortDescHuView = req.body.partnerShortDescHuView;
//   const partnerShortDescEnView = req.body.partnerShortDescEnView;

//   const addressRo = req.body.addressRo;
//   const addressHu = req.body.addressHu;
//   const addressEn = req.body.addressEn;

//   Partners.findAll({
//     include: [
//       {
//         model: PartnersTranslation,
//       },
//     ],
//   })
//     .then((result) => {
//       async function updateLocationName() {
//         await Partners.update(
//           {
//             fullName: fullName,
//             phoneNumber: phoneNumber,
//             email: email,
//             commission: commission,
//             open: open,
//             close: close,
//             partnerShortDescRoView: partnerShortDescRoView,
//             partnerShortDescHuView: partnerShortDescHuView,
//             partnerShortDescEnView: partnerShortDescEnView,
//           },
//           { where: { id: partId } }
//         );

//         await PartnersTranslation.update(
//           {
//             shortCompanyDesc: partnerShortDescRoView,
//             adress: addressRo,
//           },
//           { where: { adminId: partId, languageId: 1 } }
//         );

//         await PartnersTranslation.update(
//           {
//             shortCompanyDesc: partnerShortDescHuView,
//             adress: addressHu,
//           },
//           { where: { adminId: partId, languageId: 2 } }
//         );

//         await PartnersTranslation.update(
//           {
//             shortCompanyDesc: partnerShortDescEnView,
//             adress: addressEn,
//           },
//           { where: { adminId: partId, languageId: 3 } }
//         );
//       }
//       updateLocationName();
//       console.log(req.body);
//       res.redirect("/super-admin/partners");
//     })
//     .catch((err) => {
//       const error = new Error(err);
//       error.httpStatusCode = 500;
//       return next(error);
//     });
// };
