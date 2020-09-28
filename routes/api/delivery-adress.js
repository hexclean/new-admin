const express = require("express");
const router = express.Router();
const UserDeliveryAdress = require("../../models/UserDeliveryAdress");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const sequelize = require("../../util/database");
// @route    POST api/delivery address
// @desc     Create delivery address
// @access   Private
router.post("/", auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const newDeliveryAdress = new UserDeliveryAdress({
      name: req.body.name,
      city: req.body.city,
      street: req.body.street,
      houseNumber: req.body.houseNumber,
      floor: req.body.floor,
      doorBell: req.body.doorBell,
      doorNumber: req.body.doorNumber,
      userId: req.user.id,
    });
    const deliveryAdress = await newDeliveryAdress.save();

    res.json(deliveryAdress);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

// @route    GET api/delivery address
// @desc     GET delivery address
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
// @desc     Get delivery adress by user
// @access   Private
router.get("/", auth, async (req, res) => {
  try {
    const deliveryAdress = await UserDeliveryAdress.findByPk(req.params.id);

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

// @route    DELETE api/delivery adress
// @desc     Delete delivery adress
// @access   Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const deliveryAdress = await UserDeliveryAdress.findByPk(req.params.id);

    if (!deliveryAdress) {
      return res.status(404).json({ msg: "Delivey Adress not found" });
    }

    if (deliveryAdress.userId !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await deliveryAdress.destroy();

    res.json({ msg: "Success" });
  } catch (err) {
    console.log(err.message);
    if (err.kind === "ObjecId") {
      return res.status(404).json({ msg: "Delivery Adress not found" });
    }
    res.status(500).send("server error");
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    let deliveryAddress = await UserDeliveryAdress.findByPk(req.params.id);

    if (!deliveryAddress) {
      return res.status(404).json({ msg: "Delivey Adress not found" });
    }

    if (deliveryAddress.userId !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    res.json(deliveryAddress);
  } catch (err) {
    console.log(err.message);
    if (err.kind === "ObjecId") {
      return res.status(404).json({ msg: "Delivery Adress not found" });
    }
    res.status(500).send("server error");
  }
});

router.post(
  "/delivery-adress/:id/edit",
  // [
  //   check("name", "Please include a valid email").isLength({ min: 3 }),
  //   check(
  //     "city",
  //     "Please enter a password with 6 or more characters"
  //   ).isLength({ min: 6 }),
  // ],
  auth,
  async (req, res) => {
    try {
      let deliveryAddressParamsId = await UserDeliveryAdress.findByPk(
        req.params.id
      );

      if (!deliveryAddressParamsId) {
        return res.status(404).json({ msg: "Delivey Adress not found" });
      }

      if (deliveryAddressParamsId.userId !== req.user.id) {
        return res.status(401).json({ msg: "User not authorized" });
      }

      const result = await UserDeliveryAdress.update(
        {
          name: req.body.name,
          city: req.body.city,
          street: req.body.street,
          houseNumber: req.body.houseNumber,
          floor: req.body.floor,
          doorBell: req.body.doorBell,
          doorNumber: req.body.doorNumber,
          userId: req.user.id,
        },
        { where: { id: deliveryAddressParamsId.id } }
      );

      res.json(result);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("server error");
    }
  }
);

module.exports = router;
