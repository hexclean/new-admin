const express = require("express");
const router = express.Router();
const Admin = require("../../models/Admin");
const AdminInfo = require("../../models/AdminInfo");
const Locations = require("../../models/AdminLocation");
const LocationsTranslation = require("../../models/AdminLocationTranslation");

// @route    GET api/restaurants
// @desc     Get all restaurants
// @access   Public
router.get("/", async (req, res) => {
  const cityParams = req.params.locationName;

  try {
    const locations = await Admin.findAll({
      include: [
        {
          model: AdminInfo,
          model: Locations,
          include: [
            {
              model: LocationsTranslation,
            },
          ],
        },
      ],
    });
    console.log(
      "cityParamscityParamscityParamscityParamscityParamscityParamscityParamscityParams",
      cityParams
    );
    res.json(locations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/restaurants/:locationName", async (req, res) => {
  const cityParams = await req.params.locationName;

  try {
    // const locations = await Admin.findAll({
    //   include: [
    //     {
    //       model: AdminInfo,
    //       model: Locations,
    //       include: [
    //         {
    //           model: LocationsTranslation,
    //         },
    //       ],
    //     },
    //   ],
    // });
    console.log("cityParams", cityParams);
    // res.json(locations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
// router.get("/locationName", async (req, res) => {
//   const cityParams = req.params.locationName;

//   try {
//     const locations = await Admin.findAll({
//       include: [
//         {
//           model: AdminInfo,
//           model: Locations,
//           include: [
//             {
//               model: LocationsTranslation,
//             },
//           ],
//         },
//       ],
//     });
//     console.log(
//       "cityParamscityParamscityParamscityParamscityParamscityParamscityParamscityParams",
//       cityParams
//     );
//     res.json(locations);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

module.exports = router;
