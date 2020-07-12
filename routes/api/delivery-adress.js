const express = require("express");
const router = express.Router();
const UserDeliveryAdress = require("../../models/UserDeliveryAdress");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");

// @route    POST api/delivery adress
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

// @route    GET api/delivery adress
// @desc     Create delivery adress
// @access   Private
router.get("/", auth, async (req, res) => {
  try {
    const deliveryAdress = await UserDeliveryAdress.findAll({
      where: { userId: req.user.id },
    });

    res.json(deliveryAdress);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

// @route    GET api/delivery adress
// @desc     Delete delivery adress
// @access   Private
router.get("/", auth, async (req, res) => {
  try {
    const deliveryAdress = await UserDeliveryAdress.findByPk(req.param.id);

    if (!deliveryAdress) {
      return res.status(404).json({ msg: "Delivery Adress not found" });
    }
    res.json(deliveryAdress);
  } catch (err) {
    console.log(err.message);
    if (err.kind === "ObjecId") {
      return res.status(404).json({ msg: "Delivery Adress not found" });
    }
    res.status(500).send("server error");
  }
});

module.exports = router;
