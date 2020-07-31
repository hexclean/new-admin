const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const adminHomeSearchTranslation = sequelize.define(
  "adminHomeSearchTranslation",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    searchName: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
    },
    freeDelivery: {
      type: Sequelize.INTEGER,
    },
    fastDelivery: {
      type: Sequelize.INTEGER,
    },
    photoMenu: {
      type: Sequelize.INTEGER,
    },
    newest: {
      type: Sequelize.INTEGER,
    },
    pizza: {
      type: Sequelize.INTEGER,
    },
    hamburger: {
      type: Sequelize.INTEGER,
    },
    vegan: {
      type: Sequelize.INTEGER,
    },
    vegetarian: {
      type: Sequelize.INTEGER,
    },
    sandwich: {
      type: Sequelize.INTEGER,
    },
    salad: {
      type: Sequelize.INTEGER,
    },
    fish: {
      type: Sequelize.INTEGER,
    },
    grill: {
      type: Sequelize.INTEGER,
    },
    gyros: {
      type: Sequelize.INTEGER,
    },
    breakfast: {
      type: Sequelize.INTEGER,
    },
    money: {
      type: Sequelize.INTEGER,
    },
    card: {
      type: Sequelize.INTEGER,
    },
    courier: {
      type: Sequelize.INTEGER,
    },
    active: {
      type: Sequelize.INTEGER,
    },
  }
);

module.exports = adminHomeSearchTranslation;
