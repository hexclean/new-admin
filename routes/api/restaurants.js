const express = require("express");
const router = express.Router();
const Sequelize = require("sequelize");

const sequelize = require("../../util/database");

router.get("/:locationName/:restaurantName", async (req, res) => {
  const locationName = req.params.locationName;
  const languageCode = 2;
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
      FROM foodnet.admins AS ad
      INNER JOIN foodnet.adminInfos AS adInf
      ON adInf.adminId = ad.id
      INNER JOIN foodnet.locations AS loc
      ON ad.id = loc.adminId
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

router.get("/:locationName/:prestaurantName/products", async (req, res) => {
  const locationName = req.params.locationName.split("-").join(" ");
  const languageCode = 2;
  const restaurantName = req.params.prestaurantName.split("-").join(" ");
  return sequelize
    .query(
      `SELECT ad.id AS restaurant_id, ad.fullName as restaurant_name, adInf.shortCompanyDesc AS restaurant_description, ad.deliveryPrice AS restaurant_deliveryPrice, adInf.kitchen AS restaurant_kitchen
      FROM foodnet.admins as ad
      INNER JOIN foodnet.adminInfos AS adInf
      ON adInf.adminId = ad.id
      INNER JOIN foodnet.adminLocations AS adLoc
      ON ad.id = adLoc.adminId
      INNER JOIN foodnet.adminLocationTranslations AS locTrans
      ON locTrans.adminLocationsId = adLoc.id
      WHERE locTrans.languageId= ${languageCode} AND ad.fullName LIKE '%${restaurantName}%' AND adInf.languageId=${languageCode} AND locTrans.name LIKE '%${locationName}%';`,
      { type: Sequelize.QueryTypes.SELECT }
    )
    .then((results) => {
      return res.json(results);
    });
});

router.get("/search", async (req, res) => {
  return sequelize
    .query(
      `SELECT  *
      FROM foodnet.admins as ad
      INNER JOIN foodnet.adminHomeSearches as sc
      ON ad.id = sc.adminId
      INNER JOIN foodnet.adminHomeSearchTranslations as sctrans
      ON sc.id = sctrans.adminHomeSearchId
      where sctrans.languageId =2 and sctrans.active=1`,
      { type: Sequelize.QueryTypes.SELECT }
    )
    .then((results) => {
      console.log("ez hivodik meg a kereso listanak");
      return res.json(results);
    });
});

router.get("/list/:locationName", async (req, res) => {
  const params = req.params.locationName;
  const languageCode = 2;
  return sequelize
    .query(
      `SELECT ad.fullName as restaurant_name, adInf.shortCompanyDesc AS restaurant_description, ad.deliveryPrice AS restaurant_deliveryPrice, adInf.kitchen AS restaurant_kitchen
      FROM foodnet.admins as ad
      INNER JOIN foodnet.adminInfos AS adInf
      ON adInf.adminId = ad.id
      INNER JOIN foodnet.adminLocations AS adLoc
      ON ad.id = adLoc.adminId
      INNER JOIN foodnet.adminLocationTranslations AS locTrans
      ON locTrans.adminLocationsId = adLoc.id
      where locTrans.languageId =${languageCode} and adInf.languageId=${languageCode} and locTrans.name LIKE '%${params}%'
      `,
      { type: Sequelize.QueryTypes.SELECT }
    )
    .then((results) => {
      return res.json(results);
    });
});

module.exports = router;
