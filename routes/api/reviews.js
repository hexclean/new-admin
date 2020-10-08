const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const RestaurantsReview = require("../../models/RestaurantsReviews");
const ProductsReview = require("../../models/ProductsReview");

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

async function badProductReview() {
  // const DATE = new Date();
  // DATE.setDate(DATE.getDate() + 1);
  const mailOptions = {
    from: "shop@node-complete.com",
    to: "erdosjozsef20@gmail.com",
    subject: "Form send",
    html: `Content`,
  };
  const DELAY = 600 * 60 * 10000;
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) console.log("Mail failed!! :(");
    else console.log("Mail sent to " + mailOptions.to);
  }),
    DELAY;
}

// async function badProductReview() {
//   transporter.sendMail({
//     to: email,
//     from: "shop@node-complete.com",
//     subject: "Password reset",
//     html: `
//           <p>You requested a password reset</p>
//           <p>Click this <a href="http://localhost:3000/reset-password/${token}">link</a> to set a new password.</p>
//           <p>Vigyazz mert csak 1,5 oraig ervenyes a link</p>
//         `,
//   });
// }

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

// @route    POST api/reviews
// @desc     Review Admin
// @access   Private
router.post(
  "/review-product/:genLink",
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

    const review = await ProductsReview.findAll({
      where: {
        genLink: {
          [Op.eq]: genLink,
        },
        userId: req.user.id,
      },
    });
    console.log(req.user.id);
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

    await ProductsReview.findOne({
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
        if (rating <= 3) {
          // badProductReview();
          console.log("fuggvenyhivas uj email kuldes");
        }
        return res.json(result);
      })
      .catch((err) => {
        console.log(err.message);
        res.status(500).send("server error");
      });
  }
);

module.exports = router;
