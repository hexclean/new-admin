const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Admin = sequelize.define("admin", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
});

// const AdminSchema = new mongoose.Schema({
//   email: {
//     type: String,

//     unique: true,
//     lowercase: true,
//   },
//   password: {
//     type: String,
//   },

//   date: {
//     type: Date,
//     default: Date.now,
//   },
//   open: {
//     type: String,
//   },
//   close: {
//     type: String,
//   },
//   adress: {
//     ro: {
//       type: String,
//     },
//     hu: {
//       type: String,
//     },
//     en: {
//       type: String,
//     },
//   },
//   shortCompanyDesc: {
//     ro: {
//       type: String,
//     },
//     hu: {
//       type: String,
//     },
//     en: {
//       type: String,
//     },
//   },
//   imageUrl: {
//     type: String,
//   },
//   fullName: {
//     type: String,
//   },
//   phoneNuber: {
//     type: String,
//   },
//   location: {
//     ro: {
//       type: String,
//       enum: ["Odorheiu Secuiesc", "Târgu Mureș"],
//     },
//     hu: {
//       type: String,
//       enum: ["Székelyudvarhely", "Marosvásárhely"],
//     },
//     en: {
//       type: String,
//       enum: ["SzékelyudvarhelyUS", "MarosvásárhelyUS"],
//     },
//   },
// });

module.exports = Admin;
