const express = require("express");
const router = express.Router();
const Sequelize = require("sequelize");

const sequelize = require("../../util/database");

// @route    GET api/location/:locationName
// @desc     Get all restaurants from selected city
// @access   Public
router.get("/:locationName", async (req, res) => {
  try {
    const locationName = req.params.locationName.split("-").join(" ");
    console.log("loc", locationName);
    const languageCode = 2;
    const selectedLocation = await sequelize.query(
      `SELECT ad.id AS restaurant_id, ad.imageUrl AS restaurant_profileImage, ad.commission AS restaurant_commission,
      ad.fullName AS restaurant_name, ad.newRestaurant AS restaurant_new, ad.discount AS restaurant_discount,
       adInf.shortCompanyDesc AS restaurant_description,
      ad.deliveryPrice AS restaurant_deliveryPrice, adInf.kitchen AS restaurant_kitchen
      FROM foodnet.admins AS ad
      INNER JOIN foodnet.adminInfos AS adInf
      ON adInf.adminId = ad.id
      INNER JOIN foodnet.locations AS loc
      ON ad.id = loc.adminId
      INNER JOIN foodnet.locationNames AS locName
      ON loc.locationNameId = locName.id
      INNER JOIN foodnet.locationNameTranslations as locNameTrans
      ON locName.id = locNameTrans.locationNameId
      WHERE locNameTrans.languageId= ${languageCode} AND adInf.languageId=${languageCode} AND locNameTrans.name LIKE '%${locationName}%';`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (selectedLocation.length == 0) {
      return res.status(404).json({ msg: "City not found" });
    }

    res.json(selectedLocation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/location/targu-mures
// @desc     Get all restaurants from Marosvásárhely (HOME)
// @access   Public
router.get("/targu-mures", async (req, res) => {
  const vasarhely = "Targu Mures";
  const languageCode = 2;

  try {
    const locationTarguMures = await sequelize.query(
      `SELECT ad.id AS restaurant_id, ad.imageUrl AS restaurant_profileImage, ad.commission AS restaurant_commission,
      ad.fullName AS restaurant_name, ad.newRestaurant AS restaurant_new, ad.discount AS restaurant_discount,
       adInf.shortCompanyDesc AS restaurant_description,
      ad.deliveryPrice AS restaurant_deliveryPrice, adInf.kitchen AS restaurant_kitchen
      FROM foodnet.admins AS ad
      INNER JOIN foodnet.adminInfos AS adInf
      ON adInf.adminId = ad.id
      INNER JOIN foodnet.locations AS loc
      ON ad.id = loc.adminId
      INNER JOIN foodnet.locationNames AS locName
      ON loc.locationNameId = locName.id
      INNER JOIN foodnet.locationNameTranslations as locNameTrans
      ON locName.id = locNameTrans.locationNameId
      WHERE locNameTrans.languageId= ${languageCode} AND adInf.languageId=${languageCode} AND locNameTrans.name LIKE '%${vasarhely}%';`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    if (locationTarguMures.length == 0) {
      return res.status(404).json({ msg: "City not found" });
    }
    res.json(locationTarguMures);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/location by name
// @desc     Get all restaurants from Székelyudvarhely (HOME)
// @access   Public
router.get("/odorheiu-secuiesc", async (req, res) => {
  const udvarhely = "Székelyudvarhely";
  const languageCode = 2;
  try {
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
      WHERE locTrans.languageId= ${languageCode} AND adInf.languageId=${languageCode} AND locTrans.name LIKE '%${udvarhely}%';`,
        { type: Sequelize.QueryTypes.SELECT }
      )
      .then((result) => {
        res.json(result);
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/location by name
// @desc     Get all restaurants from Csíkszereda (HOME)
// @access   Public
router.get("/miercurea-ciuc", async (req, res) => {
  const cityParams = req.params.locationName;
  const csik = "Csíkszereda";
  const languageCode = 2;
  try {
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
      WHERE locTrans.languageId= ${languageCode} AND adInf.languageId=${languageCode} AND locTrans.name LIKE '%${csik}%';`,
        { type: Sequelize.QueryTypes.SELECT }
      )
      .then((result) => {
        res.json(result);
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
