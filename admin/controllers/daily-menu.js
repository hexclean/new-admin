const fileHelper = require("../../util/file");
const Product = require("../../models/Product");
const Variant = require("../../models/Variant");
const ProductTranslation = require("../../models/ProductTranslation");
const ProductFinal = require("../../models/ProductFinal");
const Sequelize = require("sequelize");
const Allergen = require("../../models/Allergen");
const ProductHasAllergen = require("../../models/ProductHasAllergen");
const ProductVariants = require("../../models/Variant");
const AllergenTranslation = require("../../models/AllergenTranslation");
const Category = require("../../models/Category");
const CategoryTranslation = require("../../models/CategoryTranslation");
const Box = require("../../models/Box");
const { getLanguageCode } = require("../../shared/language");

// GET
// Termék létrehozás oldal betöltése
exports.getAddDailyMenu = async (req, res, next) => {
  const languageCode = getLanguageCode(req.cookies.language);
  let restaurantId = req.admin.id;
  try {
    // Étteremhez rendelt allergének lekérése
    const allergen = await Allergen.findAll({
      where: {
        restaurantId: restaurantId,
      },
      include: [
        {
          model: AllergenTranslation,
          where: { languageId: languageCode },
        },
      ],
    });

    // Étteremhez rendelt csomagolások lekérése
    const box = await Box.findAll({
      where: {
        restaurantId: restaurantId,
      },
    });

    // Étteremhez rendelt kategóriák lekérése
    const cat = await Category.findAll({
      where: {
        restaurantId: restaurantId,
      },
      include: [
        {
          model: CategoryTranslation,
          where: { languageId: languageCode },
        },
      ],
    });

    // Étteremhez rendelt variánsok lekérése
    const variant = await Variant.findAll({
      where: {
        restaurantId: restaurantId,
      },
    });

    // Le kell ellenőrizni, hogy az étteremnek legalább 2 hozzárendelt variánsa van-e
    if (variant.length < 2) {
      return res.redirect("/admin/daily-menu");
    }

    // Le kell ellenőrizni, hogy az étteremnek legalább 2 hozzárendelt csomagolása van-e
    if (box.length < 2) {
      return res.redirect("/admin/daily-menu");
    }

    // Átadom az adatokat a html oldalnak
    res.render("daily-menu/edit-daily-menu", {
      pageTitle: "Add Product",
      path: "/admin/add-product",
      editing: false,
      ext: variant,
      cat: cat,
      boxArray: box,
      allergenArray: allergen,
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};
// POST
// Termék létrehozása
exports.postAddDailyMenuProduct = async (req, res, next) => {
  // Változók deklarálása
  const allergenId = req.body.allergenId;
  const restaurantId = req.admin.id;
  var filteredStatus = req.body.status.filter(Boolean);
  const roTitle = req.body.roTitle;
  const huTitle = req.body.huTitle;
  const enTitle = req.body.enTitle;
  const boxId = req.body.boxId;
  const price = req.body.price;
  const roDescription = req.body.roDescription;
  const huDescription = req.body.huDescription;
  const enDescription = req.body.enDescription;
  const extId = req.body.extraId;
  const filteredStatusAllergen = req.body.statusAllergen.filter(Boolean);
  const filteredStatusBox = req.body.statusBox.filter(Boolean);
  const image = req.file;
  const imageUrl = image.path;
  let productId;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;

  // Szerver validáció, ha üresek a mezők vissza irányít a termék lista oldalra
  if (
    roTitle.length == 0 ||
    allergenId.length == 0 ||
    filteredStatus.length == 0 ||
    huTitle.length == 0 ||
    enTitle.length == 0 ||
    price.length == 0 ||
    roDescription.length == 0 ||
    huDescription.length == 0 ||
    enDescription.length == 0 ||
    extId.length == 0 ||
    filteredStatusAllergen.length == 0 ||
    filteredStatusBox.length == 0
  ) {
    return res.redirect("/admin/daily-menu");
  }
  try {
    // Étteremhez rendelt csomagolások lekérése
    const box = await Box.findAll({
      where: {
        restaurantId: restaurantId,
      },
    });

    // Étteremhez rendelt allergének lekérése
    const allergen = await Allergen.findAll({
      where: {
        restaurantId: restaurantId,
      },
      include: [
        {
          model: AllergenTranslation,
        },
      ],
    });

    // Étteremhez rendelt variánsok lekérése
    const variant = await Variant.findAll({
      where: {
        restaurantId: restaurantId,
      },
    });

    // Termék létrehozása
    async function createProduct() {
      const product = await Product.create({
        productImagePath: imageUrl,
        active: 1,
        isDailyMenu: 1,
        upsell: 1,
        restaurantId: restaurantId,
        startTime: startDate,
        endTime: endDate,
        soldOut: 0,
      });
      productId = product.id;

      await ProductTranslation.create({
        title: roTitle,
        languageId: 1,
        description: roDescription,
        productId: productId,
      });

      await ProductTranslation.create({
        title: huTitle,
        languageId: 2,
        description: huDescription,
        productId: productId,
      });

      await ProductTranslation.create({
        title: enTitle,
        languageId: 3,
        description: enDescription,
        productId: productId,
      });
    }

    // 1. Először megnézem, hogy melyik doboz van bejelölve
    // 2. A ProductFinal táblába elmentem a létrehozott terméket hozzárendelve a dobozt és az összes variánst -
    // (amelyik variáns be van jelölve azt a ProductFinal active oszlopba 1-el a többit 0-val mentődik)
    async function createProductFinal() {
      let boxIdFinal = 0;
      for (let i = 0; i < box.length; i++) {
        if (filteredStatusBox[i] == "on") {
          boxIdFinal = filteredStatusBox[i].substring(2) + boxId[i];
        }
      }

      for (let i = 0; i < variant.length; i++) {
        await ProductFinal.create({
          price: price[i] || 0,
          productId: productId,
          variantId: extId[i],
          discountedPrice: 0,
          active: filteredStatus[i] == "on" ? 1 : 0,
          boxId: Number.isInteger(boxIdFinal) ? null : boxIdFinal,
        });
      }
    }

    // Elmentődik a termékhez hozzárendelt allergén -
    // (amelyik allergén be van jelölve azt a ProductHasAllergen active oszlopba 1-el a többit 0-val mentődik)
    async function allergens() {
      for (let i = 0; i <= allergen.length - 1; i++) {
        await ProductHasAllergen.create({
          productId: productId,
          allergenId: allergenId[i],
          active: filteredStatusAllergen[i] == "on" ? 1 : 0,
          restaurantId: restaurantId,
        });
      }
    }

    // Csak akkor lesz látható a kategória, amikor legalább 1 termék hozzá van rendelve
    async function setAvaiableCategory() {
      await Category.update(
        {
          active: 1,
        },
        {
          where: {
            id: req.body.categoryId,
          },
        }
      );
    }

    await createProduct();
    await createProductFinal();
    await allergens();
    await setAvaiableCategory();

    res.redirect("/admin/daily-menu"),
      {
        ext: variant,
      };
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

// GET
// Termék szerkesztés oldal betöltése
exports.getEditDailyMenu = async (req, res, next) => {
  // Változók deklarálása
  const restaurantId = req.admin.id;
  const editMode = req.query.edit;
  const prodId = req.params.productId;
  const productId = [prodId];
  const Op = Sequelize.Op;
  let getProductPrice = [];
  const languageCode = getLanguageCode(req.cookies.language);
  try {
    // Ha a termék nem az étteremhez tartozik, akkor automatikusan visszairányít a termékek oldalra
    await Product.findByPk(prodId).then((product) => {
      if (!product || !editMode) {
        return res.redirect("/admin/products");
      }
    });

    // Étteremhez rendelt kategóriák lekérése
    const cat = await Category.findAll({
      where: {
        restaurantId: restaurantId,
      },
      include: [
        {
          model: CategoryTranslation,
          where: { languageId: languageCode },
        },
      ],
    });

    // Étteremhez rendelt csomagolások lekérése
    const box = await Box.findAll({
      where: {
        restaurantId: restaurantId,
      },
    });

    // Étteremhez rendelt allergének lekérése
    const allergen = await Allergen.findAll({
      where: {
        restaurantId: restaurantId,
      },
      include: [
        {
          model: AllergenTranslation,
          where: { languageId: languageCode },
        },
        {
          model: ProductHasAllergen,
          where: {
            productId: { [Op.in]: productId },
            restaurantId: restaurantId,
          },
        },
      ],
    });

    // Az összes variáns lekérése. A választható variáns listában jelennek meg
    const prodVariant = await ProductVariants.findAll({
      where: {
        restaurantId: restaurantId,
      },
      include: [
        {
          model: ProductFinal,
        },
      ],
    });

    // ProductFinal táblából lekérem azokat a variánsokat, amelyek az aktuális termékhez tartoznak (árak kiíratása végett)
    let productFinal = await ProductFinal.findAll({
      where: {
        productId: {
          [Op.in]: productId,
        },
      },
    });

    // Ebből a lekérdezésből megtudom, hogy a termék melyik kategóriában tartozik és ezáltal a lenyíló lista automatikusan beállítódik az aktuálisra
    const getCurrentCategory = await Product.findAll({
      where: {
        id: prodId,
        restaurantId: restaurantId,
      },
      include: [
        {
          model: ProductTranslation,
        },
        {
          model: ProductFinal,
          where: { active: 1 },
          include: [
            {
              model: Variant,
            },
          ],
        },
      ],
    });

    // Ebből a lekérdezésből kiíratódnak a jelenlegi árak
    const product = await Product.findAll({
      where: {
        id: prodId,
        restaurantId: restaurantId,
      },
      include: [
        {
          model: ProductTranslation,
        },
        {
          model: ProductFinal,
          include: [
            {
              model: Variant,
            },
          ],
        },
      ],
    });

    for (let i = 0; i < product.length; i++) {
      getProductPrice = product[i].ProductFinals;
    }

    res.render("daily-menu/edit-daily-menu", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      currentCat: getCurrentCategory[0].ProductFinals[0].Variant.categoryId,
      allergenArray: allergen,
      product: product,
      variantIdByParams: prodId,
      cat: cat,
      productIds: prodId,
      productId: prodId,
      ext: productFinal,
      netest: getProductPrice,
      boxArray: box,
      productVariant: prodVariant,
      boxEnabled: productFinal,
      extTranslations: product[0].productTranslations,
      isActive: product[0].allergen,
      isActiveVariant: productFinal,
      startDateFin: product[0].startTime,
      endDateFin: product[0].endTime,
    });
  } catch (err) {
    console.log(err);
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

// POST
// Termék szerkesztése
exports.postEditDailyMenu = async (req, res, next) => {
  // Változók deklarálása
  let restaurantId = req.admin.id;
  const prodId = req.body.productId;
  const varId = req.body.variantIdUp;
  const allergenId = req.body.allergenId;
  const filteredStatusBox = req.body.statusBox.filter(Boolean);
  const boxId = req.body.boxId;
  const filteredStatusAllergen = req.body.statusAllergen.filter(Boolean);
  const updatedRoTitle = req.body.roTitle;
  const updatedHuTitle = req.body.huTitle;
  const updatedEnTitle = req.body.enTitle;
  const updatedRoDesc = req.body.roDescription;
  const updatedHuDesc = req.body.huDescription;
  const updatedEnDesc = req.body.enDescription;
  const updatedExtraPrice = req.body.price;
  const image = await req.file;
  const filteredStatus = req.body.status.filter(Boolean);
  const Op = Sequelize.Op;
  const productArray = [prodId];
  let boxIdFinal = 0;
  let startDate = req.body.startDate;
  let endTime = req.body.endDate;

  // Étteremhez rendelt csomagolások lekérése
  const box = await Box.findAll({
    where: {
      restaurantId: restaurantId,
    },
  });

  // Termékhez hozzárendelt allergének lekérése
  const productHasAllergen = await ProductHasAllergen.findAll({
    where: {
      productId: {
        [Op.in]: productArray,
      },
    },
  });

  // Variánsok lekérdezése
  const variants = await ProductVariants.findAll({
    where: {
      restaurantId: restaurantId,
    },
    include: [
      {
        model: ProductFinal,
      },
    ],
  });

  try {
    async function updateProduct() {
      // Ha nem az étteremhez tartozik, akkor átirányítódik a termékek listára
      await Product.findByPk(prodId).then(async (product) => {
        // Ha új kép töltődik fel akkor megkeresi a régi képet azt kitörli és feltölti az újonnan létrehozott képet
        if (image) {
          fileHelper.deleteFile(product.productImagePath);
          await Product.update(
            {
              productImagePath: image.path,
            },
            { where: { id: prodId } }
          );
        } else {
          await Product.update(
            {
              startTime: startDate,
              endTime: endTime,
            },
            { where: { id: prodId } }
          );
        }
      });

      await ProductTranslation.update(
        {
          title: updatedRoTitle,
          description: updatedRoDesc,
        },
        { where: { productId: prodId, languageId: 1 } }
      );

      await ProductTranslation.update(
        {
          title: updatedHuTitle,
          description: updatedHuDesc,
        },
        { where: { productId: prodId, languageId: 2 } }
      );

      await ProductTranslation.update(
        {
          title: updatedEnTitle,
          description: updatedEnDesc,
        },
        { where: { productId: prodId, languageId: 3 } }
      );
    }

    async function updateProductFinal() {
      const Op = Sequelize.Op;

      // A kijelölt csomagolás megkeresése
      for (let i = 0; i < box.length; i++) {
        if (filteredStatusBox[i] == "on") {
          boxIdFinal = filteredStatusBox[i].substring(2) + boxId[i];
        }
      }

      // ProductFinal táblában frissítésre kerül a felületen módosított változások (ár, variáns, csomagolás)
      for (let i = 0; i < variants.length; i++) {
        let variIds = [varId[i]];
        let prodIds = [prodId];
        await ProductFinal.update(
          {
            price: updatedExtraPrice[i] || 0,
            discountedPrice: updatedExtraPrice[i] || 0,
            active: filteredStatus[i] == "on" ? 1 : 0,
            boxId: Number.isInteger(boxIdFinal) ? null : boxIdFinal,
          },
          {
            where: {
              variantId: {
                [Op.in]: variIds,
              },
              productId: {
                [Op.in]: prodIds,
              },
            },
          }
        );
      }
    }

    async function updateAllergens() {
      const Op = Sequelize.Op;
      // Változtatott hozzárendelt allergének frissítése
      for (let i = 0; i <= productHasAllergen.length - 1; i++) {
        let productIds = [allergenId[i]];
        let productId = [prodId];
        await ProductHasAllergen.update(
          {
            active: filteredStatusAllergen[i] == "on" ? 1 : 0,
          },
          {
            where: {
              restaurantId: req.admin.id,
              allergenId: {
                [Op.in]: productIds,
              },
              productId: {
                [Op.in]: productId,
              },
            },
          }
        );
      }
    }
    await updateProduct();
    await updateProductFinal();
    await updateAllergens();

    res.redirect("/admin/daily-menu");
  } catch (err) {
    console.log(err);
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

// POST
// Termék inaktiválása
exports.postDeleteProduct = async (req, res, next) => {
  const prodId = req.body.productId;
  try {
    async function inactivateProduct() {
      await Product.findByPk(prodId).then((product) => {
        if (!product) {
          return next(new Error("Product not found."));
        }
        product.soldOut = 1;
        product.active = 0;
        return product.save();
      });
    }
    await inactivateProduct();
    res.redirect("/admin/daily-menu");
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};
