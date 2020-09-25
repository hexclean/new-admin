const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const UserDeliveryAdress = require("../../models/UserDeliveryAdress");
const UserProfile = require("../../models/User");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await User.findByPk(req.user.id);

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/profile/me
// @desc     Edit current users profile
// @access   Private
router.post("/me", auth, async (req, res) => {
  try {
    const profile = await User.findAll({
      where: {
        id: req.user.id,
      },
    });

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    const result = await User.update(
      {
        email: req.body.email,
        fullName: req.body.fullName,
        phoneNumber: req.body.phoneNumber,
        id: req.user.id,
      },
      { where: { id: req.user.id } }
    );

    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/profile/
// @desc     Delete profile, user & posts
// @access   Private
router.delete("/", auth, async (req, res) => {
  try {
    // Remove Profile
    await UserProfile.destroy({ where: { id: req.user.id } });

    // Remove Delivery Adresses
    await UserDeliveryAdress.destroy({
      where: { userId: { [Op.in]: req.user.id } },
    });

    // Remove user
    await User.destroy({ where: { id: req.user.id } });

    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
