const express = require("express");
const request = require("request");
const config = require("config");
const router = express.Router();
const Admin = require("../../models/Admin");
const AdminInfo = require("../../models/AdminInfo");

// @route    GET api/restaurants
// @desc     Get all restaurants
// @access   Public
router.get("/", async (req, res) => {
  try {
    const restaurants = await Admin.findAll({
      include: [
        {
          model: AdminInfo,
        },
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
  try {
    const restautants = await Admin.findAll({
      where: { locationId: req.params.id },
    });

    res.json(restautants);
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

router.get("/products", async (req, res) => {
  try {
    const product = await Product.find();
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
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
