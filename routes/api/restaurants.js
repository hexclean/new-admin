const express = require("express");
const router = express.Router();
const Sequelize = require("sequelize");
const Restaurant = require("../../models/Restaurant");
const Location = require("../../models/Location");
const LocationName = require("../../models/LocationName");
const LocationNameTransalation = require("../../models/LocationNameTranslation");
const RestaurantFilters = require("../../models/RestaurantFilters");
const RestaurantDescription = require("../../models/AdminInfo");
const RestaurantReview = require("../../models/RestaurantsReviews");
const sequelize = require("../../util/database");
const { Op } = require("sequelize");

router.get("/:lang/:locationName/:restaurantName", async (req, res) => {
  let lang = req.params.lang;
  if (lang == "ro") {
    languageCode = 1;
  } else if (lang == "hu") {
    languageCode = 2;
  } else if (lang == "en") {
    languageCode = 3;
  } else {
    languageCode = 1;
  }
  const locationName = req.params.locationName;
  const restaurantName = req.params.restaurantName.split("-").join(" ");

  try {
    const profileData = await sequelize.query(
      `SELECT ad.id AS restaurant_id, ad.fullName as restaurant_name, ad.coverUrl AS restaurant_coverImage,
      ad.imageUrl AS restaurant_profileImage,
      ad.avgTransport AS restaurant_avgDeliveryTime, ad.commission AS restaurant_commission,
      ad.phoneNumber AS restaurant_phoneNumber, ad.deliveryPrice AS restaurant_deliveryPrice,
      ad.avgTransport AS restaurant_avgTransportTime,
      ad.minimumOrderUser AS restaurant_minimumOrderUser, ad.minimumOrderSubscriber AS restaurant_minimumOrderPro,
      adInf.adress AS restaurant_adress,
      adInf.shortCompanyDesc AS restaurant_description, ad.deliveryPrice AS restaurant_deliveryPrice, adInf.kitchen AS restaurant_kitchen
      FROM foodnet.restaurants AS ad
      INNER JOIN foodnet.adminInfos AS adInf
      ON adInf.restaurantId = ad.id
      INNER JOIN foodnet.locations AS loc
      ON ad.id = loc.restaurantId
      INNER JOIN foodnet.locationNames AS locName
      ON loc.locationNameId = locName.id
      INNER JOIN foodnet.locationNameTranslations as locNameTrans
      ON locName.id = locNameTrans.locationNameId
      WHERE locNameTrans.languageId= ${languageCode} AND ad.fullName LIKE '%${restaurantName}%'
       AND adInf.languageId=${languageCode} AND locNameTrans.name LIKE '%${locationName}%';`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    if (profileData.length == 0) {
      return res
        .status(404)
        .json({ msg: "This restaurant isn't located in this town" });
    }
    res.json(profileData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get(
  "/:lang/:locationName/:restaurantName/products",
  async (req, res) => {
    let lang = req.params.lang;
    if (lang == "ro") {
      languageCode = 1;
    } else if (lang == "hu") {
      languageCode = 2;
    } else if (lang == "en") {
      languageCode = 3;
    } else {
      languageCode = 1;
    }
    const locationName = req.params.locationName.split("-").join(" ");
    const restaurantName = req.params.restaurantName.split("-").join(" ");
    return sequelize
      .query(
        `SELECT ad.id AS restaurant_id, ad.fullName as restaurant_name, adInf.shortCompanyDesc AS restaurant_description, ad.deliveryPrice AS restaurant_deliveryPrice, adInf.kitchen AS restaurant_kitchen
      FROM foodnet.restaurants as ad
      INNER JOIN foodnet.adminInfos AS adInf
      ON adInf.restaurantId = ad.id
      INNER JOIN foodnet.adminLocations AS adLoc
      ON ad.id = adLoc.restaurantId
      INNER JOIN foodnet.adminLocationTranslations AS locTrans
      ON locTrans.adminLocationsId = adLoc.id
      WHERE locTrans.languageId= ${languageCode} AND ad.fullName LIKE '%${restaurantName}%' AND adInf.languageId=${languageCode} AND locTrans.name LIKE '%${locationName}%';`,
        { type: Sequelize.QueryTypes.SELECT }
      )
      .then((results) => {
        return res.json(results);
      });
  }
);

module.exports = router;
