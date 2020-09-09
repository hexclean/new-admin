const express = require("express");
const router = express.Router();
const Sequelize = require("sequelize");
const Admin = require("../../models/Admin");
const adminHomeSearch = require("../../models/adminHomeSearch");
const adminHomeSearchTranslation = require("../../models/adminHomeSearchTranslation");

const sequelize = new Sequelize("foodnet", "root", "y7b5uwFOODNET", {
  host: "localhost",
  dialect: "mysql",
});

router.get("/test", async (req, res) => {
  return sequelize
    .query(
      `SELECT  ad.id as adminId, ad.fullName AS adminFullName, adLoc.id as adminLocId, adLocTrans.id as adminLocationTranslationId, adLocTrans.name as adminLocationTranslationName, adLocTrans.languageId as adminLocationTranslationLanguageId
      FROM foodnet.admins as ad
      INNER JOIN foodnet.adminLocations as adLoc
      ON ad.id = adLoc.adminId
      INNER JOIN foodnet.adminLocationTranslations as adLocTrans
      ON adLoc.id = adLocTrans.adminLocationId
      where adLocTrans.languageId =2;`,
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
  return sequelize
    .query(
      `SELECT ad.imageUrl as adminImageUrl, ad.id as adminId, ad.fullName AS adminFullName, adLoc.id as adminLocId, adLocTrans.id as adminLocationTranslationId, adLocTrans.name as adminLocationTranslationName, adLocTrans.languageId as adminLocationTranslationLanguageId
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

router.post("/ok12", async (req, res) => {
  let findArgs = [2, 16, 17];

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      findArgs[key] = req.body.filters[key];
    }
  }

  try {
    const products = await Admin.findAll({
      include: [
        {
          model: adminHomeSearch,
          include: [
            {
              model: adminHomeSearchTranslation,
              where: {
                id: { [Sequelize.Op.in]: findArgs },
                active: 1,
              },
            },
          ],
        },
      ],
    });

    res.json(products);
    console.log("ez a vegso keresett parnerek ");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
