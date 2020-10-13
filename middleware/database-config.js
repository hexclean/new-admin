const ProductCategory = require("../models/ProductCategory");
const ProductCategoryTranslation = require("../models/ProductCategoryTranslation");
const Product = require("../models/Product");
const ProductTranslation = require("../models/ProductTranslation");
const ProductVariant = require("../models/ProductVariant");
const Extra = require("../models/Extra");
const ExtraTranslation = require("../models/ExtraTranslation");
const ProductFinal = require("../models/ProductFinal");
const Location = require("../models/Location");
const LocationName = require("../models/LocationName");
const LocationNameTranslation = require("../models/LocationNameTranslation");
const ProductVariantsExtras = require("../models/ProductVariantsExtras");
const Language = require("../models/Language");
const adminHomeSearch = require("../models/adminHomeSearch");
const adminHomeSearchTranslation = require("../models/adminHomeSearchTranslation");
const Admin = require("../models/Restaurant");
const AdminInfo = require("../models/AdminInfo");
const DailyMenuHasAllergen = require("../models/DailyMenuHasAllergen");
const Box = require("../models/Box");
const BoxTranslation = require("../models/BoxTranslation");
const DailyMenu = require("../models/DailyMenu");
const DailyMenuTranslation = require("../models/DailyMenuTranslation");
const DailyMenuFinal = require("../models/DailyMenuFinal");
const Allergen = require("../models/Allergen");
const AllergenTranslation = require("../models/AllergenTranslation");
const ProductHasAllergen = require("../models/ProductHasAllergen");
const ExtraHasAllergen = require("../models/ExtraHasAllergen");
const RestaurantRole = require("../models/RestaurantRole");
const User = require("../models/User");
const UserDeliveryAdress = require("../models/UserDeliveryAdress");
const UserProfile = require("../models/UserProfile");
const CouponCode = require("../models/CouponCode");
//Opening Hours
const Hours = require("../models/Hours");
const OpeningHours = require("../models/OpeningHours");
const OpeningHoursTranslation = require("../models/OpeningHoursTranslation");
const RestaurantsReviews = require("../models/RestaurantsReviews");
const ProductsReview = require("../models/ProductsReview");
const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");
const OrderItemExtra = require("../models/OrderItemExtra");

