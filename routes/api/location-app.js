const express = require("express");
const router = express.Router();
const Sequelize = require("sequelize");
const sequelize = require("../../util/database");

// @route    GET api/location/:locationName
// @desc     Get all restaurants from selected city
// @access   Public
router.get("/:lang", async (req, res) => {
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
  try {
    const locations = await sequelize.query(
      `SELECT loc.id, locNameTrans.name AS cities
      FROM locationNameTranslations as locNameTrans
      INNER JOIN locationNames AS loc
      ON loc.id = locNameTrans.locationNameId
      WHERE locNameTrans.languageId = ${languageCode};`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (!locations) {
      return res.json({
        status: 404,
        msg: "City not found",
        result: [],
      });
    }

    return res.json({
      status: 200,
      msg: "Location list successfuly appear",
      locations,
    });
  } catch (err) {
    console.error(err.message);
    return res.json({
      status: 500,
      msg: "Server error",
      result: [],
    });
  }
});

// @route    GET api/location/:locationName
// @desc     Get all restaurants from selected city
// @access   Public
router.get("/promotion/:lang/:locationName", async (req, res, next) => {
  let lang = req.params.lang;
  if (lang == "ro") {
    languageCode = 1;
  } else if (lang == "hu") {
    languageCode = 2;
  } else if (lang == "en") {
    languageCode = 3;
  } else {
    return res.status(404).json({ msg: "404 error" });
  }
  const locationName = req.params.locationName.split("-").join(" ");

  let d = new Date();
  let weekday = new Array(7);
  weekday[0] = "vasarnap";
  weekday[1] = "hetfo";
  weekday[2] = "kedd";
  weekday[3] = "szerda";
  weekday[4] = "csutortok";
  weekday[5] = "pentek";
  weekday[6] = "szombat";

  let today = weekday[d.getDay()];

  try {
    const selectedLocation = await sequelize.query(
      `SELECT hoH.open as restaurant_open, hoH.close AS restaurant_close, ad.rating AS restaurant_rating,  ad.id AS restaurant_id, ad.imageUrl AS restaurant_profileImage,
      ad.fullName AS restaurant_name, ad.newRestaurant AS restaurant_new, ad.discount AS restaurant_discount,
       adInf.shortCompanyDesc AS restaurant_description
      FROM restaurants AS ad
      INNER JOIN hours AS ho
      ON ad.id = ho.restaurantId
      INNER JOIN openingHours as hoH
      ON ho.openingHoursId = hoH.id
      INNER JOIN openingHoursTranslations hoT
      ON hoT.openingHoursId = hoH.id
      INNER JOIN adminInfos AS adInf
      ON adInf.restaurantId = ad.id
      INNER JOIN locations AS loc
      ON ad.id = loc.restaurantId
      INNER JOIN locationNames AS locName
      ON loc.locationNameId = locName.id
      INNER JOIN locationNameTranslations as locNameTrans
      ON locName.id = locNameTrans.locationNameId
      WHERE hoT.languageId = ${languageCode}
      AND locNameTrans.languageId = ${languageCode} AND hoH.sku LIKE '%${today}%'
      AND adInf.languageId = ${languageCode}
      AND locNameTrans.name LIKE '%${locationName}%' AND locNameTrans.languageId= ${languageCode} 
      ORDER BY promotion ASC
      LIMIT 5;`,
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

// @route    GET api/location/:locationName
// @desc     Get all restaurants from selected city
// @access   Public
router.get("/:lang/:locationName", async (req, res, next) => {
  let lang = req.params.lang;
  if (lang == "ro") {
    languageCode = 1;
  } else if (lang == "hu") {
    languageCode = 2;
  } else if (lang == "en") {
    languageCode = 3;
  } else {
    return res.json({
      status: 404,
      msg: "City not found",
      selectedLocation,
    });
  }
  const locationName = req.params.locationName.split("-").join(" ");

  let d = new Date();
  let weekday = new Array(7);
  weekday[0] = "vasarnap";
  weekday[1] = "hetfo";
  weekday[2] = "kedd";
  weekday[3] = "szerda";
  weekday[4] = "csutortok";
  weekday[5] = "pentek";
  weekday[6] = "szombat";

  let today = weekday[d.getDay()];

  try {
    const selectedLocation = await sequelize.query(
      `SELECT hoH.open as restaurant_open, hoH.close AS restaurant_close, ad.rating AS restaurant_rating,  ad.id AS restaurant_id, ad.imageUrl AS restaurant_profileImage,
      ad.fullName AS restaurant_name, ad.newRestaurant AS restaurant_new, ad.discount AS restaurant_discount,
       adInf.shortCompanyDesc AS restaurant_description
      FROM restaurants AS ad
      INNER JOIN hours AS ho
      ON ad.id = ho.restaurantId
      INNER JOIN openingHours as hoH
      ON ho.openingHoursId = hoH.id
      INNER JOIN openingHoursTranslations hoT
      ON hoT.openingHoursId = hoH.id
      INNER JOIN adminInfos AS adInf
      ON adInf.restaurantId = ad.id
      INNER JOIN locations AS loc
      ON ad.id = loc.restaurantId
      INNER JOIN locationNames AS locName
      ON loc.locationNameId = locName.id
      INNER JOIN locationNameTranslations as locNameTrans
      ON locName.id = locNameTrans.locationNameId
      WHERE hoT.languageId = ${languageCode}
      AND locNameTrans.languageId = ${languageCode} AND hoH.sku LIKE '%${today}%'
      AND adInf.languageId = ${languageCode}
      AND locNameTrans.name LIKE '%${locationName}%' AND locNameTrans.languageId= ${languageCode}`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (selectedLocation.length == 0) {
      return res.json({
        status: 404,
        msg: "City not found",
        result: [],
      });
    }

    return res.json({
      status: 200,
      msg: "Success",
      selectedLocation,
    });
  } catch (err) {
    return res.json({
      status: 500,
      msg: "Server error",
    });
  }
});

// @route    GET api/location/targu-mures
// @desc     Get all restaurants from Marosvásárhely (HOME)
// @access   Public
router.get("/:lang/targu-mures", async (req, res) => {
  let lang = req.params.lang;
  if (lang == "ro") {
    languageCode = 1;
  } else if (lang == "hu") {
    languageCode = 2;
  } else if (lang == "en") {
    languageCode = 3;
  } else {
    return res.status(404).json({ msg: "404 error" });
  }
  const vasarhely = "Târgu Mureș";

  let d = new Date();
  let weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  let n = weekday[d.getDay()];

  try {
    const locationTarguMures = await sequelize.query(
      `SELECT hoH.open as restaurant_open, hoH.close AS restaurant_close,  ad.id AS restaurant_id, ad.imageUrl AS restaurant_profileImage, ad.commission AS restaurant_commission,
      ad.fullName AS restaurant_name, ad.newRestaurant AS restaurant_new, ad.discount AS restaurant_discount,
       adInf.shortCompanyDesc AS restaurant_description,
      ad.deliveryPrice AS restaurant_deliveryPrice, adInf.kitchen AS restaurant_kitchen
      FROM restaurants AS ad
      INNER JOIN hours AS ho
      ON ad.id = ho.restaurantId
      INNER JOIN openingHours as hoH
      ON ho.openingHoursId = hoH.id
      INNER JOIN openingHoursTranslations hoT
      ON hoT.openingHoursId = hoH.id
      INNER JOIN adminInfos AS adInf
      ON adInf.restaurantId = ad.id
      INNER JOIN locations AS loc
      ON ad.id = loc.restaurantId
      INNER JOIN locationNames AS locName
      ON loc.locationNameId = locName.id
      INNER JOIN locationNameTranslations as locNameTrans
      ON locName.id = locNameTrans.locationNameId
      WHERE hoT.languageId = ${languageCode} 
      AND locNameTrans.languageId = ${languageCode}  AND adInf.languageId = ${languageCode}
      AND locNameTrans.name LIKE '%${vasarhely}%';`,
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
router.get("/:lang/odorheiu-secuiesc", async (req, res) => {
  let lang = req.params.lang;
  if (lang == "ro") {
    languageCode = 1;
  } else if (lang == "hu") {
    languageCode = 2;
  } else if (lang == "en") {
    languageCode = 3;
  } else {
    return res.status(404).json({ msg: "404 error" });
  }
  const udvarhely = "Székelyudvarhely";

  let d = new Date();
  let weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  let n = weekday[d.getDay()];

  try {
    const locationOdorhei = await sequelize.query(
      `SELECT hoH.open as restaurant_open, hoH.close AS restaurant_close,  ad.id AS restaurant_id, ad.imageUrl AS restaurant_profileImage, ad.commission AS restaurant_commission,
        ad.fullName AS restaurant_name, ad.newRestaurant AS restaurant_new, ad.discount AS restaurant_discount,
         adInf.shortCompanyDesc AS restaurant_description,
        ad.deliveryPrice AS restaurant_deliveryPrice, adInf.kitchen AS restaurant_kitchen
        FROM restaurants AS ad
        INNER JOIN hours AS ho
        ON ad.id = ho.restaurantId
        INNER JOIN openingHours as hoH
        ON ho.openingHoursId = hoH.id
        INNER JOIN openingHoursTranslations hoT
        ON hoT.openingHoursId = hoH.id
        INNER JOIN adminInfos AS adInf
        ON adInf.restaurantId = ad.id
        INNER JOIN locations AS loc
        ON ad.id = loc.restaurantId
        INNER JOIN locationNames AS locName
        ON loc.locationNameId = locName.id
        INNER JOIN locationNameTranslations as locNameTrans
        ON locName.id = locNameTrans.locationNameId
        WHERE hoT.languageId = ${languageCode}
        AND locNameTrans.languageId = ${languageCode}  AND adInf.languageId = ${languageCode}
        AND locNameTrans.name LIKE '%${udvarhely}%';`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    res.json(locationOdorhei);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/location by name
// @desc     Get all restaurants from Csíkszereda (HOME)
// @access   Public
router.get("/:lang/miercurea-ciuc", async (req, res) => {
  let lang = req.params.lang;
  if (lang == "ro") {
    languageCode = 1;
  } else if (lang == "hu") {
    languageCode = 2;
  } else if (lang == "en") {
    languageCode = 3;
  } else {
    return res.status(404).json({ msg: "404 error" });
  }
  const csik = "Csíkszereda";
  try {
    const locationCiuc = await sequelize.query(
      `SELECT hoH.open as restaurant_open, hoH.close AS restaurant_close,  ad.id AS restaurant_id, ad.imageUrl AS restaurant_profileImage, ad.commission AS restaurant_commission,
        ad.fullName AS restaurant_name, ad.newRestaurant AS restaurant_new, ad.discount AS restaurant_discount,
         adInf.shortCompanyDesc AS restaurant_description,
        ad.deliveryPrice AS restaurant_deliveryPrice, adInf.kitchen AS restaurant_kitchen
        FROM restaurants AS ad
        INNER JOIN hours AS ho
        ON ad.id = ho.restaurantId
        INNER JOIN openingHours as hoH
        ON ho.openingHoursId = hoH.id
        INNER JOIN openingHoursTranslations hoT
        ON hoT.openingHoursId = hoH.id
        INNER JOIN adminInfos AS adInf
        ON adInf.restaurantId = ad.id
        INNER JOIN locations AS loc
        ON ad.id = loc.restaurantId
        INNER JOIN locationNames AS locName
        ON loc.locationNameId = locName.id
        INNER JOIN locationNameTranslations as locNameTrans
        ON locName.id = locNameTrans.locationNameId
        WHERE hoT.languageId = ${languageCode}
        AND locNameTrans.languageId = ${languageCode}  AND adInf.languageId = ${languageCode}
        AND locNameTrans.name LIKE '%${csik}%';`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    res.json(locationCiuc);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
