const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const UserProfile = sequelize.define("userProfile", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  orders: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = UserProfile;
