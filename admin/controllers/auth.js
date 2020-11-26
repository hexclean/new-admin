const bcrypt = require("bcryptjs");
const Admin = require("../../models/Restaurant");
const RestaurantInfo = require("../../models/RestaurantInfo");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const OpeningHours = require("../../models/OpeningHours");
const OpeningHoursTranslation = require("../../models/OpeningHoursTranslation");
const Hour = require("../../models/Hours");
const { validationResult } = require("express-validator/check");
const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "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",
    },
  })
);

exports.getLogin = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    errorMessage: message,
    oldInput: {
      email: "",
      password: "",
    },
    validationErrors: [],
  });
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    isAuthenticated: false,
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  Admin.findOne({ where: { email: email } })
    .then((admin) => {
      if (!admin) {
        return res.redirect("/login");
      }
      bcrypt
        .compare(password, admin.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.admin = admin;
            return req.session.save((err) => {
              console.log(err);
              res.redirect("/");
            });
          }
          createOpeningHour();
          res.redirect("/login");
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/login");
        });
    })
    .catch((err) => console.log(err));
};

exports.postSignup = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render("auth/signup", {
      path: "/signup",
      pageTitle: "Signup",
      errorMessage: errors.array()[0].msg,
      oldInput: {
        email: email,
        password: password,
        confirmPassword: req.body.confirmPassword,
      },
      validationErrors: errors.array(),
    });
  }
  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      async function createAdmin() {
        const admin = await Admin.create({
          email: email,
          password: hashedPassword,
          fullName: "-",
        });
        await RestaurantInfo.create({
          restaurantId: admin.id,
          adress: "",
          languageId: 1,
          shortCompanyDesc: "",
        });

        await RestaurantInfo.create({
          restaurantId: admin.id,
          adress: "",
          languageId: 2,
          shortCompanyDesc: "",
        });

        await RestaurantInfo.create({
          restaurantId: admin.id,
          adress: "",
          languageId: 3,
          shortCompanyDesc: "",
        });

        const hetfo = await OpeningHours.create({
          restaurantId: admin.id,
          open: "-",
          close: "-",
          sku: "hetfo",
          updatedAt: "2020-05-15 07:53:49",
          createdAt: "2020-05-15 07:53:49",
        });
        const kedd = await OpeningHours.create({
          restaurantId: admin.id,
          open: "-",
          close: "-",
          sku: "kedd",
          updatedAt: "2020-05-15 07:53:49",
          createdAt: "2020-05-15 07:53:49",
        });
        const szerda = await OpeningHours.create({
          restaurantId: admin.id,
          open: "-",
          close: "-",
          sku: "szerda",
          updatedAt: "2020-05-15 07:53:49",
          createdAt: "2020-05-15 07:53:49",
        });
        const csutortok = await OpeningHours.create({
          restaurantId: admin.id,
          open: "-",
          close: "-",
          sku: "csutortok",
          updatedAt: "2020-05-15 07:53:49",
          createdAt: "2020-05-15 07:53:49",
        });
        const pentek = await OpeningHours.create({
          restaurantId: admin.id,
          open: "-",
          close: "-",
          sku: "pentek",
          updatedAt: "2020-05-15 07:53:49",
          createdAt: "2020-05-15 07:53:49",
        });
        const szombat = await OpeningHours.create({
          restaurantId: admin.id,
          open: "-",
          close: "-",
          sku: "szombat",
          updatedAt: "2020-05-15 07:53:49",
          createdAt: "2020-05-15 07:53:49",
        });
        const vasarnap = await OpeningHours.create({
          restaurantId: admin.id,
          open: "-",
          close: "-",
          sku: "vasarnap",
          updatedAt: "2020-05-15 07:53:49",
          createdAt: "2020-05-15 07:53:49",
        });
        await Hour.create({
          restaurantId: admin.id,
          openingHoursId: hetfo.id,
          updatedAt: "2020-05-15 07:53:49",
          createdAt: "2020-05-15 07:53:49",
        });
        await Hour.create({
          restaurantId: admin.id,
          openingHoursId: kedd.id,
          updatedAt: "2020-05-15 07:53:49",
          createdAt: "2020-05-15 07:53:49",
        });
        await Hour.create({
          restaurantId: admin.id,
          openingHoursId: szerda.id,
          updatedAt: "2020-05-15 07:53:49",
          createdAt: "2020-05-15 07:53:49",
        });
        await Hour.create({
          restaurantId: admin.id,
          openingHoursId: csutortok.id,
          updatedAt: "2020-05-15 07:53:49",
          createdAt: "2020-05-15 07:53:49",
        });
        await Hour.create({
          restaurantId: admin.id,
          openingHoursId: pentek.id,
          updatedAt: "2020-05-15 07:53:49",
          createdAt: "2020-05-15 07:53:49",
        });
        await Hour.create({
          restaurantId: admin.id,
          openingHoursId: szombat.id,
          updatedAt: "2020-05-15 07:53:49",
          createdAt: "2020-05-15 07:53:49",
        });
        await Hour.create({
          restaurantId: admin.id,
          openingHoursId: vasarnap.id,
          updatedAt: "2020-05-15 07:53:49",
          createdAt: "2020-05-15 07:53:49",
        });

        await OpeningHoursTranslation.create({
          languageId: 1,
          name: "Luni",
          openingHoursId: hetfo.id,
          updatedAt: "2020-05-15 07:53:49",
          createdAt: "2020-05-15 07:53:49",
        });
        await OpeningHoursTranslation.create({
          languageId: 2,
          name: "Hétfő",
          openingHoursId: hetfo.id,
          updatedAt: "2020-05-15 07:53:49",
          createdAt: "2020-05-15 07:53:49",
        });
        await OpeningHoursTranslation.create({
          languageId: 3,
          name: "Monday",
          openingHoursId: hetfo.id,
          updatedAt: "2020-05-15 07:53:49",
          createdAt: "2020-05-15 07:53:49",
        });
        await OpeningHoursTranslation.create({
          restaurantId: admin.id,
          languageId: 1,
          name: "Marți",
          openingHoursId: kedd.id,
          updatedAt: "2020-05-15 07:53:49",
          createdAt: "2020-05-15 07:53:49",
        });
        await OpeningHoursTranslation.create({
          restaurantId: admin.id,
          languageId: 2,
          name: "Kedd",
          openingHoursId: kedd.id,
          updatedAt: "2020-05-15 07:53:49",
          createdAt: "2020-05-15 07:53:49",
        });
        await OpeningHoursTranslation.create({
          restaurantId: admin.id,
          languageId: 3,
          name: "Tuesday",
          openingHoursId: kedd.id,
          updatedAt: "2020-05-15 07:53:49",
          createdAt: "2020-05-15 07:53:49",
        });
        await OpeningHoursTranslation.create({
          restaurantId: admin.id,
          languageId: 1,
          name: "Miercuri",
          openingHoursId: szerda.id,
          updatedAt: "2020-05-15 07:53:49",
          createdAt: "2020-05-15 07:53:49",
        });
        await OpeningHoursTranslation.create({
          restaurantId: admin.id,
          languageId: 2,
          name: "Szerda",
          openingHoursId: szerda.id,
          updatedAt: "2020-05-15 07:53:49",
          createdAt: "2020-05-15 07:53:49",
        });
        await OpeningHoursTranslation.create({
          restaurantId: admin.id,
          languageId: 3,
          name: "Wednesday",
          openingHoursId: szerda.id,
          updatedAt: "2020-05-15 07:53:49",
          createdAt: "2020-05-15 07:53:49",
        });
        await OpeningHoursTranslation.create({
          restaurantId: admin.id,
          languageId: 1,
          name: "Joi",
          openingHoursId: csutortok.id,
          updatedAt: "2020-05-15 07:53:49",
          createdAt: "2020-05-15 07:53:49",
        });
        await OpeningHoursTranslation.create({
          languageId: 2,
          restaurantId: admin.id,
          name: "Csütörtök",
          openingHoursId: csutortok.id,
          updatedAt: "2020-05-15 07:53:49",
          createdAt: "2020-05-15 07:53:49",
        });
        await OpeningHoursTranslation.create({
          restaurantId: admin.id,
          languageId: 3,
          name: "Thursday",
          openingHoursId: csutortok.id,
          updatedAt: "2020-05-15 07:53:49",
          createdAt: "2020-05-15 07:53:49",
        });
        await OpeningHoursTranslation.create({
          restaurantId: admin.id,
          languageId: 1,
          name: "Vineri",
          openingHoursId: pentek.id,
          updatedAt: "2020-05-15 07:53:49",
          createdAt: "2020-05-15 07:53:49",
        });
        await OpeningHoursTranslation.create({
          restaurantId: admin.id,
          languageId: 2,
          name: "Péntek",
          openingHoursId: pentek.id,
          updatedAt: "2020-05-15 07:53:49",
          createdAt: "2020-05-15 07:53:49",
        });
        await OpeningHoursTranslation.create({
          restaurantId: admin.id,
          name: "Friday",
          languageId: 3,
          openingHoursId: pentek.id,
          updatedAt: "2020-05-15 07:53:49",
          createdAt: "2020-05-15 07:53:49",
        });
        await OpeningHoursTranslation.create({
          restaurantId: admin.id,
          languageId: 1,
          name: "Sâmbătă",
          openingHoursId: szombat.id,
          updatedAt: "2020-05-15 07:53:49",
          createdAt: "2020-05-15 07:53:49",
        });
        await OpeningHoursTranslation.create({
          restaurantId: admin.id,
          languageId: 2,
          openingHoursId: szombat.id,
          name: "Szombat",
          updatedAt: "2020-05-15 07:53:49",
          createdAt: "2020-05-15 07:53:49",
        });
        await OpeningHoursTranslation.create({
          restaurantId: admin.id,
          languageId: 3,
          name: "Saturay",
          openingHoursId: szombat.id,
          updatedAt: "2020-05-15 07:53:49",
          createdAt: "2020-05-15 07:53:49",
        });
        await OpeningHoursTranslation.create({
          restaurantId: admin.id,
          languageId: 1,
          name: "Duminică",
          openingHoursId: vasarnap.id,
          updatedAt: "2020-05-15 07:53:49",
          createdAt: "2020-05-15 07:53:49",
        });
        await OpeningHoursTranslation.create({
          restaurantId: admin.id,
          languageId: 2,
          name: "Vasárnap",
          openingHoursId: vasarnap.id,
          updatedAt: "2020-05-15 07:53:49",
          createdAt: "2020-05-15 07:53:49",
        });
        await OpeningHoursTranslation.create({
          restaurantId: admin.id,
          name: "Sunday",
          languageId: 3,
          openingHoursId: vasarnap.id,
          updatedAt: "2020-05-15 07:53:49",
          createdAt: "2020-05-15 07:53:49",
        });
      }

      createAdmin();
    })
    .then((result) => {
      res.redirect("/login");
      //   return transporter.sendMail({
      //     to: email,
      //     from: "shop@node-complete.com",
      //     subject: "hello bejelentekztel",
      //     html: "<h1>You logged in</h1>",
      //   });
    })
    .catch((err) => {
      console.log(err);
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
