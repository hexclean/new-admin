const express = require("express");
const router = express.Router();
const Sequelize = require("sequelize");

const sequelize = new Sequelize("foodnet", "root", "y7b5uwFOODNET", {
  host: "localhost",
  dialect: "mysql",
});

router.get("/:locationName/:partnerId", async (req, res) => {
  const partnerFullName = req.params.partnerId.split("-").join(" ");
  return sequelize
    .query(
      `SELECT catTrans.name as categoryTranslationName, catTrans.languageId as categoryTranslationLanguageId
      FROM foodnet.admins as ad
      INNER JOIN foodnet.productCategories as cat
      ON ad.id = cat.adminId
      INNER JOIN foodnet.productCategoryTranslations as catTrans
      ON cat.id = catTrans.productCategoryId
      where catTrans.languageId =2 and ad.fullName LIKE '%${partnerFullName}%'
        `,
      { type: Sequelize.QueryTypes.SELECT }
    )
    .then((results) => {
      return res.json(results);
    });
});

module.exports = router;