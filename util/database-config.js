const { openingHours } = require("./database/OpeningHours");
const { products } = require("./database/Products");
const { categories } = require("./database/Categories");
const { extras } = require("./database/Extras");
const { boxes } = require("./database/Boxes");
const { dailyMenus } = require("./database/DailyMenus");
const { locations } = require("./database/Locations");
const { allergens } = require("./database/Allergens");
const { orders } = require("./database/Orders");
const { variants } = require("./database/Variants");
const { restaurants } = require("./database/Restaurants");
const { users } = require("./database/Users");
const { property } = require("./database/Property");

function databaseConfig() {
  restaurants();
  products();
  allergens();
  variants();
  categories();
  extras();
  boxes();
  dailyMenus();
  openingHours();
  locations();
  orders();
  users();
  property();
}

module.exports = { databaseConfig };
