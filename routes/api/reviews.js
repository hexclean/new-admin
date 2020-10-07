const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const RestaurantsReview = require("../../models/RestaurantsReviews");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const Restaurant = require("../../models/Restaurant");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const { Op } = require("sequelize");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "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",
    },
  })
);

// @route    POST api/reviews
// @desc     Review Admin
// @access   Private
router.post(
  "/review-restaurant/:genLink",
  [
    check("message", "This cannot be empty").isLength({ min: 1, max: 300 }),
    check("rating", "This cannot be empty").isLength({ min: 1 }),
  ],
  auth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const genLink = req.params.genLink;
    const { message, rating } = req.body;

    const review = await RestaurantsReview.findAll({
      where: {
        genLink: {
          [Op.eq]: genLink,
        },
        userId: req.user.id,
      },
    });

    if (
      review.length == 0 ||
      !genLink ||
      !review
      //   ||
      //   Date.now() - 3800000 < Date.now()
    ) {
      return res
        .status(400)
        .json({ msg: "Can't add review, link is expirated or you voted" });
    }

    await RestaurantsReview.findOne({
      where: {
        genLink: genLink,
      },
      userId: req.user.id,
    })
      .then((user) => {
        user.message = message;
        user.rating = rating;
        user.genLink = 0;
        user.genLinkExpiration = 0;
        user.time = Date.now();
        return user.save();
      })
      .then((result) => {
        res.json("Succes");
      })
      .catch((err) => {
        console.log(err.message);
        res.status(500).send("server error");
      });
  }
);

module.exports = router;
