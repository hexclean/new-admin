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
  let languageCode;

  if (req.cookies.language == "ro") {
    languageCode = 1;
  } else if (req.cookies.language == "hu") {
    languageCode = 2;
  } else {
    languageCode = 3;
  }
  let items = [];
  if (!editMode) {
    return res.redirect("/");
  }

  await Property.findByPk(propertyId).then((property) => {
    if (!property) {
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
        where: { languageId: languageCode },
      },
    ],
    include: [
      {
        model: PropertyValue,
        where: { propertyId: propertyId },
        include: [
          {
            model: PropertyValueTranslation,
            where: { languageId: languageCode },
          },
        ],
      },
    ],
  });
  let arrayLength = [];
  for (let i = 0; i < propValue.length; i++) {
    arrayLength = propValue[i].PropertyValues;
    console.log(arrayLength.length);
    for (let j = 0; j <= arrayLength.length - 1; j++) {
      const item = {
        id: propValue[i].id,
        name: arrayLength[j].PropertyValueTranslations.name,
        propertyValueId: arrayLength[j].id,
        languageId: arrayLength[j].languageId,
      };
      items.push(item);
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
        where: { languageId: languageCode },
      },
    ],
  })
    .then(async (property) => {
      if (property[0].restaurantId !== req.admin.id) {
        return res.redirect("/");
      }
      console.log(items);
      res.render("property/edit-property", {
        pageTitle: "Edit Product",
        items: items,
        path: "/admin/edit-product",
        editing: editMode,
        prop: property,
        propertyId: propertyId,
        propTrans: property[0].PropertyTranslations,
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
  let finalLengthOfVaTran = prodVarTransId.length / 3;

  Property.findAll({
    where: { restaurantId: req.admin.id, id: propertyId },
    include: [
      {
        model: PropertyTranslation,
      },
    ],
  })
    .then((property) => {
      async function createPropertyV() {
        for (let i = 0; i < finalLengthOfVaTran; i++) {
          const updatedName = req.body.updatedName;
          let array = [];
          const propVroName = req.body["updatedName"];
          const prodVarTransId = req.body["prodVarTransId"];
          const prodVarTransLangId = req.body["prodVarTransLanguageId"];
          array.push(prodVarTransId);
          console.log(req.body);
          await PropertyTranslation.update(
            { name: propVroName[i] },
            { where: { languageId: prodVarTransLangId[i] } }
          );

          await PropertyTranslation.update(
            { name: propVroName[i] },
            { where: { languageId: prodVarTransLangId[i] } }
          );

          await PropertyTranslation.update(
            { name: propVroName[i] },
            { where: { languageId: prodVarTransLangId[i] } }
          );
        }
      }

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

      updateProperty();
      // createPropertyV();
      res.redirect("/admin/box-index");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
