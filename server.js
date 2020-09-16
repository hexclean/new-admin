const express = require("express"),
  lingua = require("lingua");
const errorController = require("./admin/controllers/error");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const multer = require("multer");
const path = require("path");
var SequelizeStore = require("connect-session-sequelize")(session.Store);
var Sequelize = require("sequelize");
const ProductCategory = require("./models/ProductCategory");
const ProductCategoryTranslation = require("./models/ProductCategoryTranslation");
const sequelize = require("./util/database");
const Product = require("./models/Product");
const ProductTranslation = require("./models/ProductTranslation");
const ProductVariantTranslation = require("./models/ProductVariantTranslation");
const ProductVariant = require("./models/ProductVariant");
const Extra = require("./models/Extra");
const ExtraTranslation = require("./models/ExtraTranslation");
const ProductFinal = require("./models/ProductFinal");
const AdminLocation = require("./models/AdminLocation");
const AdminLocationTranslation = require("./models/AdminLocationTranslation");
const ProductVariantsExtras = require("./models/ProductVariantsExtras");
const Language = require("./models/Language");
const adminHomeSearch = require("./models/adminHomeSearch");
const adminHomeSearchTranslation = require("./models/adminHomeSearchTranslation");
const Admin = require("./models/Admin");
const AdminInfo = require("./models/AdminInfo");
const DailyMenuHasAllergen = require("./models/DailyMenuHasAllergen");
// Daily Menu
const Box = require("./models/Box");
const BoxTranslation = require("./models/BoxTranslation");
const DailyMenu = require("./models/DailyMenu");
const DailyMenuTranslation = require("./models/DailyMenuTranslation");
const DailyMenuFinal = require("./models/DailyMenuFinal");
const Allergen = require("./models/Allergen");
const AllergenTranslation = require("./models/AllergenTranslation");
//
const ProductHasAllergen = require("./models/ProductHasAllergen");
const ExtraHasAllergen = require("./models/ExtraHasAllergen");
const AdminOpeningHours = require("./models/AdminOpeningHours");
const User = require("./models/User");
const UserDeliveryAdress = require("./models/UserDeliveryAdress");
//
const UserProfile = require("./models/UserProfile");

const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});
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
const superRoutes = require("./admin/routes/super-admin");
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
app.use((error, req, res, next) => {
  res.status(500).render("500", {
    pageTitle: "Error!",
    path: "/500",
    isAuthenticated: req.session.isLoggedIn,
  });
});

app.use(flash());

app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
// Define Routes
// app.use("/users", require("./routes/users"));
app.use("/api/login", require("./routes/api/login"));
app.use("/api/deliveryadress", require("./routes/api/delivery-adress"));
// app.use("/api/products", require("./routes/api/products"));
app.use("/api/register", require("./routes/api/register"));
app.use("/api/category", require("./routes/api/category"));

app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/locations", require("./routes/api/locations"));
// app.use("/api/order", require("./routes/api/order"));
app.use("/api/products", require("./routes/api/products"));
app.use("/api/restaurants", require("./routes/api/restaurants"));
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(expressValidator());
app.use("/admin", adminRoutes);
app.use("/super-admin", superRoutes);
app.use(indexRoutes);
app.use(authRoutes);
app.get("/500", errorController.get500);

////

ProductVariantsExtras.belongsTo(Admin, {
  as: "theAdminInfo",
  foreignKey: "adminId",
});

Admin.hasMany(ProductVariantsExtras, { foreignKey: "adminId" });

AdminInfo.belongsTo(Admin, {
  as: "theAdminInfo",
  foreignKey: "adminId",
});
Admin.hasMany(AdminInfo, { foreignKey: "adminId" });
AdminInfo.belongsTo(Language, {
  as: "adminInfoTrans",
  foreignKey: "languageId",
});
Language.hasMany(AdminInfo, { foreignKey: "languageId" });

// Tables Config //
ProductFinal.belongsTo(Product, {
  as: "theProductId",
  foreignKey: "productId",
});
Product.hasMany(ProductFinal, { foreignKey: "productId" });
/////

ProductFinal.belongsTo(Box, {
  as: "theBoxId",
  foreignKey: "boxId",
});
Box.hasMany(ProductFinal, { foreignKey: "boxId" });

