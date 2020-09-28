const Sequelize = require("sequelize");
const db = {};
const sequelize = new Sequelize("x0nfgxnh2o2y198n", "lphjb6a4r5qdgfgz", "qche3i7iay5xtmpo", {
  dialect: "mysql",
  host: "durvbryvdw2sjcm5.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = sequelize;
