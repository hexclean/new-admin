const Extras = require("../../../models/Extra");
const ExtrasTranslation = require("../../../models/ExtraTranslation");

exports.getExtras = (req, res, next) => {
  Extras.findAll({
    include: [
      {
        model: ExtrasTranslation,
      },
    ],
  })
    .then((extras) => {
      res.render("super-admin/extras/extras", {
        ext: extras,
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

exports.getEditExtra = async (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }

  let extraNameRoView;
  let extraNameHuView;
  let extraNameEnView;

  const extId = req.params.extraId;

  const extraNameRo = await Extras.findAll({
    where: { id: extId },
    include: [
      {
        model: ExtrasTranslation,
        where: { languageId: 1 },
      },
    ],
  });

  async function getExtraNameRo() {
    for (let i = 0; i < extraNameRo.length; i++) {
      extraNameRoView = extraNameRo[i].extraTranslations[0].name;
    }
  }

  const extraNameHu = await Extras.findAll({
    where: { id: extId },
    include: [
      {
        model: ExtrasTranslation,
        where: { languageId: 2 },
      },
    ],
  });

  async function getExtraNameHu() {
    for (let i = 0; i < extraNameHu.length; i++) {
      extraNameHuView = extraNameHu[i].extraTranslations[0].name;
    }
  }

  const extraNameEn = await Extras.findAll({
    where: { id: extId },
    include: [
      {
        model: ExtrasTranslation,
        where: { languageId: 3 },
      },
    ],
  });

  async function getExtraNameEn() {
    for (let i = 0; i < extraNameEn.length; i++) {
      extraNameEnView = extraNameEn[i].extraTranslations[0].name;
    }
  }

  Extras.findAll({
    where: { id: extId },
    include: [
      {
        model: ExtrasTranslation,
      },
    ],
  })
    .then((extra) => {
      getExtraNameRo();
      getExtraNameHu();
      getExtraNameEn();
      res.render("super-admin/extras/edit-extra", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        extraId: extId,
        extra: extra,

        extraNameRoView: extraNameRoView,
        extraNameHuView: extraNameHuView,
        extraNameEnView: extraNameEnView,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postEditExtra = async (req, res, next) => {
  const extId = req.body.extraId;

  // Description
  const extraNameRoView = req.body.extraNameRoView;
  const extraNameHuView = req.body.extraNameHuView;
  const extraNameEnView = req.body.extraNameEnView;

  Extras.findAll({
    include: [
      {
        model: ExtrasTranslation,
      },
    ],
  })
    .then((result) => {
      async function updateDailyMenuDescription() {
        await ExtrasTranslation.update(
          {
            name: extraNameRoView,
          },
          { where: { extraId: extId, languageId: 1 } }
        );

        await ExtrasTranslation.update(
          {
            name: extraNameHuView,
          },
          { where: { extraId: extId, languageId: 2 } }
        );

        await ExtrasTranslation.update(
          {
            name: extraNameEnView,
          },
          { where: { extraId: extId, languageId: 3 } }
        );
      }
      updateDailyMenuDescription();
      res.redirect("/super-admin/extras");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
