const express = require("express"),
  lingua = require("lingua");
const errorController = require("./admin/controllers/error");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const multer = require("multer");
const path = require("path");
const MONGODB_URI =
  "mongodb://foodnet:foodnet@foodnet-shard-00-00-jff9b.mongodb.net:27017,foodnet-shard-00-01-jff9b.mongodb.net:27017,foodnet-shard-00-02-jff9b.mongodb.net:27017/test?ssl=true&replicaSet=foodnet-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose.Promise = global.Promise;
const app = express();
mongoose.connect(MONGODB_URI);
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions"
});
app.use(cookieParser());
app.use((error, req, res, next) => {
  res.status(500).render('500', {
    pageTitle: 'Error!',
    path: '/500',
    isAuthenticated: req.session.isLoggedIn
  });
});


// Init Middleware
app.use(express.json({ extended: false }));

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
// EJS
app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./admin/routes/admin");
const indexRoutes = require("./admin/routes/index");
const authRoutes = require("./admin/routes/auth");
const superRoutes = require("./admin/routes/superadmin");
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(
  lingua(app, {
    defaultLocale: "en",
    path: __dirname + "/i18n",
    cookieOptions: {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
    }
  })
);
app.use(express.json({ extended: false }));
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store
  })
);
app.get("/500", errorController.get500);

// app.use(errorController.get404);

app.use(flash());
app.use((req, res, next) => {
  if (!req.session.admin) {
    return next();
  }
  Admin.findById(req.session.admin._id)
    .then(admin => {
      if (!admin) {
        return next();
      }
      req.admin = admin;
      next();
    })
    .catch(err => {
      throw new Error(err);
    });
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  next();
});
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
// Define Routes
// app.use("/users", require("./routes/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/deliveryadress", require("./routes/api/delivery-adress"));
// app.use("/api/products", require("./routes/api/products"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/order", require("./routes/api/order"));
app.use("/api/products", require("./routes/api/products"));
app.use("/api/restaurants", require("./routes/api/restaurants"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/admin", adminRoutes);
app.use("/super-admin", superRoutes);
app.use(indexRoutes);
//fsdfsd
app.use(authRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));