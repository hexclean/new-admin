const express = require("express"),
  lingua = require("lingua");
const errorController = require("./admin/controllers/error");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const multer = require("multer");
const path = require("path");
var expressValidator = require("express-validator");
var SequelizeStore = require("connect-session-sequelize")(session.Store);
var Sequelize = require("sequelize");

const sequelize = require("./util/database");
const Product = require("./models/Product");
const ProductTranslation = require("./models/ProductTranslation");
const ProductVariantTranslation = require("./models/ProductVariantTranslation");
const ProductVariant = require("./models/ProductVariant");
const Extra = require("./models/Extra");
const ExtraTranslation = require("./models/ExtraTranslation");
const ExtraCategory = require("./models/ExtraCategory");
const ProductCategory = require("./models/ProductCategory");
const ProductCategoryTranslation = require("./models/ProductCategoryTranslation");
const ProductVariantsExtras = require("./models/ProductVariantsExtras");
const ProductVariantToProduct = require("./models/ProductVariantToProduct");
const ProductExtras = require("./models/productExtra");
const Language = require("./models/Language");
const Admin = require("./models/Admin");
const app = express();
const db = new Sequelize("foodnet", "root", "y7b5uwFOODNET", {
  host: "localhost",
  dialect: "mysql",
});
const sessionStore = new SequelizeStore({
  db: db,
  checkExpirationInterval: 15 * 60 * 1000,
  expiration: 7 * 24 * 60 * 60 * 1000,
});

app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  })
);

app.use(cookieParser());
// app.use((error, req, res, next) => {
//   res.status(500).render("500", {
//     pageTitle: "Error!",
//     path: "/500",
//     isAuthenticated: req.session.isLoggedIn,
//   });
// });

// Init Middleware

app.use((req, res, next) => {
  if (!req.session.admin) {
    return next();
  }
  Admin.findByPk(req.session.admin.id)
    .then((admin) => {
      req.admin = admin;
      next();
    })
    .catch((err) => console.log(err));
});
sessionStore.sync();

app.use(express.json({ extended: false }));

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
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
// const superRoutes = require("./admin/routes/superadmin");
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(
  lingua(app, {
    defaultLocale: "en",
    path: __dirname + "/i18n",
    cookieOptions: {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  })
);
app.use(express.json({ extended: false }));

app.get("/500", errorController.get500);

// app.use(errorController.get404);

app.use(flash());

app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
// Define Routes
// app.use("/users", require("./routes/users"));
// app.use("/api/auth", require("./routes/api/auth"));
// app.use("/api/deliveryadress", require("./routes/api/delivery-adress"));
// // app.use("/api/products", require("./routes/api/products"));
// app.use("/api/users", require("./routes/api/users"));
// app.use("/api/profile", require("./routes/api/profile"));
// app.use("/api/order", require("./routes/api/order"));
// app.use("/api/products", require("./routes/api/products"));
// app.use("/api/restaurants", require("./routes/api/restaurants"));
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(expressValidator());
app.use("/admin", adminRoutes);
// app.use("/super-admin", superRoutes);
app.use(indexRoutes);
app.use(authRoutes);

// Product-> ProductTranslation -> Language
ProductTranslation.belongsTo(Product, {
  as: "TheTranslation",
  foreignKey: "productId",
});
Product.hasMany(ProductTranslation, { foreignKey: "productId" });

ProductTranslation.belongsTo(Language, {
  as: "TheLanguage",
  foreignKey: "languageId",
});
Language.hasMany(ProductTranslation, { foreignKey: "languageId" });

// ProductVariant-> ProductVariantTranslation -> Language
ProductVariantTranslation.belongsTo(ProductVariant, {
  as: "TheTranslation",
  foreignKey: "productVariantId",
});
ProductVariant.hasMany(ProductVariantTranslation, {
  foreignKey: "productVariantId",
});

ProductVariantTranslation.belongsTo(Language, {
  as: "TheLanguage",
  foreignKey: "languageId",
});
Language.hasMany(ProductVariantTranslation, { foreignKey: "languageId" });

//
// Product-> ProductTranslation -> Languagef
ProductVariant.belongsTo(Product, {
  as: "VariantToProduct",
  foreignKey: "productId",
});
Product.hasMany(ProductVariant, { foreignKey: "productId" });

//
Product.belongsTo(Admin, { constrains: true, onDelete: "CASCADE" });

Admin.hasMany(Product);

ProductVariant.belongsTo(Admin, { constrains: true, onDelete: "CASCADE" });
Admin.hasMany(ProductVariant);

ProductVariantTranslation.belongsTo(Admin, {
  constrains: true,
  onDelete: "CASCADE",
});
Admin.hasMany(ProductVariantTranslation);

Extra.belongsTo(Admin, { constrains: true, onDelete: "CASCADE" });
Admin.hasMany(Extra);

ProductCategory.belongsTo(Admin, { constrains: true, onDelete: "CASCADE" });
Admin.hasMany(ProductCategory);

// Language -> ProductTranslation, VariantTranslation, ExtraTranslation

Language.hasMany(ProductVariantTranslation);
Language.hasMany(ExtraTranslation);
Language.hasMany(ProductCategoryTranslation);

Product.hasMany(ProductExtras);
Extra.hasMany(ProductExtras);
ProductVariant.hasMany(ProductVariantTranslation);
Extra.hasMany(ExtraTranslation);
ProductCategory.hasMany(ProductCategoryTranslation);
// Product -> Variant

Extra.hasMany(ExtraCategory);

ProductVariant.hasMany(ProductVariantsExtras);
Extra.hasMany(ProductVariantsExtras);

//
// Product.hasMany(ProductVariantToProduct);

// Config PORT
const PORT = process.env.PORT || 5000;

sequelize
  // .sync({ force: true })
  .sync()
  .then((result) => {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });
