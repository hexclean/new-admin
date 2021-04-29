const Box = require("../../models/Box");

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
  // Változók deklarálása
  const sku = req.body.sku;
  const price = req.body.price;
  const restaurantId = req.body.id;
  if (sku.length == 0 || price.length == 0) {
    return res.redirect("/admin/box-index");
  }

  try {
    // Csomagolás létrehozása
    await Box.create({
      restaurantId: restaurantId,
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
  const restaurantId = req.admin.id;

  // Ha nem az étteremhez tartozik, akkor visszairányít a csomagolás listára
  await Box.findByPk(boxId).then((box) => {
    if (!box || !editMode) {
      return res.redirect("/");
    }
  });

  try {
    // Csomagolás keresése
    const box = await Box.findAll({
      where: {
        id: boxId,
        restaurantId: restaurantId,
      },
    });

    // Az adatokat átadom a html fájlnak
    res.render("box/edit-box", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      box: box,
      boxId: boxId,
    });
  } catch (err) {
    console.log(err);
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
  const restaurantId = req.body.id;

  // Szerver oldali validáció
  if (price.length == 0 || boxId.length == 0 || sku.length == 0) {
    return res.redirect("/admin/box-index");
  }

  try {
    // Csomagolás frissítése
    await Box.update(
      { price: price, sku: sku },
      { where: { id: boxId, restaurantId: restaurantId } }
    );

    res.redirect("/admin/box-index");
  } catch (err) {
    console.log(err);
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};
