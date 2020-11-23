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

router.get("/info/:restaurantName/:lang", async (req, res) => {
  let lang = req.params.lang;
  const restaurantName = req.params.restaurantName.split("-").join(" ");

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
      selectedLocation,
    });
  }

  try {
    const result = await sequelize.query(
      `
      SELECT res.id as restaurant_id, res.avgTransport as restaurant_avgTransport, 
      res.discount as restaurant_discount, res.phoneNumber as restaurant_phoneNumber,
      resIn.adress as restaurant_address, resIn.shortCompanyDesc as restaurant_description
      FROM restaurants as res
      inner JOIN adminInfos as resIn
      on res.id = resIn.restaurantId
      WHERE res.fullName like "%${restaurantName}%" and resIn.languageId=${languageCode};`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    if (result.length == 0) {
      return res.status(404).json({ msg: "This restaurant not have data" });
    }
    return res.json({
      status: 200,
      msg: "Restaurant details listed",
      result,
    });
  } catch (err) {
    return res.json({
      status: 500,
      msg: "Server error",
      result: [],
    });
  }
});

router.post("/review", async (req, res) => {
  let restaurantName = req.body.restaurantName;
  let rating = req.body.rating;

  try {
    if (rating == 0) {
      const result = await sequelize.query(
        `SELECT resRev.id as ratingId, usr.fullName as user_name, resRev.rating as user_rating, resRev.message as user_message
        FROM RestaurantsReviews as resRev
        inner join restaurants as res
        on res.id = resRev.restaurantId
        inner join users as usr
        on usr.id = resRev.userId
        WHERE res.fullName LIKE "%${restaurantName}%";
         `,
        { type: Sequelize.QueryTypes.SELECT }
      );
      return res.json({
        status: 200,
        msg: "Review list successfully listed",
        result,
      });
    } else {
      const result = await sequelize.query(
        `SELECT resRev.id as ratingId, usr.fullName as user_name, resRev.rating as user_rating, resRev.message as user_message
      FROM RestaurantsReviews as resRev
      inner join restaurants as res
      on res.id = resRev.restaurantId
      inner join users as usr
      on usr.id = resRev.userId
      WHERE res.fullName LIKE "%${restaurantName}%" AND 
      resRev.rating =${rating};`,
        { type: Sequelize.QueryTypes.SELECT }
      );
      if (result.length == 0) {
        return res.json({
          status: 404,
          msg: "This restaurant not have rating",
          result,
        });
      }
      return res.json({
        status: 200,
        msg: "Restaurant details listed",
        result,
      });
    }
  } catch (err) {
    return res.json({
      status: 500,
      msg: "Server error",
      result: [],
    });
  }
});

module.exports = router;
