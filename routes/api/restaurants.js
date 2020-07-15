const express = require("express");
const request = require("request");
const config = require("config");
const router = express.Router();
const Admin = require("../../models/Admin");
const AdminInfo = require("../../models/AdminInfo");
const Locations = require("../../models/AdminLocation");
const Sequelize = require("sequelize");
// @route    GET api/restaurants
// @desc     Get all restaurants
// @access   Public
router.get("/", async (req, res) => {
  try {
    const restaurants = await Admin.findAll({
      include: [
        {
          model: AdminInfo,
          model: Locations,
        },
        // {
        //   model: Locations,
        // },
      ],
    });
    console.log(restaurants);
    res.json(restaurants);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//get /restaurants/:id
router.get("/restautants/:id", async (req, res) => {
  const sequelize = new Sequelize("foodnet", "root", "y7b5uwFOODNET", {
    host: "localhost",
    dialect: "mysql",
  });
  sequelize
    .query("Select * from foodnet.admins", {
      type: Sequelize.QueryTypes.SELECT,
    })
    .then((results) => {
      res.json(results);
      console.log(results);
    });
});
// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get("/:id", async (req, res) => {
  try {
    const products = await Product.find(req.params.adminId);

    if (!products) return res.status(400).json({ msg: "products not found" });

    res.json(products);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "products not found" });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
