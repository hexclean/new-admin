const bcrypt = require("bcryptjs");
const Admin = require("../../models/Admin");
const AdminInfo = require("../../models/AdminInfo");
const AdminOpeningHours = require("../../models/AdminOpeningHours");

const { validationResult } = require("express-validator/check");

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
        await AdminInfo.create({
          adminId: admin.id,
          adress: "",
          languageId: 1,
          shortCompanyDesc: "",
        });

        await AdminInfo.create({
          adminId: admin.id,
          adress: "",
          languageId: 2,
          shortCompanyDesc: "",
        });

        await AdminInfo.create({
          adminId: admin.id,
          adress: "",
          languageId: 3,
          shortCompanyDesc: "",
        });
        await AdminOpeningHours.create({
          day: "Monday",
          open: "-",
          close: "-",
          adminId: admin.id,
        });
        await AdminOpeningHours.create({
          day: "Tuesday",
          open: "-",
          close: "-",
          adminId: admin.id,
        });
        await AdminOpeningHours.create({
          day: "Wednesday",
          open: "-",
          close: "-",
          adminId: admin.id,
        });
        await AdminOpeningHours.create({
          day: "Thursday",
          open: "-",
          close: "-",
          adminId: admin.id,
        });
        await AdminOpeningHours.create({
          day: "Friday",
          open: "-",
          close: "-",
          adminId: admin.id,
        });
        await AdminOpeningHours.create({
          day: "Saturday",
          open: "-",
          close: "-",
          adminId: admin.id,
        });
        await AdminOpeningHours.create({
          day: "Sunday",
          open: "-",
          close: "-",
          adminId: admin.id,
        });
      }
      createAdmin();
    })
    .then((result) => {
      res.redirect("/login");
    })
    .catch((err) => {
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
