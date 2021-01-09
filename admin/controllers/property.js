const Property = require("../../models/Property");
const PropertyTranslation = require("../../models/PropertyTranslation");
const Restaurant = require("../../models/Restaurant");
const PropertyValue = require("../../models/PropertyValue");
const PropertyValueTranslation = require("../../models/PropertyValueTranslation");
const Language = require("../../models/Language");
const AdminLogs = require("../../models/AdminLogs");
const ProductTranslation = require("../../models/ProductTranslation");
const Categories = require("../../models/Category");
const CategoryProperty = require("../../models/CategoryProperty");

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

  async function createPropertyV() {
    const propVName = req.body.propVName;

    for (let i = 1; i <= propVName.length; i++) {
      const propVroName = req.body["propVroName" + i];
      const propVhuName = req.body["propVhuName" + i];
      const propVenName = req.body["propVenName" + i];

      const propertyValue = await PropertyValue.create({
        restaurantId: req.admin.id,
        propertyId: property.id,
      });

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

  async function add() {
    const categories = await Categories.findAll({
      where: { restaurantId: req.admin.id },
    });

    for (let i = 0; i < categories.length; i++) {
      let categoriesId = [];
      let propertyId = [];

      categoriesId = categories[i].id;
      propertyId = property.id;
      if (categories.length != 0) {
        await CategoryProperty.create({
          restaurantId: req.admin.id,
          propertyId: propertyId,
          categoryId: categoriesId,
          active: 0,
        });
      }
    }
  }

  createProperty()
    .then((result) => {
      createPropertyV();
      add();
      res.redirect("/admin/property-index");
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
  let items = [];
  await Property.findByPk(propertyId).then((property) => {
    if (!property || !editMode) {
      return res.redirect("/");
    }
  });

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
          },
        ],
      },
    ],
  });
  console.log(propValue[0].id);
  for (let i = 0; i < propValue.length; i++) {
    let arrayLength = propValue[i].PropertyValues;
    for (let s = 0; s < arrayLength.length; s++) {
      let arrayLengthNew = arrayLength[s].PropertyValueTranslations;
      for (let y = 0; y < arrayLengthNew.length; y++) {
        const item = {
          id: arrayLengthNew[y].id,
          name: arrayLengthNew[y].name,
          propertyValueId: arrayLengthNew[y].propertyValueId,
          languageId: arrayLengthNew[y].languageId,
        };
        items.push(item);
      }
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
      res.render("property/edit-property", {
        pageTitle: "Edit Product",
        items: items,
        path: "/admin/edit-product",
        editing: editMode,
        prop: property,
        propertyId: propertyId,
        propTrans: property[0].PropertyTranslations,
        propertyId: propValue[0].id,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postEditProperty = async (req, res, next) => {
  const updatedRoName = req.body.roName;
  const updatedHuName = req.body.huName;
  const updatedEnName = req.body.enName;
  const propertyId = req.body.propertyId;
  const propTransId = req.body.propTransId;
  let prodVarTransId = [];
  prodVarTransId = req.body.prodVarTransId;

  Property.findAll({
    where: { restaurantId: req.admin.id, id: propertyId },
    include: [
      {
        model: PropertyTranslation,
      },
    ],
  })
    .then((property) => {
      async function updateProperty() {
        await PropertyTranslation.update(
          { name: updatedRoName },
          { where: { id: propTransId[0], languageId: 1 } }
        );

        await PropertyTranslation.update(
          { name: updatedHuName },
          { where: { id: propTransId[1], languageId: 2 } }
        );

        await PropertyTranslation.update(
          { name: updatedEnName },
          { where: { id: propTransId[2], languageId: 3 } }
        );
      }
      let propVName = req.body.propVName;
      if (propVName != undefined) {
        async function createPropertyV() {
          for (let i = 1; i <= propVName.length; i++) {
            const propVroName = req.body["propVroName" + i];
            const propVhuName = req.body["propVhuName" + i];
            const propVenName = req.body["propVenName" + i];

            const propertyValue = await PropertyValue.create({
              restaurantId: req.admin.id,
              propertyId: req.body.propertyId,
            });

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
        createPropertyV();
      }
      updateProperty();

      res.redirect("/admin/property-index");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
