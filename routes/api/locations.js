const express = require("express");
const router = express.Router();
const Sequelize = require("sequelize");
const sequelize = require("../../util/database");
const RestaurantFilters = require("../../models/RestaurantFilters");
const LocationNameTranslation = require("../../models/LocationNameTranslation");
const LocationName = require("../../models/LocationName");
const Restaurant = require("../../models/Restaurant");
const RestaurantDescription = require("../../models/AdminInfo");
const Location = require("../../models/Location");

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
    return res.json({
      status: 404,
      msg: "Language not found",
      result: [],
    });
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
      msg: "Location list successfully appear",
      locations,
    });
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
      msg: "Language not found",
      result: [],
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
      `SELECT hoH.open as restaurant_open, hoH.close AS restaurant_close, ad.rating AS restaurant_rating,  ad.id AS restaurant_id, ad.coverUrl AS restaurant_profileImage,
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
      AND locNameTrans.name LIKE '%${locationName}%' AND locNameTrans.languageId= ${languageCode} LIMIT 4;`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (selectedLocation.length == 0) {
      return res.json({
        status: 404,
        msg: "Restaurant not found",
        result: [],
      });
    }

    return res.json({
      status: 200,
      msg: "Restaurant list successfuly appear",
      selectedLocation,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/location/home/:lang/:locationName
// @desc     Get all restaurants from Marosvásárhely (HOME)
// @access   Public
router.get("/home/:lang/:locationName", async (req, res, next) => {
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
      msg: "Language not found",
      result: [],
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
    const restaurants = await sequelize.query(
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
      AND locNameTrans.name LIKE '%${locationName}%' AND locNameTrans.languageId= ${languageCode} LIMIT 4;`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (restaurants.length == 0) {
      return res.json({
        status: 404,
        msg: "Restaurant not found",
        result: [],
      });
    }

    return res.json({
      status: 200,
      msg: "Restaurant list successfuly appear",
      restaurants,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// filter
router.post("/search", async (req, res) => {
  const lang = req.body.lang;
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
  const city = req.body.location.split("-").join(" ");
  var whereStatement = {};

  if (req.body.filters.freeDelivery == 1) whereStatement.freeDelivery = 1;
  if (req.body.filters.newest == 1) whereStatement.newest = 1;
  if (req.body.filters.pizza == 1) whereStatement.pizza = 1;
  if (req.body.filters.hamburger == 1) whereStatement.hamburger = 1;
  if (req.body.filters.dailyMenu == 1) whereStatement.dailyMenu = 1;
  if (req.body.filters.soup == 1) whereStatement.soup = 1;
  if (req.body.filters.salad == 1) whereStatement.salad = 1;
  if (req.body.filters.money == 1) whereStatement.money = 1;
  if (req.body.filters.card == 1) whereStatement.card = 1;
  if (req.body.filters.withinOneHour == 1) whereStatement.withinOneHour = 1;

  const filteredResult = await LocationNameTranslation.findAll({
    where: { name: city, languageId: 1 },

    include: [
      {
        model: LocationName,
        include: [
          {
            model: Location,
            include: [
              {
                model: RestaurantFilters,
                where: whereStatement,

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
                            "address",
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
  let finalResult = [];

  for (let i = 0; i < filteredResult.length; i++) {
    const { locationName } = filteredResult[i];
    const { locations } = locationName;
    for (let k = 0; k < locations.length; ++k) {
      const { RestaurantFilters } = locations[k];
      for (let j = 0; j < RestaurantFilters.length; ++j) {
        const { restaurant } = RestaurantFilters[j];
        finalResult.push(restaurant);
      }
    }
  }

  return res.json(finalResult);
});

module.exports = router;
