const Sequelize = require("sequelize");
const db = {};
var os = require("os");

sequelize = new Sequelize("defaultdb", "doadmin", "s27c8agot7l7a13z", {
  dialect: "mysql",
  host: "foodnet-database-do-user-8133521-0.b.db.ondigitalocean.com",
  port: 25060,
});

// const sequelize = new Sequelize("foodnet35", "root", "", {
//   dialect: "mysql",
//   host: "localhost",
// });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = sequelize;