/////
ProductFinal.belongsTo(ProductVariant, {
  as: "theVariantd",
  foreignKey: "variantId",
});
ProductVariant.hasMany(ProductFinal, { foreignKey: "variantId" });

// Product-> ProductTranslation -> Language
Product.belongsTo(Admin, { constrains: true, onDelete: "CASCADE" });

ProductTranslation.belongsTo(Product, {
  as: "TheTranslation",
  foreignKey: "productId",
});
Product.hasMany(ProductTranslation, { foreignKey: "productId" });

ProductTranslation.belongsTo(Language, {
  as: "TheLanguage",
  foreignKey: "languageId",
});

///

ProductCategoryTranslation.belongsTo(ProductCategory, {
  as: "productCategoryTranslation",
  foreignKey: "productCategoryId",
});
ProductCategory.hasMany(ProductCategoryTranslation, {
  foreignKey: "productCategoryId",
});

ProductCategoryTranslation.belongsTo(Language, {
  as: "productVariantTranslationLg",
  foreignKey: "languageId",
});
Language.hasMany(ProductCategoryTranslation, { foreignKey: "languageId" });
/////////
/////
Box.belongsTo(Admin, { constrains: true, onDelete: "CASCADE" });

BoxTranslation.belongsTo(Box, {
  as: "boxTranslation",
  foreignKey: "boxId",
});
Box.hasMany(BoxTranslation, {
  foreignKey: "boxId",
});

BoxTranslation.belongsTo(Language, {
  as: "productVariantTranslationLg",
  foreignKey: "languageId",
});
Language.hasMany(BoxTranslation, { foreignKey: "languageId" });

/////////
///
ProductVariantTranslation.belongsTo(ProductCategory, {
  as: "productVrCategoryTranslation",
  foreignKey: "categoryId",
});
ProductCategory.hasMany(ProductVariantTranslation, {
  foreignKey: "categoryId",
});

ProductVariantTranslation.belongsTo(Language, {
  as: "productCVariantTranslationLg",
  foreignKey: "languageId",
});
Language.hasMany(ProductVariantTranslation, { foreignKey: "languageId" });

// ProductVariantTranslation-> Admin
ProductVariantTranslation.belongsTo(Admin, {
  constrains: true,
  onDelete: "CASCADE",
});
Admin.hasMany(ProductVariantTranslation);

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

Admin.hasMany(Product);

ProductVariant.belongsTo(Admin, { constrains: true, onDelete: "CASCADE" });
Admin.hasMany(ProductVariant);

Extra.belongsTo(Admin, { constrains: true, onDelete: "CASCADE" });
Admin.hasMany(Extra);

// Language -> ProductTranslation, VariantTranslation, ExtraTranslation

Language.hasMany(ProductVariantTranslation);
Language.hasMany(ExtraTranslation);

ProductVariant.hasMany(ProductVariantTranslation);
Extra.hasMany(ExtraTranslation);
// Product -> Variant
// Extra.hasMany(ExtraCategory);

ProductVariant.hasMany(ProductVariantsExtras);
Extra.hasMany(ProductVariantsExtras);

//
// Product.hasMany(ProductVariantToProduct);

ExtraTranslation.belongsTo(Extra, {
  as: "extraTranslation",
  foreignKey: "extraId",
});
Extra.hasMany(ExtraTranslation, { foreignKey: "extraId" });

ExtraTranslation.belongsTo(Language, {
  as: "extraLanguage",
  foreignKey: "languageId",
});
Language.hasMany(ExtraTranslation, { foreignKey: "languageId" });

// Daily Menu
DailyMenu.belongsTo(Admin, { constrains: true, onDelete: "CASCADE" });

DailyMenuTranslation.belongsTo(DailyMenu, {
  as: "dailyMenuTrans",
  foreignKey: "dailyMenuId",
});
DailyMenu.hasMany(DailyMenuTranslation, { foreignKey: "dailyMenuId" });

DailyMenuTranslation.belongsTo(Language, {
  as: "dailyMenuLang",
  foreignKey: "languageId",
});

DailyMenuFinal.belongsTo(DailyMenu, {
  as: "theDailyId",
  foreignKey: "dailyMenuId",
});
DailyMenu.hasMany(DailyMenuFinal, { foreignKey: "dailyMenuId" });

