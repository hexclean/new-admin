const Sequelize = require("sequelize");

const sequelize = new Sequelize("food-app", "root", "MyFoodApp", {
  dialect: "mysql",
  host: "localhost"
});
module.exports = sequelize;
