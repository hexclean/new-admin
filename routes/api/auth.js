const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const config = require("config");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "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",
    },
  })
);

// @route    POST api/login
// @desc     Authenticate user & get token
// @access   Public
router.post(
  "/login",
  [
    check("email", "This is not email format").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ where: { email: email } });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid password or email" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials..." }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: "60 days" },
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

// @route    POST api/register
// @desc     Register user
// @access   Public
router.post(
  "/register",
  [
    check("email", "Please include a valid email").isEmail(),
    check("name", "Please include a valid email").isLength({ min: 3, max: 20 }),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 5, max: 20 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, name } = req.body;

    try {
      let user = await User.findOne({ where: { email: email } });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      user = new User({
        email: email,
        password: password,
        fullName: name,
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
      console.log(err);
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

router.post(
  "/reset",
  [check("email", "This is not email format").isEmail()],
  async (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }
    const email = req.body;

    crypto.randomBytes(32, (err, buffer) => {
      const token = buffer.toString("hex");
      User.findOne({ where: { email: email } })
        .then((user) => {
          user.resetToken = token;
          user.resetTokenExpiration = Date.now() + 3600000;
          return user.save();
        })
        .then((result) => {
          transporter.sendMail({
            to: email,
            from: "shop@node-complete.com",
            subject: "Password reset",
            html: `
                  <p>You requested a password reset</p>
                  <p>Click this <a href="http://localhost:3000/reset-password/${token}">link</a> to set a new password.</p>
                `,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
);

router.post(
  "/reset-password/:token",
  [check("newPassword", "Password min 6 length").isLength({ min: 5 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const token = req.params.token;
    let resetUser;

    let tokens = await User.findAll();
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].resetToken) {
      }
    }
    const newPassword = req.body.newPassword;
    // for (let i = 0; i < tokens.length; i++) {

    // }

    //2020-10-06 16:40:54
    User.findOne({
      where: {
        resetToken: token,
        // resetTokenExpiration: { $gt: Date.now() },
      },
    })
      .then((user) => {
        // if (user.resetToken == null) {
        //   return res.status(400).json({ msg: "No token available" });
        // }
        resetUser = user;
        return bcrypt.hash(newPassword, 12);
      })
      .then((hashedPassword) => {
        resetUser.password = hashedPassword;
        resetUser.resetToken = null;
        resetUser.resetTokenExpiration = null;
        return resetUser.save();
      })
      .then((result) => {
        res.redirect("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

module.exports = router;
