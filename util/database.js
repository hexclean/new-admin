const Sequelize = require("sequelize");
const db = {};
const sequelize = new Sequelize("foodnet", "root", "y7b5uwFOODNET", {
  dialect: "mysql",
  host: "localhost",
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = sequelize;
