const Box = require("../../models/Box");
const BoxTranslation = require("../../models/BoxTranslation");
const AdminLogs = require("../../models/AdminLogs");

exports.getAddBox = async (req, res, next) => {
  await AdminLogs.create({
    restaurant_id: req.admin.id,
    operation_type: "GET",
    description: "Opened the box creation page",
    route: "getAddBox",
  });
  res.render("box/edit-box", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
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
    });
    await BoxTranslation.create({
      name: huName,
      languageId: 2,
      boxId: box.id,
    });

    await BoxTranslation.create({
      name: enName,
      languageId: 3,
      boxId: box.id,
    });
  }
  await AdminLogs.create({
    restaurant_id: req.admin.id,
    operation_type: "POST",
    description: `Box created with ${box.id} id.
    Box Translations: ro: ${roName}, hu: ${huName}, en: ${enName}, price: ${price}
    `,
    route: "postAddBox",
  });

  createBox()
    .then((result) => {
      res.redirect("/admin/box-index");
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
  let languageCode;
  if (!editMode) {
    return res.redirect("/");
  }

  await Box.findByPk(boxId).then((box) => {
    if (!box) {
      return res.redirect("/");
    }
  });

  if (req.cookies.language == "ro") {
    languageCode = 1;
  } else if (req.cookies.language == "hu") {
    languageCode = 2;
  } else {
    languageCode = 3;
  }

  const boxName = await Box.findAll({
    where: { restaurantId: req.admin.id, id: boxId },
    include: [
      {
        model: BoxTranslation,
        where: { languageId: languageCode },
      },
    ],
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
    .then(async (box) => {
      await AdminLogs.create({
        restaurant_id: req.admin.id,
        operation_type: "GET",
        description: `Opened edit box with ${boxId} id`,
        route: "getEditBox",
      });
      if (box[0].restaurantId !== req.admin.id) {
        return res.redirect("/");
      }

      res.render("box/edit-box", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        cat: box,
        boxId: boxId,
        boxTranslations: box[0].BoxTranslations,
        boxName: boxName,
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

        await AdminLogs.create({
          restaurant_id: req.admin.id,
          operation_type: "POST",
          description: `Box updated with ${boxId} id.
          Box Translations: ro: ${updatedRoName}, hu: ${updatedHuName}, en: ${updatedEnName}, price: ${updatedEnName}
          `,
          route: "postEditBox",
        });
      }

      updateBox();
      res.redirect("/admin/box-index");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
