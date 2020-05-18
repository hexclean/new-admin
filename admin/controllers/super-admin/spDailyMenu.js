const DailyMenus = require("../../../models/DailyMenu");
const DailyMenusTranslation = require("../../../models/DailyMenuTranslation");

exports.getDailyMenus = (req, res, next) => {
  DailyMenus.findAll({
    include: [
      {
        model: DailyMenusTranslation,
      },
    ],
  })
    .then((dailyMenu) => {
      res.render("super-admin/daily-menu/daily-menus", {
        dailyM: dailyMenu,
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

exports.getEditDailyMenu = async (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }

  let dailyMenuDescriptionRoView;
  let dailyMenuDescriptionHuView;
  let dailyMenuDescriptionEnView;

  const dailyM = req.params.dailyMenuId;

  const dailyMDescRo = await DailyMenus.findAll({
    where: { id: dailyM },
    include: [
      {
        model: DailyMenusTranslation,
        where: { languageId: 1 },
      },
    ],
  });

  async function getDailyMenuDescRo() {
    for (let i = 0; i < dailyMDescRo.length; i++) {
      dailyMenuDescriptionRoView =
        dailyMDescRo[i].dailyMenuTranslations[0].description;
    }
  }

  const dailyMDescHu = await DailyMenus.findAll({
    where: { id: dailyM },
    include: [
      {
        model: DailyMenusTranslation,
        where: { languageId: 2 },
      },
    ],
  });

  async function getDailyMenuDescHu() {
    for (let i = 0; i < dailyMDescHu.length; i++) {
      dailyMenuDescriptionHuView =
        dailyMDescHu[i].dailyMenuTranslations[0].description;
    }
  }

  const dailyMDescEn = await DailyMenus.findAll({
    where: { id: dailyM },
    include: [
      {
        model: DailyMenusTranslation,
        where: { languageId: 3 },
      },
    ],
  });

  async function getDailyMenuDescEn() {
    for (let i = 0; i < dailyMDescEn.length; i++) {
      dailyMenuDescriptionEnView =
        dailyMDescEn[i].dailyMenuTranslations[0].description;
    }
  }

  DailyMenus.findAll({
    where: { id: dailyM },
    include: [
      {
        model: DailyMenusTranslation,
      },
    ],
  })
    .then((dailyMenu) => {
      getDailyMenuDescRo();
      getDailyMenuDescHu();
      getDailyMenuDescEn();
      res.render("super-admin/daily-menu/edit-daily-menu", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        dailyMenuId: dailyM,
        dailyMenu: dailyMenu,

        dailyMenuDescriptionRoView: dailyMenuDescriptionRoView,
        dailyMenuDescriptionHuView: dailyMenuDescriptionHuView,
        dailyMenuDescriptionEnView: dailyMenuDescriptionEnView,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postEditDailyMenu = async (req, res, next) => {
  const dailyM = req.body.dailyMenuId;

  // Description
  const dailyMenuDescriptionRoView = req.body.dailyMenuDescriptionRoView;
  const dailyMenuDescriptionHuView = req.body.dailyMenuDescriptionHuView;
  const dailyMenuDescriptionEnView = req.body.dailyMenuDescriptionEnView;

  DailyMenus.findAll({
    include: [
      {
        model: DailyMenusTranslation,
      },
    ],
  })
    .then((result) => {
      async function updateDailyMenuDescription() {
        await DailyMenusTranslation.update(
          {
            description: dailyMenuDescriptionRoView,
          },
          { where: { dailyMenuId: dailyM, languageId: 1 } }
        );

        await DailyMenusTranslation.update(
          {
            description: dailyMenuDescriptionHuView,
          },
          { where: { dailyMenuId: dailyM, languageId: 2 } }
        );

        await DailyMenusTranslation.update(
          {
            description: dailyMenuDescriptionEnView,
          },
          { where: { dailyMenuId: dailyM, languageId: 3 } }
        );
      }
      updateDailyMenuDescription();
      res.redirect("/super-admin/daily-menus");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