Allergen.belongsTo(Admin, { constrains: true, onDelete: "CASCADE" });
// Allergen.belongsTo(Product, { foreignKey: "allergenId" });
ExtraHasAllergen.belongsTo(Admin, { constrains: true, onDelete: "CASCADE" });
DailyMenuHasAllergen.belongsTo(Admin, {
  constrains: true,
  onDelete: "CASCADE",
});
/////
ProductHasAllergen.belongsTo(Admin, { constrains: true, onDelete: "CASCADE" });

AllergenTranslation.belongsTo(Allergen, {
  as: "allergenTran",
  foreignKey: "allergenId",
});
Allergen.hasMany(AllergenTranslation, {
  foreignKey: "allergenId",
});
///
ExtraHasAllergen.belongsTo(Allergen, {
  as: "allergenIdExtra",
  foreignKey: "allergenId",
});
Allergen.hasMany(ExtraHasAllergen, {
  foreignKey: "allergenId",
});

ExtraHasAllergen.belongsTo(Extra, {
  as: "extraIdAllergen",
  foreignKey: "extraId",
});
Extra.hasMany(ExtraHasAllergen, {
  foreignKey: "extraId",
});
////
///
///
DailyMenuHasAllergen.belongsTo(Allergen, {
  as: "allergenIdDailyMenu",
  foreignKey: "allergenId",
});
Allergen.hasMany(DailyMenuHasAllergen, {
  foreignKey: "allergenId",
});

DailyMenuHasAllergen.belongsTo(DailyMenu, {
  as: "dailyMenuIdAllergen",
  foreignKey: "dailyMenuId",
});
DailyMenu.hasMany(DailyMenuHasAllergen, {
  foreignKey: "dailyMenuId",
});
//
///
//
ProductHasAllergen.belongsTo(Allergen, {
  as: "allergenIdProduct",
  foreignKey: "allergenId",
});
Allergen.hasMany(ProductHasAllergen, {
  foreignKey: "allergenId",
});

ProductHasAllergen.belongsTo(Allergen, {
  as: "productAllergen",
  foreignKey: "productId",
});
Extra.hasMany(ProductHasAllergen, {
  foreignKey: "productId",
});

Language.hasMany(AllergenTranslation, { foreignKey: "languageId" });

AdminLocationTranslation.belongsTo(AdminLocation, {
  as: "adminLTrans",
  foreignKey: "adminLocationId",
});
AdminLocation.hasMany(AdminLocationTranslation, {
  foreignKey: "adminLocationId",
});

Language.hasMany(AdminLocationTranslation, { foreignKey: "languageId" });

// Admin Hours
AdminOpeningHours.belongsTo(Admin, { constrains: true, onDelete: "CASCADE" });

Admin.hasMany(AdminOpeningHours, { foreignKey: "adminId" });

AdminLocation.belongsTo(Admin, {
  as: "adminLocation",
  foreignKey: "adminId",
});

Admin.hasMany(AdminLocation, { foreignKey: "adminId" });

Admin.hasMany(adminHomeSearch, { foreignKey: "adminId" });
adminHomeSearchTranslation.belongsTo(adminHomeSearch, {
  as: "adminLTrans",
  foreignKey: "adminHomeSearchId",
});
adminHomeSearch.hasMany(adminHomeSearchTranslation, {
  foreignKey: "adminHomeSearchId",
});

Language.hasMany(adminHomeSearchTranslation, { foreignKey: "languageId" });

// app.use((error, req, res, next) => {
//   res.status(500).render("500", {
//     pageTitle: "Error!",
//     path: "/500",
//     isAuthenticated: req.session.isLoggedIn,
//   });
// });

UserProfile.belongsTo(User, {
  as: "userProfile",
  foreignKey: "userId",
});

User.hasOne(UserProfile, { foreignKey: "userId" });

UserDeliveryAdress.belongsTo(User, {
  as: "userDelAdress",
  foreignKey: "userId",
});

User.hasMany(UserDeliveryAdress, { foreignKey: "userId" });
// Config PORT
const PORT = process.env.PORT || 5000;
app.use(errorController.get404);

sequelize
  // .sync({ force: true })
  .sync()
  .then((result) => {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });
