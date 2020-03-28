const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const Admin = require("../../models/Admin");
const connectDB = require("../../config/db");
const dev = require("../../config/db");

exports.checkLogin = (req, res, next) => {
  const store = new MongoDBStore({
    uri:
      "mongodb://foodapp:foodapp@foodapp-shard-00-00-sxheo.mongodb.net:27017,foodapp-shard-00-01-sxheo.mongodb.net:27017,foodapp-shard-00-02-sxheo.mongodb.net:27017/test?ssl=true&replicaSet=foodApp-shard-0&authSource=admin&retryWrites=true&w=majority",
    collection: "sessions"
  });

  if (!req.session.admin) {
    return next();
  }

  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store
  });

  Admin.findById(req.session.admin._id)
    .then(admin => {
      req.admin = admin;
      next();
    })
    .catch(err => console.log(err));
  res.locals.isAuthenticated = req.session.isLoggedIn;
};
