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
                <p>Click this <a href="http://localhost:3000/new-password/${token}">link</a> to set a new password.</p>
              `,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

router.get("/reset/:token", async (req, res) => {
  const token = req.params.token;
  User.findOne({
    where: { resetToken: token, resetTokenExpiration: { $gt: Date.now() } },
  })
    // .then((user) => {
    //   //   userId: user.id,
    //   //   passwordToken: token
    //   console.log("dsad");
    // })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/newpassword/:token", async (req, res) => {
  const token = req.params.token;
  const newPassword = req.body.password;
  const userId = req.body.userId;
  const passwordToken = req.body.passwordToken;
  let resetUser;

  User.findOne({
    where: {
      resetToken: passwordToken,
      resetTokenExpiration: { $gt: Date.now() },
      id: userId,
    },
  })
    .then((user) => {
      resetUser = user;
      return bcrypt.hash(newPassword, 12);
    })
    .then((hashedPassword) => {
      resetUser.password = hashedPassword;
      resetUser.resetToken = undefined;
      resetUser.resetTokenExpiration = undefined;
      return resetUser.save();
    })

    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
