const express = require("express");
const router = express.Router();
const UserDeliveryAdress = require("../../models/UserDeliveryAdress");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");

// @route    GET api/delivery adress
// @desc     Create delivery adress
// @access   Private
router.post("/", auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name } = req.body;
  try {
    const newDeliveryAdress = new UserDeliveryAdress({
      name: req.body.name,
      userId: req.user.id,
    });
    const deliveryAdress = await newDeliveryAdress.save();
    res.json(deliveryAdress);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

exports.apiCreate = function (req, res) {
  let post = new Post(req.body, req.apiUser._id);
  post
    .create()
    .then(function (newId) {
      res.json(newId);
    })
    .catch(function (errors) {
      res.json(errors);
    });
};

module.exports = router;
