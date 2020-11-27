const Sequelize = require("sequelize");
const db = {};
var os = require("os");
// var sequelize = new Sequelize("mysql", "doadmin", "e5bb18t1ls1ork7m", {
//   host: "private-foodnet-database-do-user-8133521-0.b.db.ondigitalocean.com",
//   port: 25060,
// });

// const sequelize = new Sequelize("mysql", "doadmin", "e5bb18t1ls1ork7m", {
//   host: "private-foodnet-database-do-user-8133521-0.b.db.ondigitalocean.com",
//   dialect: "mysql",
//   port: 25060,
// });
// var sequelize = new Sequelize('mysql://user:pass@example.com:9821/dbname', {
//   // Look to the next section for possible options
// })
// const sequelize = new Sequelize("defaultdb", "doadmin", "s27c8agot7l7a13z", {
//   dialect: "mysql",
//   host: "foodnet-database-do-user-8133521-0.b.db.ondigitalocean.com",
// });

sequelize = new Sequelize("defaultdb", "doadmin", "s27c8agot7l7a13z", {
  dialect: "mysql",
  host: "foodnet-database-do-user-8133521-0.b.db.ondigitalocean.com",
  port: 25060,
});

// var sequelize = new Sequelize("defaultdb", "doadmin", "e5bb18t1ls1ork7m", {
//   host: "foodnet-database-do-user-8133521-0.b.db.ondigitalocean.com",
//   port: 25060,
//   dialect: "mysql",
// });
// username = doadmin
// password = e5bb18t1ls1ork7m hide
// // host = foodnet-database-do-user-8133521-0.b.db.ondigitalocean.com
// port = 25060
// // database = defaultdb
// sslmode = REQUIRED

// username = doadmin
// password = e5bb18t1ls1ork7m hide
// host = private-foodnet-database-do-user-8133521-0.b.db.ondigitalocean.com
// port = 25060
// database = defaultdb
// sslmode = REQUIRED

// const sequelize = new Sequelize("foodnet35", "root", "", {
//   dialect: "mysql",
//   host: "localhost",
// });
// console.log("  breq.connection.remoteAddress", req.connection.remoteAddress);

// if (os.hostname().indexOf("local")) {
//   console.log("++++++++++");
// } else {
//   console.log("-------");
// }

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = sequelize;
