const Partners = require("../../../models/Admin");
const PartnersTranslation = require("../../../models/AdminInfo");

exports.getPartners = (req, res, next) => {
  Partners.findAll({
    include: [
      {
        model: PartnersTranslation,
      },
    ],
  })
    .then((partners) => {
      console.log("part", partners);
      res.render("super-admin/partners/partners", {
        part: partners,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getEditPartner = async (req, res, next) => {
  let getPartnerShortDescriptionRo;
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }

  const partId = req.params.partnerId;

  const partnerShortDescRo = await Partners.findAll({
    where: { id: partId },
    include: [
      {
        model: PartnersTranslation,
        where: { languageId: 1 },
      },
    ],
  });

  async function getPartnerShortDescRo() {
    for (let i = 0; i < partnerShortDescRo.length; i++) {
      getPartnerShortDescriptionRo =
        partnerShortDescRo[i].adminInfos[0].shortCompanyDesc;
    }
  }

  // console.log("partnerShortDescRo", partnerShortDescRo);
  const partnerShortDescHu = await Partners.findAll({
    where: { id: partId },
    include: [
      {
        model: PartnersTranslation,
        where: { languageId: 2 },
      },
    ],
  });
  // for (let i = 0; i < partnerShortDescHu.length; i++) {
  //   console.log(partnerShortDescHu[i].adminInfos[0].shortCompanyDesc);
  // }
  const partnerShortDescEn = await Partners.findAll({
    where: { id: partId },
    include: [
      {
        model: PartnersTranslation,
        where: { languageId: 3 },
      },
    ],
  });

  Partners.findAll({
    where: { id: partId },
    include: [
      {
        model: PartnersTranslation,
      },
    ],
  })
    .then((partners) => {
      getPartnerShortDescRo();
      res.render("super-admin/partners/edit-partners", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        partnerId: partId,
        partners: partners,
        partnerShortDescRo: getPartnerShortDescriptionRo,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postEditPartner = async (req, res, next) => {
  const partId = req.body.partnerId;
  // Title
  const updatedRoTitle = req.body.roName;
  const updatedHuTitle = req.body.huName;
  const updatedEnTitle = req.body.enName;

  Partners.findAll({
    include: [
      {
        model: PartnersTranslation,
      },
    ],
  })
    .then((result) => {
      async function updateLocationName() {
        await PartnersTranslation.update(
          {
            name: updatedRoTitle,
          },
          { where: { adminLocationId: partId, languageId: 1 } }
        );

        await PartnersTranslation.update(
          {
            name: updatedHuTitle,
          },
          { where: { adminLocationId: partId, languageId: 2 } }
        );

        await PartnersTranslation.update(
          {
            name: updatedEnTitle,
          },
          { where: { adminLocationId: partId, languageId: 3 } }
        );
      }
      updateLocationName();
      res.redirect("/super-admin/locations");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
