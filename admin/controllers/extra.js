const fileHelper = require("../../util/file");
const { validationResult } = require("express-validator/check");
const Extra = require("../../models/Extra");
const ExtraTranslation = require("../../models/ExtraTranslation");

exports.getAddExtra = (req, res, next) => {
  res.render("extra/edit-extra", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    hasError: false,
    errorMessage: null,
    validationErrors: [],
  });
};

exports.postAddExtra = async (req, res, next) => {
  const roName = req.body.roName;
  const huName = req.body.huName;
  const enName = req.body.enName;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).render("extra/edit-extra", {
      pageTitle: "Add Product",
      path: "/admin/add-product",
      editing: false,
      hasError: true,
      extra: {
        roName: roName,
        huName: huName,
        enName: enName,
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
    });
  }

  const extra = await req.admin.createExtra();

  async function extraTransaltion() {
    await ExtraTranslation.create({
      name: roName,
      languageId: 1,
      extraId: extra.id,
      adminId: req.admin.id,
    });
    await ExtraTranslation.create({
      name: huName,
      languageId: 2,
      adminId: req.admin.id,

      extraId: extra.id,
    });

    await ExtraTranslation.create({
      name: enName,
      languageId: 3,
      extraId: extra.id,
      adminId: req.admin.id,
    });
  }

  extraTransaltion()
    .then((result) => {
      console.log(extra.id);

      res.redirect("/admin/vr-index");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getExtras = (req, res, next) => {
  Extra.findAll({ where: { adminId: req.admin.id } })
    .then((extra) => {
      var currentLanguage = req.cookies.language;
      res.render("extra/extras", {
        ext: extra,
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

exports.getEditExtra = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const extId = req.params.extraId;

  Extra.findAll({
    where: {
      id: extId,
    },
    include: [
      {
        model: ExtraTranslation,
      },
    ],
  })
    .then((extra) => {
      for (let i = 0; i < extra[0].extraTranslations.length; i++) {
        console.log(
          "extra[0].extraTranslations[i].id",
          extra[0].extraTranslations[i].id
        );
      }

      // console.log(extra[0].extraTranslations);
      // console.log(extra[0].extraTranslations);
      if (extra[0].adminId != req.admin.id) {
        return res.redirect("/");
      }
      // console.log("extraTranslation[0]:", extra[0].extraTranslations[0].id);
      res.render("extra/edit-extra", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        extra: extra,
        hasError: false,
        errorMessage: null,
        validationErrors: [],
        extTranslations: extra[0].extraTranslations,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postEditExtra = async (req, res, next) => {
  const extId = req.params.extraId;
  const updatedRoName = req.body.roName;
  const updatedHuName = req.body.huName;
  const updatedEnName = req.body.enName;
  const extTranId = req.body.extTranId;
  Extra.findAll({
    // where: {
    //   id: extId,
    // },
    include: [
      {
        model: ExtraTranslation,
      },
    ],
  })
    .then((extra) => {
      // console.log(extra.extraTranslations);
      // console.log("req.admin.id:", req.admin.id);
      // if (extra.adminId != req.admin.id) {
      //   return res.redirect("/");
      // }
      async function msg() {
        await ExtraTranslation.update(
          { name: updatedRoName },
          { where: { id: extTranId[0], languageId: 1 } }
        );

        await ExtraTranslation.update(
          { name: updatedHuName },
          { where: { id: extTranId[1], languageId: 2 } }
        );

        await ExtraTranslation.update(
          { name: updatedEnName },
          { where: { id: extTranId[2], languageId: 3 } }
        );
        console.log("Message:");
      }
      msg();
      console.log("extTranId[0]", extTranId[0]);
      console.log("extTranId[1]", extTranId[1]);
      console.log("extTranId[2]", extTranId[2]);
      console.log("RO", updatedRoName);
      console.log("HU", updatedHuName);
      console.log("EN", updatedEnName);

      // let ids = [1, 2, 3];
      // console.log("extra/Translation[0]:", extra[0].extraTranslations[0].id);
      // extra[0].extraTranslations.id;
      // ExtraTranslation.update({ name: updatedRoName }, { where: { id: ids } });
      // console.log("extraTranslation[0]:", extra[0].extraTranslations);
      // extra.name[0] = updatedRoName;
      // extra.name[1] = updatedHuName;
      // extra.name[2] = updatedEnName;
      // return extra.save().then((result) => {
      //   console.log("UPDATED PRODUCT!");
      res.redirect("/admin/vr-index");
      // });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getProducts = (req, res, next) => {
  req.user
    .getProducts()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => console.log(err));
};

const getProductsByUserFilter = async (userFilters) => {
  const { filters, categoryId, perPage, offset, orderBy } = userFilters;

  let sql =
    `SELECT * FROM foodnet.extras as ex
    JOIN foodnet.extraTranslations as ext
   ON ex.id = ext.extraId
     join foodnet.languages as lan
   ON ext.languageId = lan.id
    where ex.adminId =` +
    req.admin.id +
    `1 AND ext.extraId =` +
    extId +
    `;`;

  const products = await Product.findAll({
    where: {
      id: productIds,
      enabled: ENABLED,
    },
    attributes: ["image", "id", "name", "seoName", "categoryId"],
    include: [
      {
        attributes: ["seoUrl"],
        model: Category,
        as: "category",
      },
      {
        attributes: ["rating"],
        model: ProductRating,
      },
      {
        model: ProductType,
        attributes: ["id", "name", "price", "discount"],
        include: [
          {
            attributes: ["image"],
            model: ProductImage,
          },
        ],
      },
    ],
  });
  return { products: products, totalCount: totalCount.length };
};
