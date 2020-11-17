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
  "/:lang/:locationName/:prestaurantName/products",
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
    const restaurantName = req.params.prestaurantName.split("-").join(" ");
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

router.get("/search", async (req, res) => {
  return sequelize
    .query(
      `SELECT  *
      FROM foodnet.restaurants as ad
      INNER JOIN foodnet.adminHomeSearches as sc
      ON ad.id = sc.restaurantId
      INNER JOIN foodnet.adminHomeSearchTranslations as sctrans
      ON sc.id = sctrans.adminHomeSearchId
      where sctrans.languageId =2 and sctrans.active=1`,
      { type: Sequelize.QueryTypes.SELECT }
    )
    .then((results) => {
      return res.json(results);
    });
});

router.get("/list/:locationName", async (req, res) => {
  const params = req.params.locationName;
  const languageCode = 2;
  return sequelize
    .query(
      `SELECT ad.fullName as restaurant_name, adInf.shortCompanyDesc AS restaurant_description, ad.deliveryPrice AS restaurant_deliveryPrice, adInf.kitchen AS restaurant_kitchen
      FROM foodnet.restaurants as ad
      INNER JOIN foodnet.adminInfos AS adInf
      ON adInf.restaurantId = ad.id
      INNER JOIN foodnet.adminLocations AS adLoc
      ON ad.id = adLoc.restaurantId
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

router.post("/restaurantFilter/:lang/:locationName", async (req, res) => {
  const lang = req.params.lang;
  let languageCode;
  if (lang == "ro") {
    languageCode = 1;
  } else if (lang == "hu") {
    languageCode = 2;
  } else if (lang == "en") {
    languageCode = 3;
  } else {
    return res.status(404).json({ msg: "language not found" });
  }

  const city = req.params.locationName.split("-").join(" ");

  const freeDelivery = [req.body.freeDelivery];
  const newest = [req.body.newest];
  const withinOneHour = [req.body.withinOneHour];
  const pizza = [req.body.pizza];
  const hamburger = [req.body.hamburger];
  const dailyMenu = [req.body.dailyMenu];
  const soup = [req.body.soup];
  const salad = [req.body.salad];
  const money = [req.body.money];
  const card = [req.body.card];
  let filteredRestaurants = [];
  let finalRestaurants = [];

  const searchedRestaurant = await LocationNameTransalation.findAll({
    where: { name: city, languageId: languageCode },

    include: [
      {
        model: LocationName,
        include: [
          {
            model: Location,
            include: [
              {
                model: RestaurantFilters,
                where: {
                  freeDelivery: { [Op.or]: freeDelivery },
                  newest: { [Op.or]: newest },
                  withinOneHour: { [Op.or]: withinOneHour },
                  hamburger: { [Op.or]: hamburger },
                  pizza: { [Op.or]: pizza },
                  dailyMenu: { [Op.or]: dailyMenu },
                  soup: { [Op.or]: soup },
                  salad: { [Op.or]: salad },
                  money: { [Op.or]: money },
                  card: { [Op.or]: card },
                },
                include: [
                  {
                    model: Restaurant,
                    attributes: {
                      exclude: [
                        "password",
                        "commission",
                        "phoneNumber",
                        "email",
                        "coverUrl",
                        "minimumOrderUser",
                        "minimumOrderSubscriber",
                        "avgTransport",
                        "deliveryPrice",
                        "newRestaurant",
                        "discount",
                        "active",
                        "createdAt",
                        "updatedAt",
                      ],
                    },
                    include: [
                      {
                        model: RestaurantDescription,
                        where: { languageId: languageCode },
                        attributes: {
                          exclude: [
                            "adress",
                            "kitchen",
                            "createdAt",
                            "updatedAt",
                            "languageId",
                          ],
                        },
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

  if (searchedRestaurant.length == 0) {
    return res.json({
      status: 400,
      msg: "No restaurant found",
      result: [],
    });
  }

  if (searchedRestaurant[0].locationName.locations[0] !== undefined) {
    filteredRestaurants =
      searchedRestaurant[0].locationName.locations[0].RestaurantFilters;
  } else {
    return res.json({
      status: 400,
      msg: "No restaurant found",
      result: [],
    });
  }

  try {
    for (let i = 0; i <= filteredRestaurants.length - 1; i++) {
      finalRestaurants[i] = filteredRestaurants[i].restaurant;
    }

    return res.json({
      status: 200,
      msg: "Filtered restaurants",
      finalRestaurants,
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

module.exports = router;
