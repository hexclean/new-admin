const express = require("express");
const router = express.Router();
const UserDeliveryAddress = require("../../models/UserDeliveryAddress");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");

// @route    POST api/delivery address
// @desc     Create delivery address
// @access   Private
router.post(
  "/",
  [
    check("street", "Street is required").isLength({ min: 2, max: 100 }),
    check("houseNumber", "House Number is required").isLength({
      min: 2,
      max: 25,
    }),
  ],
  auth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { street, houseNumber } = req.body;
    try {
      const newDeliveryAdress = await UserDeliveryAddress.create({
        city: "Budapest",
        street: street,
        houseNumber: houseNumber,
        userId: req.user.id,
      });

      res.json(newDeliveryAdress);
    } catch (err) {
      console.log(err);
      console.log(err.message);
      res.status(500).send("server error");
    }
  }
);

// @route    GET api/delivery address
// @desc     GET delivery address
// @access   Private
router.get("/", auth, async (req, res) => {
  try {
    await UserDeliveryAddress.findAll({
      where: { userId: req.user.id },
    }).then((deliveryAddress) => {
      res.json(deliveryAddress);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route    DELETE api/delivery adress
// @desc     Delete delivery adress
// @access   Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const deliveryAddress = await UserDeliveryAddress.findByPk(req.params.id);

    if (!deliveryAddress) {
      return res.status(404).json({ msg: "Delivery Adress not found" });
    }

    if (deliveryAddress.userId !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await deliveryAddress.destroy();

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
    let deliveryAddress = await UserDeliveryAddress.findByPk(req.params.id);

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
  "/delivery-adress/:id",
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
      let deliveryAddressParamsId = await UserDeliveryAddress.findByPk(
        req.params.id
      );

      if (!deliveryAddressParamsId) {
        return res.status(404).json({ msg: "Delivey Adress not found" });
      }

      if (deliveryAddressParamsId.userId !== req.user.id) {
        return res.status(401).json({ msg: "User not authorized" });
      }

      const result = await UserDeliveryAddress.update(
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
