const Sequelize = require("sequelize");
const db = {};
// const sequelize = new Sequelize(
//   "x0nfgxnh2o2y198n",
//   "lphjb6a4r5qdgfgz",
//   "kekdxp11rr1e5705",
//   {
//     dialect: "mysql",
//     host: "durvbryvdw2sjcm5.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
//   }
// );

const sequelize = new Sequelize("foodnet", "root", "y7b5uwFOODNET", {
  dialect: "mysql",
  host: "localhost",
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = sequelize;
