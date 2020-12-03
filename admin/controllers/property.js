const Property = require("../../models/Property");
const PropertyTranslation = require("../../models/PropertyTranslation");
const Restaurant = require("../../models/Restaurant");
const PropertyValue = require("../../models/PropertyValue");
const PropertyValueTranslation = require("../../models/PropertyValueTranslation");
const Language = require("../../models/Language");
const AdminLogs = require("../../models/AdminLogs");

exports.getAddProperty = async (req, res, next) => {
  //   await AdminLogs.create({
  //     restaurant_id: req.admin.id,
  //     operation_type: "GET",
  //     description: "Opened the box creation page",
  //     route: "getAddBox",
  //   });
  res.render("property/edit-property", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProperty = async (req, res, next) => {
  const roName = req.body.roName;
  const huName = req.body.huName;
  const enName = req.body.enName;

  const property = await Property.create({
    restaurantId: req.admin.id,
  });

  async function createProperty() {
    await PropertyTranslation.create({
      name: roName,
      languageId: 1,
      propertyId: property.id,
    });
    await PropertyTranslation.create({
      name: huName,
      languageId: 2,
      propertyId: property.id,
    });

    await PropertyTranslation.create({
      name: enName,
      languageId: 3,
      propertyId: property.id,
    });
  }
  const propertyValue = await PropertyValue.create({
    restaurantId: req.admin.id,
    propertyId: property.id,
  });

  async function createPropertyV() {
    const propVName = req.body.propVName;
    for (let i = 1; i <= propVName.length; i++) {
      const propVroName = req.body["propVroName" + i];
      const propVhuName = req.body["propVhuName" + i];
      const propVenName = req.body["propVenName" + i];

      await PropertyValueTranslation.create({
        name: propVroName,
        languageId: 1,
        propertyValueId: propertyValue.id,
      });
      await PropertyValueTranslation.create({
        name: propVhuName,
        languageId: 2,
        propertyValueId: propertyValue.id,
      });

      await PropertyValueTranslation.create({
        name: propVenName,
        languageId: 3,
        propertyValueId: propertyValue.id,
      });
    }
  }

  createProperty()
    .then((result) => {
      createPropertyV();
      res.redirect("/admin/box-index");
    })
    .catch((err) => {
      console.log(err);
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getEditProperty = async (req, res, next) => {
  const editMode = req.query.edit;
  const propertyId = req.params.propertyId;

  if (!editMode) {
    return res.redirect("/");
  }

  await Property.findByPk(propertyId).then((property) => {
    if (!property) {
      return res.redirect("/");
    }
  });
  let propValArr = [];
  const propValue = await Property.findAll({
    where: {
      id: propertyId,
      restaurantId: req.admin.id,
    },
    include: [
      {
        model: PropertyTranslation,
      },
    ],
    include: [
      {
        model: PropertyValue,
        where: { propertyId: propertyId },
        include: [
          {
            model: PropertyValueTranslation,
            where: { languageId: 1 },
          },
        ],
      },
    ],
  });
  for (let i = 0; i < propValue.length; i++) {
    //   let newArr = propValue[i].PropertyValues[i].PropertyValueTranslations;
    //   let counter = newArr.length;
    const items = [];
    // console.log(
    //   "newArr.length",
    //   propValue[i].PropertyValues[i].PropertyValueTranslations.length
    // );
    // for (let d of propValue) {
    let arrayLength = propValue[i].PropertyValues[i].PropertyValueTranslations;
    for (let j = 0; j <= arrayLength.length - 1; j++) {
      console.log(arrayLength[j].name);

      const item = {
        id: arrayLength[j].id,
        name: arrayLength[j].name,
        propertyValueId: arrayLength[j].propertyValueId,
        languageId: arrayLength[j].languageId,
      };

      items.push(item);
      console.log(items);
    }
  }

  await Property.findAll({
    where: {
      id: propertyId,
      restaurantId: req.admin.id,
    },
    include: [
      {
        model: PropertyTranslation,
      },
    ],
  })
    .then(async (property) => {
      // console.log(property[0].PropertyValues);
      // await AdminLogs.create({
      //   restaurant_id: req.admin.id,
      //   operation_type: "GET",
      //   description: `Opened edit box with ${boxId} id`,
      //   route: "getEditBox",
      // });
      if (property[0].restaurantId !== req.admin.id) {
        return res.redirect("/");
      }

      res.render("property/edit-property", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        prop: property,
        propertyId: propertyId,
        // boxTranslations: box[0].BoxTranslations,
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
          Box Translations: ro: ${updatedRoName}, hu: ${updatedHuName}, en: ${updatedEnName}, price: ${price}
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
