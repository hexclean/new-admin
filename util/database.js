const Sequelize = require("sequelize");
const db = {};

// const sequelize = new Sequelize(
//   "x0nfgxnh2o2y198n",
//   "lphjb6a4r5qdgfgz",
//   "li4e0dhgofk9vhtt",
//   {
//     dialect: "mysql",
//     host: "durvbryvdw2sjcm5.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
//   }
// );

const sequelize = new Sequelize("foodnet10", "root", "", {
  dialect: "mysql",
  host: "localhost",
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = sequelize;
