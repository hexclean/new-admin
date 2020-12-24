const express = require("express");
const router = express.Router();
const Sequelize = require("sequelize");
const sequelize = require("../../util/database");
const { Op } = require("sequelize");
const Variant = require("../../models/Variant");
const ProductFinal = require("../../models/ProductFinal");
const Products = require("../../models/Product");
const ProductTranslation = require("../../models/ProductTranslation");
const Category = require("../../models/Category");
const CategoryTranslation = require("../../models/CategoryTranslation");
const CategoryProperty = require("../../models/CategoryProperty");
const Property = require("../../models/Property");
const PropertyTranslation = require("../../models/PropertyTranslation");
const PropertyValues = require("../../models/PropertyValue");
const PropertyValueTranslations = require("../../models/PropertyValueTranslation");
const ProductHasAllergen = require("../../models/ProductHasAllergen");
const Allergen = require("../../models/Allergen");
const AllergenTranslation = require("../../models/AllergenTranslation");
const VariantPropertyValue = require("../../models/VariantPropertyValue");
const Box = require("../../models/Box");
const BoxTranslation = require("../../models/BoxTranslation");

const ProductVariantsExtras = require("../../models/ProductVariantsExtras");
const Extras = require("../../models/Extra");
const Restaurant = require("../../models/Restaurant");
const ExtraHasAllergen = require("../../models/ExtraHasAllergen");
const ExtraTranslation = require("../../models/ExtraTranslation");

router.get("/daily-menu", async (req, res) => {
  var categoryId = req.body.categoryId;
  const restaurantId = req.body.restaurantId;
  const lang = req.body.lang;
  const propertyValueId = req.body.propertyValueId;
  let languageCode;

  try {
    if (isNaN(categoryId)) {
      return res.json({
        status: 400,
        msg: "Something went wrong",
        result: [],
      });
    }

    if (categoryId == "") {
      return res.json({
        status: 200,
        msg: "Category is empty",
        result: [],
      });
    }

    if (lang == "ro") {
      languageCode = 1;
    } else if (lang == "hu") {
      languageCode = 2;
    } else if (lang == "en") {
      languageCode = 3;
    } else {
      return res.json({
        status: 404,
        msg: "Language not found",
        result: [],
      });
    }

    const resultsList = await Property.findAll({
      where: { id: propertyValueId, restaurantId: restaurantId },
      include: [
        {
          model: PropertyValues,
          include: [
            {
              model: PropertyValueTranslations,
              where: {
                languageId: languageCode,
                propertyValueId: propertyValueId,
              },
            },
            {
              model: VariantPropertyValue,
              where: { propertyValueId: propertyValueId },
              include: [
                {
                  model: Variant,
                  where: { categoryId: categoryId },
                  include: [
                    {
                      model: ProductFinal,
                      where: { active: 1 },
                      include: [
                        {
                          model: Products,

                          include: [
                            {
                              model: ProductTranslation,
                              // where: productName,
                              where: {
                                languageId: languageCode,
                                // productName,
                              },
                            },
                            {
                              model: ProductHasAllergen,
                              where: { active: 1 },
                              include: [
                                {
                                  model: Allergen,
                                  include: [
                                    {
                                      model: AllergenTranslation,
                                      where: { languageId: languageCode },
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });

    const resultWithAll = [];
    for (let i = 0; i < resultsList.length; i++) {
      console.log(resultsList[i]);
      let propVal = resultsList[i].PropertyValues[i].VariantPropertyValues;
      for (let j = 0; j < propVal.length; j++) {
        let productHasAllergen =
          propVal[j].Variant.ProductFinals[0].Product.ProductHasAllergens;
        for (let k = 0; k < productHasAllergen.length; k++) {
          let finalAllName = [];
          finalAllName =
            productHasAllergen[k].Allergen.AllergenTranslations[0].name;
          const items = {
            product_id: propVal[j].Variant.ProductFinals[0].productId,
            variant_id: propVal[j].Variant.id,
            product_name:
              propVal[j].Variant.ProductFinals[0].Product.ProductTranslations[0]
                .title,
            allergen_name: finalAllName,
            product_description:
              propVal[j].Variant.ProductFinals[0].Product.ProductTranslations[0]
                .description,
            product_price: propVal[j].Variant.ProductFinals[0].price,
            product_imageUrl:
              propVal[j].Variant.ProductFinals[0].Product.productImagePath,
          };
          resultWithAll.push(items);
        }
      }
    }

    const merged = resultWithAll.reduce(
      (
        r,
        {
          product_id,
          product_name,
          product_description,
          product_price,
          product_imageUrl,
          variant_id,
          ...rest
        }
      ) => {
        const key = `${product_id}-${variant_id}-${product_name}-${product_description}-${product_price}-${product_imageUrl}`;
        r[key] = r[key] || {
          product_id,
          variant_id,
          product_name,
          product_description,
          product_price,
          product_imageUrl,
          allergens_name: [],
        };
        r[key]["allergens_name"].push(rest);
        return r;
      },
      {}
    );

    const result = Object.values(merged);

    res.json({
      status: 200,
      msg: "Products list successfully listed",
      result,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: 500,
      msg: "Server error",
      result: [],
    });
  }
});

module.exports = router;
