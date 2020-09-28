const Box = require("../../models/Box");
const BoxTranslation = require("../../models/BoxTranslation");

exports.getAddBox = (req, res, next) => {
  res.render("box/edit-box", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    hasError: false,
    errorMessage: null,
    validationErrors: [],
  });
};

exports.postAddBox = async (req, res, next) => {
  const roName = req.body.roName;
  const huName = req.body.huName;
  const enName = req.body.enName;
  const price = req.body.price;
  const box = await Box.create({
    restaurantId: req.admin.id,
    price: price,
  });

  async function createBox() {
    await BoxTranslation.create({
      name: roName,
      languageId: 1,
      boxId: box.id,
      restaurantId: req.admin.id,
    });
    await BoxTranslation.create({
      name: huName,
      languageId: 2,
      restaurantId: req.admin.id,
      boxId: box.id,
    });

    await BoxTranslation.create({
      name: enName,
      languageId: 3,
      boxId: box.id,
      restaurantId: req.admin.id,
    });
  }

  createBox()
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getEditBox = async (req, res, next) => {
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
      restaurantId: req.admin.id,
    },
    include: [
      {
        model: BoxTranslation,
      },
    ],
  })
    .then((box) => {
      if (box[0].restaurantId !== req.admin.id) {
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

exports.postEditBox = async (req, res, next) => {
  const updatedRoName = req.body.roName;
  const updatedHuName = req.body.huName;
  const updatedEnName = req.body.enName;
  const price = req.body.price;
  const boxId = req.body.boxId;
  const boxTranslationsId = req.body.boxTranslationsId;

  Box.findAll({
    where: { restaurantId: req.admin.id },
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
