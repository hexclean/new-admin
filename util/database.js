const Sequelize = require("sequelize");
const db = {};
// const sequelize = new Sequelize("foodnet", "root", "y7b5uwFOODNET", {
//   dialect: "mysql",
//   host: "localhost",
// });

const sequelize = new Sequelize("x0nfgxnh2o2y198n", "lphjb6a4r5qdgfgz", "qche3i7iay5xtmpo", {
  host: "durvbryvdw2sjcm5.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  dialect: "mysql",
  port: 3306
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = sequelize;
