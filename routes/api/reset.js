const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
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

// @route    GET api/login
// @desc     Get user by token
// @access   Private
router.post("/", async (req, res) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect("/reset");
    }
    const token = buffer.toString("hex");
    User.findOne({ where: { email: req.body.email } })
      .then((user) => {
        if (!user) {
          console.log("no user");
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        return user.save();
      })
      .then((result) => {
        res.redirect("/");
        transporter.sendMail({
          to: req.body.email,
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
});

router.post("/reset-password/:token", async (req, res) => {
  const token = req.params.token;
  let resetUser;
  const newPassword = req.body.password;
  const passwordAgain = req.body.passwordAgain;
  if (
    newPassword != passwordAgain ||
    newPassword == "" ||
    passwordAgain == ""
  ) {
    return res
      .status(404)
      .json({ msg: "Password don't match or can't be empty" });
  }
  const tokens = User.findAll();
  if (token != tokens.resetToken) {
    return res.status(404).json({ msg: "No token available" });
  }
  User.findOne({
    where: {
      resetToken: token,
      // resetTokenExpiration: { $gt: Date.now() },
    },
  })
    .then((user) => {
      resetUser = user;
      return bcrypt.hash(newPassword, 12);
    })
    .then((hashedPassword) => {
      console.log("resetUser.id", resetUser.id);
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
});

module.exports = router;
