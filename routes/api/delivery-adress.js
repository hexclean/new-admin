const express = require("express");
const router = express.Router();
const DeliveryAdress = require("../../models/DeliveryAdress");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

/////

// @route    GET api/delivery adress
// @desc     Get all delivery adress
// @access   Private
router.get("/client/:client_id", async (req, res) => {
  try {
    const deliveryAdress = await DeliveryAdress.find({
      clientId: req.params.client_id
    }).populate("client", ["email"]);
    if (!deliveryAdress)
      return res.status(400).json({ msg: "no profile this user" });
    res.json(deliveryAdress);
  } catch (error) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});
module.exports = router;
