const Admins = require("../../../models/Admin");
// const User = require("../../../models/");

exports.getIndex = async (req, res, next) => {
  let adminNumbers = [];
  const admins = await Admins.findAll();

  async function countAdmins() {
    for (let i = 0; i < admins.length; i++) {
      adminNumbers = admins.length;
    }
    return adminNumbers;
  }

  countAdmins();
  try {
    res.render("super-admin/dashboard/index", {
      adminNumbers: adminNumbers,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};
