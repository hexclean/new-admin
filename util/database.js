const Sequelize = require("sequelize");

const sequelize = new Sequelize("foodnet", "root", "y7b5uwFOODNET", {
  dialect: "mysql",
  host: "localhost",
});
module.exports = sequelize;
