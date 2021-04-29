const Category = require("../../models/Category");
const CategoryTranslation = require("../../models/CategoryTranslation");
const Allergen = require("../../models/Allergen");
const Property = require("../../models/Property");
const PropertyTranslation = require("../../models/PropertyTranslation");
const Sequelize = require("sequelize");
const CategoryProperty = require("../../models/CategoryProperty");
const Op = Sequelize.Op;
const { getLanguageCode } = require("../../shared/language");

// GET
// Kategória létrehozás oldal betöltése
exports.getAddCategory = async (req, res, next) => {
  // Változók deklarálása
  const languageCode = getLanguageCode(req.cookies.language);
  const restaurantId = req.admin.id;

  // Lekérem az étterem alkategóriájit a validáció miatt
  const property = await Property.findAll({
    where: {
      restaurantId: restaurantId,
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

  // Le kell ellenőrizni, hogy az étteremnek legalább 2 hozzárendelt alkategóriája van-e
  if (property.length < 2) {
    return res.redirect("/admin/category-index");
  }
  // Az adatokat átadom a html fájlnak
  res.render("category/edit-category", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    property: property,
  });
};

// POST
// Kategória létrehozása
exports.postAddCategory = async (req, res, next) => {
  // Változók deklarálása
  const roName = req.body.roName;
  const huName = req.body.huName;
  const enName = req.body.enName;
  const filteredStatus = req.body.status.filter(Boolean);
  const propertyId = req.body.propertyId;
  let restaurantId = req.admin.id;
  let categoryId;

  // Szerver oldali validáció létrehozásra
  if (
    roName.length == 0 ||
    huName.length == 0 ||
    enName.length == 0 ||
    filteredStatus.length == 0
  ) {
    return res.redirect("/admin/category-index");
  }

  try {
    // Kategória létrehozása
    async function createCategory() {
      category = await Category.create({
        restaurantId: restaurantId,
        active: 0,
      });
      categoryId = category.id;

      await CategoryTranslation.create({
        name: roName,
        languageId: 1,
        categoryId: categoryId,
        restaurantId: restaurantId,
      });

      await CategoryTranslation.create({
        name: huName,
        languageId: 2,
        categoryId: categoryId,
        restaurantId: restaurantId,
      });

      await CategoryTranslation.create({
        name: enName,
        languageId: 3,
        categoryId: categoryId,
        restaurantId: restaurantId,
      });
    }

    // A CategoryProperty táblába elmentem az összes alkategórákat a saját státuszukkal
    async function createSubcategoryToCategory() {
      // Elmentem az összes alkategóriát. Amelyik be van jelölve az 1-essel mentődik a többi 0-val
      for (let i = 0; i <= filteredStatus.length - 1; i++) {
        await CategoryProperty.create({
          categoryId: categoryId,
          propertyId: propertyId[i],
          active: filteredStatus[i] == "on" ? 1 : 0,
          restaurantId: restaurantId,
        });
      }
    }

    await createCategory();
    await createSubcategoryToCategory();

    res.redirect("/admin/category-index");
  } catch (err) {
    console.log(err);
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

// GET
// Kategória szerkesztés oldal betöltése
exports.getEditCategory = async (req, res, next) => {
  const editMode = req.query.edit;
  const categoryId = req.params.categoryId;
  const languageCode = getLanguageCode(req.cookies.language);
  let restaurantId = req.admin.id;

  try {
    // Ha nem az étterem kategóriája, akkor visszairányítom a kategória listára
    await Category.findByPk(categoryId).then((category) => {
      if (!category || !editMode) {
        return res.redirect("/category-index");
      }
    });

    // Megkeresem a kijelölt alkategóriát
    const isActiveProperty = await CategoryProperty.findAll({
      where: { restaurantId: restaurantId, categoryId: categoryId },
    });

    // Lekérem az étterem alkategóriájit
    const property = await Property.findAll({
      where: {
        restaurantId: restaurantId,
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

    // Megkeresem a jelenlegi szerkeszteni kívánt kategóriát
    const category = await Category.findAll({
      where: {
        id: categoryId,
        restaurantId: restaurantId,
      },
      include: [
        {
          model: CategoryTranslation,
        },
      ],
    });

    // Átadom a lekért adatokat a html oldalnak
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
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

// POST
// Kategória szerkesztése
exports.postEditCategory = async (req, res, next) => {
  // Változók deklarálása
  const categoryId = req.body.categoryId;
  const updatedRoName = req.body.roName;
  const updatedHuName = req.body.huName;
  const updatedEnName = req.body.enName;
  const filteredStatus = req.body.status.filter(Boolean);
  const propertyId = req.body.propertyId;
  let restaurantId = req.admin.id;

  // Szerver oldali validáció létrehozásra
  if (
    updatedRoName.length == 0 ||
    updatedHuName.length == 0 ||
    updatedEnName.length == 0 ||
    categoryId.length == 0
  ) {
    return res.redirect("/admin/category-index");
  }

  // Megkeresem a kijelölt alkategóriát
  const isActiveProperty = await CategoryProperty.findAll({
    where: { restaurantId: restaurantId, categoryId: categoryId },
  });

  try {
    // Kategória szerkesztése
    async function updateCategory() {
      await CategoryTranslation.update(
        { name: updatedRoName },
        { where: { categoryId: categoryId, languageId: 1 } }
      );

      await CategoryTranslation.update(
        { name: updatedHuName },
        { where: { categoryId: categoryId, languageId: 2 } }
      );

      await CategoryTranslation.update(
        { name: updatedEnName },
        { where: { categoryId: categoryId, languageId: 3 } }
      );
    }

    // Elmenti a kijelölt alkategóriát 1-el a többit 0-val
    async function updateActiveSubcategory() {
      for (let i = 0; i < isActiveProperty.length; i++) {
        let propertyIds = [propertyId[i]];

        await CategoryProperty.update(
          {
            active: filteredStatus[i] == "on" ? 1 : 0,
          },
          {
            where: {
              categoryId: categoryId,
              restaurantId: restaurantId,
              propertyId: {
                [Op.in]: propertyIds,
              },
            },
          }
        );
      }
    }
    await updateCategory();
    await updateActiveSubcategory();

    res.redirect("/admin/category-index");
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};
