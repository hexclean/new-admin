const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const config = require("config");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const { Op } = require("sequelize");
const ResetPasswordApp = require("../../models/ResetPasswordApp");
const Sequelize = require("sequelize");
const sequelize = require("../../util/database");

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
    check("password", "Password is required").isLength({ min: 6, max: 30 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({
        status: 400,
        msg: "Invalid credentials",
        result: [],
      });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ where: { email: email } });
console.log(user);
      if (!user) {
        return res.json({
          status: 400,
          msg: "User or password incorrect",
          result: [],
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.json({
          status: 400,
          msg: "User or password incorrect",
          result: [],
        });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: "30 days" },
        (err, token) => {
          if (err) throw err;
          res.json({
            status: 200,
            msg: "Login success",
            result: [{ token: token }],
          });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.json({ status: 500, result: [{ msg: "Server error" }] });
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
    check("name", "Please include a valid name").isLength({ min: 3, max: 20 }),
    check(
      "password",
      "Please enter a password with 5 or more characters"
    ).isLength({ min: 5, max: 30 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json({
        status: 400,
        msg: "Invalid credentials",
        result: [],
      });
    }

    const { email, password, name, newsletter } = req.body;
    try {
      let user = await User.findOne({ where: { email: email } });

      if (user) {
        return res.json({
          status: 400,
          msg: "User already exist",
          result: [],
        });
      }

      user = new User({
        email: email,
        password: password,
        fullName: name,
        newsletter: newsletter,
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
          res.json({
            status: 201,
            msg: "'Registration success",
            result: [{ token }],
          });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.json({ status: 500, msg: "Server error", result: [] });
    }
  }
);

// @route    POST api/reset
// @desc     New password request from web
// @access   Public
router.post(
  "/reset",
  [check("email", "This is not email format").isEmail()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({
        status: 400,
        msg: "Invalid credentials",
        result: [],
      });
    }
    const { email } = req.body;
    const test = await User.findOne({ where: { email: email } });
    if (!test) {
      return res.json({
        status: 200,
        msg: "Email successfully sent",
        result: [],
      });
    } else {
      crypto.randomBytes(32, (err, buffer) => {
        const token = buffer.toString("hex");
        User.findOne({ where: { email: email } })
          .then((user) => {
            user.resetToken = token;
            user.resetTokenExpiration = Date.now() + 17600000;
            return user.save();
          })
          .then((result) => {
            transporter.sendMail({
              to: email,
              from: "reset-password@foodnet.ro",
              subject: "Password reset",
              html: `
                  <p>You requested a password reset</p>
                  <p>Click this <a href="https://shielded-anchorage-51692.herokuapp.com/reset-password/${token}">link</a> to set a new password.</p>
                `,
            });

            return res.json({
              status: 200,
              msg: "Email successfully sent",
              result: [],
            });
          })
          .catch((err) => {
            return res.json({
              status: 500,
              msg: "Server error",
              result: [],
            });
          });
      });
    }
  }
);

// @route    POST api/reset-password/:token
// @desc     Change password on web
// @access   Public
router.post(
  "/reset-password/:token",
  [
    check(
      "password",
      "The password must be at least 6 characters long"
    ).isLength({ min: 6 }),
    check(
      "passwordAgain",
      "The password must be at least 6 characters long"
    ).isLength({ min: 6 }),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({
        status: 400,
        msg: "The password must be at least 6 characters long",
        result: [],
      });
    }

    const { password, passwordAgain } = req.body;
    const token = req.params.token;

    let resetUser;

    const userToken = await User.findAll({
      where: {
        resetToken: {
          [Op.eq]: token,
        },
      },
    });

    if (userToken.length == 0) {
      return res.json({
        status: 400,
        msg: "No token available",
        result: [],
      });
    }

    if (password != passwordAgain) {
      return res.json({
        status: 400,
        msg: "Password and password again do not match",
        result: [],
      });
    }

    const payload = {
      user: {
        id: userToken.id,
      },
    };

    await User.findOne({
      where: {
        resetToken: {
          [Op.eq]: token,
        },
      },
    })
      .then((user) => {
        resetUser = user;
        return bcrypt.hash(password, 12);
      })
      .then((hashedPassword) => {
        resetUser.password = hashedPassword;
        resetUser.resetToken = 0;
        resetUser.resetTokenExpiration = 0;
        return resetUser.save();
      })
      .then((result) => {
        jwt.sign(
          payload,
          config.get("jwtSecret"),
          { expiresIn: 360000 },
          (err, token) => {
            if (err) throw err;
            return res.json({
              status: 200,
              msg: "You have successfully changed your password",
              result: [{ token: token }],
            });
          }
        );
      })
      .catch((err) => {
        console.log(err.message);
        return res.json({
          status: 500,
          msg: "Server error",
          result: [],
        });
      });
  }
);

// @route    POST api/reset-password/app
// @desc     Check code availability
// @access   Public
router.post(
  "/verification",
  [check("email", "Please include a valid email").isEmail()],
  async (req, res, next) => {
    const { email } = req.body;
    const resetCode = Math.floor(100000 + Math.random() * 900000);
    var now = new Date().toISOString().replace(/T/, " ").replace(/\..+/, "");

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json({
        status: 400,
        msg: "Email cannot be empty",
        result: [],
      });
    }

    try {
      await User.findOne({
        where: {
          email: email,
        },
        attributes: {
          exclude: [
            "password",
            "fullName",
            "phoneNumber",
            "resetToken",
            "resetTokenExpiration",
            "role",
            "subscriber",
            "newsletter",
            "createdAt",
            "updatedAt",
            "code",
          ],
        },
        include: [
          {
            model: ResetPasswordApp,
            attributes: {
              exclude: ["id", "createdAt", "updatedAt", "userId", "code"],
            },
          },
        ],
      }).then(async (user) => {
        if (user == null) {
          return res.json({
            status: 400,
            msg: "Check your emails",
            result: [],
          });
        } else {
          await User.update({ code: resetCode }, { where: { email: email } });

          const currentCode = await ResetPasswordApp.create({
            userId: user.id,
            code: resetCode,
            expiartion: Date.now() - 86400000,
          });

          await ResetPasswordApp.destroy({
            where: { id: { [Op.notIn]: [currentCode.id] } },
          });

          await sequelize
            .query(
              `SELECT usr.id as userId, usr.code as user_code, usr.email as user_email, res.code as reset_code, res.expiartion as code_expiration
          FROM users AS usr
          INNER JOIN ResetPasswordApps AS res
          ON usr.id = res.userId
          WHERE usr.email LIKE '%${email}%'`,
              { type: Sequelize.QueryTypes.SELECT }
            )
            .then(async (result) => {
              if (result.length == 0) {
                return res.json({
                  status: 400,
                  msg: "Invalid code for this user",
                  result: [],
                });
              }

              for (let i = 0; i <= result.length - 1; i++) {
                if (
                  result[i].code_expiration
                    .toISOString()
                    .replace(/T/, " ")
                    .replace(/\..+/, "") > now ||
                  result[i].user_code == 0
                ) {
                  return res.json({
                    status: 400,
                    msg: "Invalid code for this user",
                    result: [],
                  });
                } else {
                  await transporter.sendMail({
                    to: email,
                    from: "reset-password@foodnet.ro",
                    subject: "Request for reset password",
                    html: `
                          <p>Your reset code is: ${resetCode}</p>
                        `,
                  });

                  return res.json({
                    status: 200,
                    msg: "Successfully sent email",
                    result,
                  });
                }
              }
            });
        }
      });
    } catch (err) {
      return res.json({
        status: 500,
        msg: "Server error",
        result: [],
      });
    }
  }
);

// @route    POST api/reset-password-app/:code
// @desc     Change password in app
// @access   Public
router.post(
  "/reset-password-app",
  [
    check("newPassword", "newPassword min 5 length").isLength({ min: 5 }),
    check("email", "Please include a valid email").isEmail(),
    check("code", "Please include code").isLength({ min: 6, max: 6 }),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({
        status: 400,
        msg: "Invalid credentials",
        result: [],
      });
    }

    const { newPassword, email, code } = req.body;
    let resetUser;

    const checkCode = await User.findAll({
      where: {
        email: email,
      },
    });

    const user = await User.findOne({ where: { email: email } });

    const payload = {
      user: {
        id: user.id,
      },
    };

    if (checkCode.length == 0 || checkCode[0].code != code) {
      return res.json({
        status: 400,
        msg: "Invalid code for this user",
        result: [],
      });
    }

    await User.findOne({
      where: {
        email: email,
        code: code,
      },
    })
      .then((user) => {
        resetUser = user;
        return bcrypt.hash(newPassword, 12);
      })
      .then((hashedPassword) => {
        resetUser.password = hashedPassword;
        resetUser.code = 0;
        return resetUser.save();
      })
      .then(async (result) => {
        await ResetPasswordApp.update(
          { code: 0 },
          { where: { userId: checkCode[0].id } }
        );
        jwt.sign(
          payload,
          config.get("jwtSecret"),
          { expiresIn: 360000 },
          (err, token) => {
            if (err) throw err;
            return res.json({
              status: 200,
              msg: "You have successfully changed your password",
              result: [{ token: token }],
            });
          }
        );
      })
      .catch((err) => {
        res.json({ status: 500, msg: "Server error", result: [] });
      });
  }
);

module.exports = router;
