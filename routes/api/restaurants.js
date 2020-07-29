const express = require("express");
const request = require("request");
const config = require("config");
const router = express.Router();
const Admin = require("../../models/Admin");
const AdminInfo = require("../../models/AdminInfo");
const Locations = require("../../models/AdminLocation");
const Sequelize = require("sequelize");

router.get("/test", async (req, res) => {
  const sequelize = new Sequelize("foodnet", "root", "y7b5uwFOODNET", {
    host: "localhost",
    dialect: "mysql",
  });
  return sequelize
    .query(
      `SELECT  ad.id as adminId, ad.fullName AS adminFullName, adLoc.id as adminLocId, adLocTrans.id as adminLocationTranslationId, adLocTrans.name as adminLocationTranslationName, adLocTrans.languageId as adminLocationTranslationLanguageId
      FROM foodnet.admins as ad
      INNER JOIN foodnet.adminLocations as adLoc
      ON ad.id = adLoc.adminId
      INNER JOIN foodnet.adminLocationTranslations as adLocTrans
      ON adLoc.id = adLocTrans.adminLocationId
      where adLocTrans.languageId =2
      group by adLocTrans.name;`,
      { type: Sequelize.QueryTypes.SELECT }
    )
    .then((results) => {
      return res.json(results);
    });
});

router.get("/test/:locationName", async (req, res) => {
  const sequelize = new Sequelize("foodnet", "root", "y7b5uwFOODNET", {
    host: "localhost",
    dialect: "mysql",
  });
  const params = req.params.locationName;
  console.log(params);
  return sequelize
    .query(
      `SELECT  ad.id as adminId, ad.fullName AS adminFullName, adLoc.id as adminLocId, adLocTrans.id as adminLocationTranslationId, adLocTrans.name as adminLocationTranslationName, adLocTrans.languageId as adminLocationTranslationLanguageId
      FROM foodnet.admins as ad
      INNER JOIN foodnet.adminLocations as adLoc
      ON ad.id = adLoc.adminId
      INNER JOIN foodnet.adminLocationTranslations as adLocTrans
      ON adLoc.id = adLocTrans.adminLocationId
      where adLocTrans.languageId =2 and adLocTrans.name LIKE '%${params}%'
      `,
      { type: Sequelize.QueryTypes.SELECT }
    )
    .then((results) => {
      console.log(results);
      console.log(params);
      return res.json(results);
    });
});

//get /restaurants/:id
router.get("/restautants/:id", async (req, res) => {
  const sequelize = new Sequelize("foodnet", "root", "y7b5uwFOODNET", {
    host: "localhost",
    dialect: "mysql",
  });
  sequelize
    .query("Select * from foodnet.admins", {
      type: Sequelize.QueryTypes.SELECT,
    })
    .then((results) => {
      res.json(results);
      console.log(results);
    });
});
// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get("/:id", async (req, res) => {
  try {
    const products = await Product.find(req.params.adminId);

    if (!products) return res.status(400).json({ msg: "products not found" });

    res.json(products);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "products not found" });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
