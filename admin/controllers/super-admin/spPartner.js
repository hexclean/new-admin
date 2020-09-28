const Partners = require("../../../models/Restaurant");
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
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }

  let partnerShortDescRoView;
  let partnerShortDescHuView;
  let partnerShortDescEnView;
  let partnerAdressRoView;
  let partnerAdressHuView;
  let partnerAdressEnView;

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
      partnerShortDescRoView =
        partnerShortDescRo[i].adminInfos[0].shortCompanyDesc;
    }
  }

  const partnerShortDescHu = await Partners.findAll({
    where: { id: partId },
    include: [
      {
        model: PartnersTranslation,
        where: { languageId: 2 },
      },
    ],
  });

  async function getPartnerShortDescHu() {
    for (let i = 0; i < partnerShortDescHu.length; i++) {
      partnerShortDescHuView =
        partnerShortDescHu[i].adminInfos[0].shortCompanyDesc;
    }
  }

  const partnerShortDescEn = await Partners.findAll({
    where: { id: partId },
    include: [
      {
        model: PartnersTranslation,
        where: { languageId: 3 },
      },
    ],
  });

  async function getPartnerShortDescEn() {
    for (let i = 0; i < partnerShortDescEn.length; i++) {
      partnerShortDescEnView =
        partnerShortDescEn[i].adminInfos[0].shortCompanyDesc;
    }
  }

  const partnerAdressRo = await Partners.findAll({
    where: { id: partId },
    include: [
      {
        model: PartnersTranslation,
        where: { languageId: 1 },
      },
    ],
  });

  async function getPartnerAdressRo() {
    for (let i = 0; i < partnerAdressRo.length; i++) {
      partnerAdressRoView = partnerAdressRo[i].adminInfos[0].adress;
    }
  }

  const partnerAdressHu = await Partners.findAll({
    where: { id: partId },
    include: [
      {
        model: PartnersTranslation,
        where: { languageId: 2 },
      },
    ],
  });

  async function getPartnerAddressHu() {
    for (let i = 0; i < partnerAdressHu.length; i++) {
      partnerAdressHuView = partnerAdressHu[i].adminInfos[0].adress;
    }
  }

  const partnerAdressEn = await Partners.findAll({
    where: { id: partId },
    include: [
      {
        model: PartnersTranslation,
        where: { languageId: 3 },
      },
    ],
  });

  async function getPartnerAddressEn() {
    for (let i = 0; i < partnerAdressEn.length; i++) {
      partnerAdressEnView = partnerAdressEn[i].adminInfos[0].adress;
    }
  }

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
      getPartnerShortDescHu();
      getPartnerShortDescEn();
      getPartnerAdressRo();
      getPartnerAddressHu();
      getPartnerAddressEn();
      res.render("super-admin/partners/edit-partners", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        partnerId: partId,
        partners: partners,

        partnerShortDescRoView: partnerShortDescRoView,
        partnerShortDescHuView: partnerShortDescHuView,
        partnerShortDescEnView: partnerShortDescEnView,

        partnerAdressRoView: partnerAdressRoView,
        partnerAdressHuView: partnerAdressHuView,
        partnerAdressEnView: partnerAdressEnView,
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
  const fullName = req.body.fullName;
  const phoneNumber = req.body.phoneNumber;
  const email = req.body.email;
  const commission = req.body.commission;
  const open = req.body.open;
  const close = req.body.close;

  const partnerShortDescRoView = req.body.partnerShortDescRoView;
  const partnerShortDescHuView = req.body.partnerShortDescHuView;
  const partnerShortDescEnView = req.body.partnerShortDescEnView;

  const addressRo = req.body.addressRo;
  const addressHu = req.body.addressHu;
  const addressEn = req.body.addressEn;

  Partners.findAll({
    include: [
      {
        model: PartnersTranslation,
      },
    ],
  })
    .then((result) => {
      async function updateLocationName() {
        await Partners.update(
          {
            fullName: fullName,
            phoneNumber: phoneNumber,
            email: email,
            commission: commission,
            open: open,
            close: close,
            partnerShortDescRoView: partnerShortDescRoView,
            partnerShortDescHuView: partnerShortDescHuView,
            partnerShortDescEnView: partnerShortDescEnView,
          },
          { where: { id: partId } }
        );

        await PartnersTranslation.update(
          {
            shortCompanyDesc: partnerShortDescRoView,
            adress: addressRo,
          },
          { where: { restaurantId: partId, languageId: 1 } }
        );

        await PartnersTranslation.update(
          {
            shortCompanyDesc: partnerShortDescHuView,
            adress: addressHu,
          },
          { where: { restaurantId: partId, languageId: 2 } }
        );

        await PartnersTranslation.update(
          {
            shortCompanyDesc: partnerShortDescEnView,
            adress: addressEn,
          },
          { where: { restaurantId: partId, languageId: 3 } }
        );
      }
      updateLocationName();
      res.redirect("/super-admin/partners");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
