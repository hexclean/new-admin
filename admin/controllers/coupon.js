const CouponCode = require("../../models/CouponCode");

exports.getAddCoupon = (req, res, next) => {
  res.render("coupon/edit-coupon", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    hasError: false,
    errorMessage: null,
    validationErrors: [],
  });
};

exports.postAddCoupon = async (req, res, next) => {
  try {
    const roName = req.body.roName;
    const huName = req.body.huName;
    const enName = req.body.enName;
    const price = req.body.price;

    const coupon = await CouponCode.create({
      adminId: req.admin.id,
      price: price,
    });

    res.redirect("/");
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

exports.getEditCoupon = async (req, res, next) => {
  const editMode = req.query.edit;
  const boxId = req.params.boxId;

  if (!editMode) {
    return res.redirect("/");
  }

  await Box.findByPk(boxId).then((box) => {
    if (!box) {
      return res.redirect("/");
    }
  });

  await Box.findAll({
    where: {
      id: boxId,
      adminId: req.admin.id,
    },
    include: [
      {
        model: BoxTranslation,
      },
    ],
  })
    .then((box) => {
      if (box[0].adminId !== req.admin.id) {
        return res.redirect("/");
      }

      res.render("box/edit-box", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        cat: box,
        boxId: boxId,
        boxTranslations: box[0].boxTranslations,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postEditCoupon = async (req, res, next) => {
  const updatedRoName = req.body.roName;
  const updatedHuName = req.body.huName;
  const updatedEnName = req.body.enName;
  const price = req.body.price;
  const boxId = req.body.boxId;
  const boxTranslationsId = req.body.boxTranslationsId;

  Box.findAll({
    where: { adminId: req.admin.id },
    include: [
      {
        model: BoxTranslation,
      },
    ],
  })
    .then((category) => {
      async function updateBox() {
        await Box.update({ price: price }, { where: { id: boxId } });
        await BoxTranslation.update(
          { name: updatedRoName },
          { where: { id: boxTranslationsId[0], languageId: 1 } }
        );

        await BoxTranslation.update(
          { name: updatedHuName },
          { where: { id: boxTranslationsId[1], languageId: 2 } }
        );

        await BoxTranslation.update(
          { name: updatedEnName },
          { where: { id: boxTranslationsId[2], languageId: 3 } }
        );
      }
      updateBox();
      res.redirect("/");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
