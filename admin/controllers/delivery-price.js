const LocationName = require("../../models/LocationName");
const LocationNameTranslation = require("../../models/LocationNameTranslation");
const DeliveryPrice = require("../../models/DeliveryPrice");

exports.getEditDeliveryPrice = async (req, res, next) => {
  const editMode = req.query.edit;

  // await Box.findByPk(boxId).then((box) => {
  //   if (!box || !editMode) {
  //     return res.redirect("/");
  //   }
  // });
  let prices = [];
  await LocationName.findAll({
    include: [
      {
        model: LocationNameTranslation,
      },
      { model: DeliveryPrice, where: { restaurantId: req.admin.id } },
    ],
    // include: [{ model: DeliveryPrice }],
  })
    .then(async (price) => {
      for (let i = 0; i < price.length; i++) {
        let test = price[i].DeliveryPrices;
        for (let j = 0; j < test.length; j++) {
          console.log(test[j].delivery);
        }

        // for (let j=0; j<)
      }
      // console.log(price);
      res.render("delivery-price/edit-delivery-price", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        price: price,
        // boxId: boxId,
      });
    })
    .catch((err) => {
      console.log(err);
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postEditBox = async (req, res, next) => {
  const sku = req.body.sku;
  const price = req.body.price;
  const boxId = req.body.boxId;
  if (price.length == 0 || boxId.length == 0 || sku.length == 0) {
    return res.redirect("/admin/box-index");
  }

  Box.findAll({
    where: { restaurantId: req.admin.id },
  })
    .then(async (result) => {
      await Box.update({ price: price, sku: sku }, { where: { id: boxId } });

      res.redirect("/admin/box-index");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