function databaseConfig() {
  RestaurantRole.belongsTo(Admin, {
    constrains: true,
    onDelete: "CASCADE",
  });
  Admin.hasMany(RestaurantRole);

  OrderItemExtra.belongsTo(Extra, {
    constrains: true,
    onDelete: "CASCADE",
  });
  Extra.hasMany(OrderItemExtra);

  OrderItemExtra.belongsTo(OrderItem, {
    constrains: true,
    onDelete: "CASCADE",
  });
  OrderItem.hasMany(OrderItemExtra);

  Order.belongsTo(Admin, {
    constrains: true,
    onDelete: "CASCADE",
  });
  Admin.hasMany(Order);

  OrderItem.belongsTo(Order, {
    constrains: true,
    onDelete: "CASCADE",
  });
  Order.hasMany(OrderItem);

  Order.belongsTo(UserDeliveryAdress, {
    constrains: true,
    onDelete: "CASCADE",
  });
  UserDeliveryAdress.hasMany(Order);

  OrderItem.belongsTo(ProductVariant, {
    constrains: true,
    onDelete: "CASCADE",
  });
  ProductVariant.hasMany(OrderItem);

  Order.belongsTo(User, {
    constrains: true,
    onDelete: "CASCADE",
  });
  User.hasMany(Order);

  RestaurantsReviews.belongsTo(Admin, {
    constrains: true,
    onDelete: "CASCADE",
  });
  RestaurantsReviews.belongsTo(User, { constrains: true, onDelete: "CASCADE" });
  Admin.hasMany(RestaurantsReviews, { foreignKey: "restaurantId" });
  User.hasMany(RestaurantsReviews, { foreignKey: "userId" });

  ProductsReview.belongsTo(ProductVariant, {
    constrains: true,
    onDelete: "CASCADE",
  });
  ProductsReview.belongsTo(User, { constrains: true, onDelete: "CASCADE" });
  ProductVariant.hasMany(ProductsReview);

  User.hasMany(ProductsReview, { foreignKey: "userId" });

  ProductVariantsExtras.belongsTo(Admin, {
    as: "theAdminInfo",
    foreignKey: "restaurantId",
  });

  Admin.hasMany(ProductVariantsExtras, { foreignKey: "restaurantId" });

  AdminInfo.belongsTo(Admin, {
    as: "theAdminInfo",
    foreignKey: "restaurantId",
  });
  Admin.hasMany(AdminInfo, { foreignKey: "restaurantId" });
  AdminInfo.belongsTo(Language, {
    as: "adminInfoTrans",
    foreignKey: "languageId",
  });
  Language.hasMany(AdminInfo, { foreignKey: "languageId" });

  ProductFinal.belongsTo(Product, {
    as: "theProductId",
    foreignKey: "productId",
  });
  Product.hasMany(ProductFinal, { foreignKey: "productId" });

  ProductFinal.belongsTo(ProductVariant, {
    as: "theVariantd",
    foreignKey: "variantId",
  });
  ProductVariant.hasMany(ProductFinal, { foreignKey: "variantId" });

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

  ProductCategoryTranslation.belongsTo(ProductCategory, {
    as: "productCategoryTranslation",
    foreignKey: "productCategoryId",
  });
  ProductCategory.hasMany(ProductCategoryTranslation, {
    foreignKey: "productCategoryId",
  });
  ProductCategoryTranslation.belongsTo(Language, {
    as: "categoryLanguage",
    foreignKey: "languageId",
  });
  Language.hasMany(ProductCategoryTranslation, { foreignKey: "languageId" });

  Box.belongsTo(Admin, { constrains: true, onDelete: "CASCADE" });
  Admin.hasMany(Box);

  CouponCode.belongsTo(Admin, { constrains: true, onDelete: "CASCADE" });
  Admin.hasMany(CouponCode);

  BoxTranslation.belongsTo(Box, {
    as: "boxTranslationBox",
    foreignKey: "boxId",
  });
  Box.hasMany(BoxTranslation, {
    foreignKey: "boxId",
  });

  BoxTranslation.belongsTo(Language, {
    as: "boxTranslation",
    foreignKey: "languageId",
  });
  Language.hasMany(BoxTranslation, { foreignKey: "languageId" });

  Language.hasMany(ProductTranslation, { foreignKey: "languageId" });

  Admin.hasMany(Product);

  ProductVariant.belongsTo(Admin, { constrains: true, onDelete: "CASCADE" });
  Admin.hasMany(ProductVariant);

  Extra.belongsTo(Admin, { constrains: true, onDelete: "CASCADE" });
  Admin.hasMany(Extra);
  Language.hasMany(ExtraTranslation);
  Extra.hasMany(ExtraTranslation);

  ProductVariantsExtras.belongsTo(ProductVariant, {
    foreignKey: "productVariantId",
  });
  ProductVariant.hasMany(ProductVariantsExtras);

  Extra.hasMany(ProductVariantsExtras);
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
  DailyMenuHasAllergen.belongsTo(Admin, {
    constrains: true,
    onDelete: "CASCADE",
  });

  AllergenTranslation.belongsTo(Allergen, {
    as: "allergenTran",
    foreignKey: "allergenId",
  });
  Allergen.hasMany(AllergenTranslation, {
    foreignKey: "allergenId",
  });

  ProductVariant.belongsTo(ProductCategory, {
    as: "catToVar",
    foreignKey: "categoryId",
  });
  ProductCategory.hasMany(ProductVariant, {
    foreignKey: "categoryId",
  });

  ExtraHasAllergen.belongsTo(Admin, { constrains: true, onDelete: "CASCADE" });

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

  ProductFinal.belongsTo(Box, {
    as: "theBoxId",
    foreignKey: "boxId",
  });
  Box.hasMany(ProductFinal, { foreignKey: "boxId" });

  ProductHasAllergen.belongsTo(Admin, {
    constrains: true,
    onDelete: "CASCADE",
  });

  ProductHasAllergen.belongsTo(Allergen, {
    as: "allergenIdProduct",
    foreignKey: "allergenId",
  });
  Allergen.hasMany(ProductHasAllergen, {
    foreignKey: "allergenId",
  });

  ProductHasAllergen.belongsTo(Product, {
    as: "productdAllergen",
    foreignKey: "productId",
  });
  Product.hasMany(ProductHasAllergen, {
    foreignKey: "productId",
  });

  Language.hasMany(AllergenTranslation, { foreignKey: "languageId" });

  Admin.hasMany(adminHomeSearch, { foreignKey: "restaurantId" });
  adminHomeSearchTranslation.belongsTo(adminHomeSearch, {
    as: "adminLTrans",
    foreignKey: "adminHomeSearchId",
  });
  adminHomeSearch.hasMany(adminHomeSearchTranslation, {
    foreignKey: "adminHomeSearchId",
  });

  Language.hasMany(adminHomeSearchTranslation, { foreignKey: "languageId" });

  UserProfile.belongsTo(User, {
    as: "userProfile",
    foreignKey: "userId",
  });

  User.hasOne(UserProfile, { foreignKey: "userId" });

  UserDeliveryAdress.belongsTo(User, {
    as: "userDelAdress",
    foreignKey: "userId",
  });

  Location.belongsTo(Admin, { constrains: true, onDelete: "CASCADE" });
  Admin.hasMany(Location);

  Location.belongsTo(LocationName, {
    as: "locationFina;",
    foreignKey: "locationNameId",
  });

  LocationName.hasMany(Location, {
    foreignKey: "locationNameId",
  });

  LocationNameTranslation.belongsTo(LocationName, {
    as: "locationTranslation",
    foreignKey: "locationNameId",
  });
  LocationName.hasMany(LocationNameTranslation, {
    foreignKey: "locationNameId",
  });

  Location.belongsTo(LocationName, {
    as: "locationTranslation",
    foreignKey: "restaurantId",
  });
  LocationName.hasMany(Location, {
    foreignKey: "restaurantId",
  });

  LocationNameTranslation.belongsTo(Language, {
    as: "extraLanguage",
    foreignKey: "languageId",
  });
  Language.hasMany(LocationNameTranslation, { foreignKey: "languageId" });

  User.hasMany(UserDeliveryAdress, { foreignKey: "userId" });

  // OPENING HOURS
  Hours.belongsTo(Admin, { constrains: true, onDelete: "CASCADE" });
  Admin.hasMany(Hours);

  OpeningHours.belongsTo(Admin, { constrains: true, onDelete: "CASCADE" });
  Admin.hasMany(OpeningHours);

  Hours.belongsTo(OpeningHours, {
    foreignKey: "openingHoursId",
  });

  OpeningHours.hasMany(Hours, {
    foreignKey: "openingHoursId",
  });

  OpeningHoursTranslation.belongsTo(OpeningHours, {
    foreignKey: "openingHoursId",
  });
  OpeningHours.hasMany(OpeningHoursTranslation, {
    foreignKey: "openingHoursId",
  });

  OpeningHoursTranslation.belongsTo(Language, {
    foreignKey: "languageId",
  });
  Language.hasMany(OpeningHoursTranslation, { foreignKey: "languageId" });
}

module.exports = { databaseConfig };
