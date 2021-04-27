const Box = require("../../models/Box");
const AdminLogs = require("../../models/AdminLogs");

// GET
// Csomagolás létrehozás oldal betöltése
exports.getAddBox = async (req, res, next) => {
  res.render("box/edit-box", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

// POST
// Csomagolás létrehozása
exports.postAddBox = async (req, res, next) => {
  const sku = req.body.sku;
  const price = req.body.price;
  if (sku.length == 0 || price.length == 0) {
    return res.redirect("/admin/box-index");
  }

  try {
    await Box.create({
      restaurantId: req.admin.id,
      price: price,
      sku: sku,
    });
    res.redirect("/admin/box-index");
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

// GET
// Csomagolás szerkesztés oldal betöltése
exports.getEditBox = async (req, res, next) => {
  const editMode = req.query.edit;
  const boxId = req.params.boxId;

  await Box.findByPk(boxId).then((box) => {
    if (!box || !editMode) {
      return res.redirect("/");
    }
  });
  try {
    const box = await Box.findAll({
      where: {
        id: boxId,
        restaurantId: req.admin.id,
      },
    });
    res.render("box/edit-box", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      box: box,
      boxId: boxId,
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

// POST
// Csomagolás szerkesztése
exports.postEditBox = async (req, res, next) => {
  const sku = req.body.sku;
  const price = req.body.price;
  const boxId = req.body.boxId;
  if (price.length == 0 || boxId.length == 0 || sku.length == 0) {
    return res.redirect("/admin/box-index");
  }

  try {
    await Box.update(
      { price: price, sku: sku },
      { where: { id: boxId, restaurantId: req.admin.id } }
    );
    res.redirect("/admin/box-index");
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};
