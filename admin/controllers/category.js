const Category = require("../../models/Category");
const CategoryTranslation = require("../../models/CategoryTranslation");
const Allergen = require("../../models/Allergen");
const Property = require("../../models/Property");
const PropertyValue = require("../../models/PropertyValue");
const PropertyTranslation = require("../../models/PropertyTranslation");
const PropertyValueTranslation = require("../../models/PropertyValueTranslation");
const Sequelize = require("sequelize");
const CategoryProperty = require("../../models/CategoryProperty");

const Op = Sequelize.Op;
exports.getAddCategory = async (req, res, next) => {
  let languageCode;

  if (req.cookies.language == "ro") {
    languageCode = 1;
  } else if (req.cookies.language == "hu") {
    languageCode = 2;
  } else {
    languageCode = 3;
  }

  const checkAllergenLength = await Allergen.findAll({
    where: {
      restaurantId: req.admin.id,
    },
  });
  const property = await Property.findAll({
    where: {
      restaurantId: req.admin.id,
    },
    include: [
      {
        model: PropertyTranslation,
        where: {
          languageId: languageCode,
        },
      },
    ],
  });

  if (checkAllergenLength.length === 0) {
    return res.redirect("/admin/category-index");
  }
  if (property.length < 2) {
    return res.redirect("/admin/category-index");
  }
  res.render("category/edit-category", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    property: property,
  });
};
exports.getOrderCategory = async (req, res, next) => {
  const category = await Category.findAll({
    where: { restaurantId: req.admin.id },
    include: [{ model: CategoryTranslation, where: { languageId: 1 } }],
  });
  // console.log(category);
  // const property77 = await Property.findAll({
  //   where: {
  //     restaurantId: req.admin.id,
  //   },
  //   include: [
  //     {
  //       model: PropertyTranslation,
  //       where: {
  //         languageId: 1,
  //       },
  //     },
  //   ],
  //   include: [
  //     {
  //       model: PropertyValue,
  //       where: { propertyId: 1 },
  //       include: [
  //         {
  //           model: PropertyValueTranslation,
  //           where: { languageId: 1 },
  //         },
  //       ],
  //     },
  //   ],
  // });

  res.render("category/order-category", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    category: category,
    // property: property,
  });
};
exports.postOrderCategory = async (req, res, next) => {
  const alma = req.body.alma;
  let newTest = [alma];
  const categoryId = req.body.categoryId;
  // const roName = req.body.roName;
  // const huName = req.body.huName;
  // const enName = req.body.enName;
  // const filteredStatus = req.body.status.filter(Boolean);
  // const propertyId = req.body.propertyId;

  // if (roName == "" || huName == "" || enName == "") {
  //   return res.redirect("/admin/category-index");
  // }
  try {
    async function cc() {
      for (let i = 0; i < newTest.length; i++) {
        let categoryId = [req.body.categoryId];
        let testId = categoryId[i];
        console.log("testId", testId);
        console.log(newTest);
        await Category.update(
          {
            order: newTest[i],
          },
          {
            where: {
              restaurantId: req.admin.id,
              // id: {
              //   [Op.in]: testId[i],
              // },
            },
          }
        );
      }
    }
    cc();
  } catch (error) {
    console.log(error);
  }

  // try {
  //   async function createExtraTranslation() {
  //     const category = await Category.create({
  //       restaurantId: req.admin.id,
  //     });

  //     await CategoryTranslation.create({
  //       name: roName,
  //       languageId: 1,
  //       categoryId: category.id,
  //       restaurantId: req.admin.id,
  //     });

  //     await CategoryTranslation.create({
  //       name: huName,
  //       languageId: 2,
  //       categoryId: category.id,
  //       restaurantId: req.admin.id,
  //     });

  //     await CategoryTranslation.create({
  //       name: enName,
  //       languageId: 3,
  //       categoryId: category.id,
  //       restaurantId: req.admin.id,
  //     });

  //     for (let i = 0; i <= filteredStatus.length - 1; i++) {
  //       await CategoryProperty.create({
  //         categoryId: category.id,
  //         propertyId: propertyId[i],
  //         active: filteredStatus[i] == "on" ? 1 : 0,
  //         restaurantId: req.admin.id,
  //       });
  //     }
  //   }

  //   createExtraTranslation();
  //   res.redirect("/admin/category-index");
  // } catch (err) {
  //   const error = new Error(err);
  //   error.httpStatusCode = 500;
  //   return next(error);
  // }
};
exports.postAddCategory = async (req, res, next) => {
  const roName = req.body.roName;
  const huName = req.body.huName;
  const enName = req.body.enName;
  const filteredStatus = req.body.status.filter(Boolean);

  const propertyId = req.body.propertyId;
  if (roName == "" || huName == "" || enName == "") {
    return res.redirect("/admin/category-index");
  }

  try {
    async function createExtraTranslation() {
      const category = await Category.create({
        restaurantId: req.admin.id,
        active: 0,
      });

      await CategoryTranslation.create({
        name: roName,
        languageId: 1,
        categoryId: category.id,
        restaurantId: req.admin.id,
      });

      await CategoryTranslation.create({
        name: huName,
        languageId: 2,
        categoryId: category.id,
        restaurantId: req.admin.id,
      });

      await CategoryTranslation.create({
        name: enName,
        languageId: 3,
        categoryId: category.id,
        restaurantId: req.admin.id,
      });

      for (let i = 0; i <= filteredStatus.length - 1; i++) {
        await CategoryProperty.create({
          categoryId: category.id,
          propertyId: propertyId[i],
          active: filteredStatus[i] == "on" ? 1 : 0,
          restaurantId: req.admin.id,
        });
      }
    }

    createExtraTranslation();
    res.redirect("/admin/category-index");
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

exports.getEditCategory = async (req, res, next) => {
  const editMode = req.query.edit;
  const categoryId = req.params.categoryId;

  if (!editMode) {
    return res.redirect("/");
  }

  await Category.findByPk(categoryId).then((category) => {
    if (!category || category.restaurantId != req.admin.id) {
      return res.redirect("/");
    }
  });

  const isActiveProperty = await CategoryProperty.findAll({
    where: { restaurantId: req.admin.id, categoryId: categoryId },
  });

  const property = await Property.findAll({
    where: {
      restaurantId: req.admin.id,
    },
    include: [
      {
        model: PropertyTranslation,
        where: {
          languageId: 1,
        },
      },
    ],
  });
  try {
    await Category.findAll({
      where: {
        id: categoryId,
        restaurantId: req.admin.id,
      },
      include: [
        {
          model: CategoryTranslation,
        },
      ],
    }).then((category) => {
      res.render("category/edit-category", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        category: category,
        categoryId: categoryId,
        extTranslations: category[0].CategoryTranslations,
        isActiveProperty: isActiveProperty,
        property: property,
      });
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

exports.postEditCategory = async (req, res, next) => {
  const categoryId = req.body.categoryId;
  const updatedRoName = req.body.roName;
  const updatedHuName = req.body.huName;
  const updatedEnName = req.body.enName;
  const categoryTranslationId = req.body.categoryTranslationId;
  const filteredStatus = req.body.status.filter(Boolean);
  const propertyId = req.body.propertyId;

  if (
    updatedRoName == "" ||
    updatedHuName == "" ||
    updatedEnName == "" ||
    categoryTranslationId == ""
  ) {
    return res.redirect("/admin/category-index");
  }
  const isActiveProperty = await CategoryProperty.findAll({
    where: { restaurantId: req.admin.id, categoryId: categoryId },
  });

  try {
    Category.findAll({
      where: { restaurantId: req.admin.id },
      include: [
        {
          model: CategoryTranslation,
        },
      ],
    }).then(async (result) => {
      await CategoryTranslation.update(
        { name: updatedRoName },
        { where: { id: categoryTranslationId[0], languageId: 1 } }
      );

      await CategoryTranslation.update(
        { name: updatedHuName },
        { where: { id: categoryTranslationId[1], languageId: 2 } }
      );

      await CategoryTranslation.update(
        { name: updatedEnName },
        { where: { id: categoryTranslationId[2], languageId: 3 } }
      );
    });
    async function updateExtraHasAllergen() {
      if (Array.isArray(isActiveProperty)) {
        for (let i = 0; i <= isActiveProperty.length - 1; i++) {
          let propertyIds = [propertyId[i]];

          await CategoryProperty.update(
            {
              active: filteredStatus[i] == "on" ? 1 : 0,
            },
            {
              where: {
                categoryId: categoryId,
                restaurantId: req.admin.id,
                propertyId: {
                  [Op.in]: propertyIds,
                },
              },
            }
          );
        }
      }
    }
    updateExtraHasAllergen();
    res.redirect("/admin/category-index");
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};
