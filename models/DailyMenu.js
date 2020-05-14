const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const DailyMenu = sequelize.define("dailyMenu", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  active: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = DailyMenu;

// <div class="col-md-6 mb-3">
// <label for="datepick">Date</label>
// <div class="input-group">
//   <input
//     class="form-control"
//     type="text"
//     name="datepick"
//     id="datepick"
//     autocomplete="off"
//     step="0.01"
//     value="<% if (editing) { %><%= product.dailyMenuTime %><% } %>"
//   />
//   <div class="invalid-feedback">
//     Time
//   </div>
// </div>
// </div>
