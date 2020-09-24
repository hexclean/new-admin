const express = require("express");
const router = express.Router();
const Admin = require("../../models/Admin");
const AdminInfo = require("../../models/AdminInfo");
const Locations = require("../../models/AdminLocation");
const LocationsTranslation = require("../../models/AdminLocationTranslation");
const Sequelize = require("sequelize");

const sequelize = new Sequelize("foodnet", "root", "y7b5uwFOODNET", {
  host: "localhost",
  dialect: "mysql",
});

// @route    GET api/restaurants
// @desc     Get all restaurants
// @access   Public
router.get("/", async (req, res) => {
  const cityParams = req.params.locationName;

  try {
    const locations = await Admin.findAll({
      include: [
        {
          model: AdminInfo,
          model: Locations,
          include: [
            {
              model: LocationsTranslation,
            },
          ],
        },
      ],
    });
    res.json(locations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/targu-mures", async (req, res) => {
  const params = req.params.locationName;
  const vasarhely = "Vasarhely";
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
      WHERE locTrans.languageId= ${languageCode} AND adInf.languageId=${languageCode} AND locTrans.name LIKE '%${vasarhely}%';`,
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
// @desc     Get restaurants from Marosvasarhely
// @access   Public
router.get("/targu-mures", async (req, res) => {
  const cityParams = req.params.locationName;
  const vasarhely = "Vasarhely";
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
      WHERE locTrans.languageId= ${languageCode} AND adInf.languageId=${languageCode} AND locTrans.name LIKE '%${vasarhely}%';`,
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
