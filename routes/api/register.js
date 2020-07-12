const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");

// @route    POST api/register
// @desc     Register user
// @access   Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
    check("fullName", "This name is already exist").exists(),
    check("phoneNumber", "This phoneNumber is already exist").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, fullName, phoneNumber } = req.body;

    try {
      let user = await User.findOne({
        where: { email },
      });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      user = new User({
        email: email,
        password: password,
        fullName: fullName,
        phoneNumber: phoneNumber,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// router.post("/doesUsernameExist", async (req, res) => {
//   obj = JSON.parse(req.body);
//   const obj.email = req.body;
//   try {
//     let user = await User.findOne({
//       where: { email: "alma@alma.com" },
//     });
//     console.log("req.body", req.body);
//     if (user) {
//       res.json(true);
//     } else {
//       res.json(false);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });

router.post(
  "/doesUsernameExist",
  [check("email", "Please include a valid email").isEmail()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    try {
      let user = await User.findOne({
        where: { email },
      });

      if (user) {
        return res.json(true);
      } else {
        return res.json(false);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }

  //use case felahsznalo admin milyen lehetsoegei vannk
  //tanulmany hogyan mukodnek  mik az elonyok hatranyok
  //kategoria, kereses, motorhoz, villamossagi
  //5 oldal 1-1 webshop letesztelni a funkcionalitasat
  //full torles, vagy inaktiv torles
);

module.exports = router;
