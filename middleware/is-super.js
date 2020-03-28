module.exports = (req, res, next) => {
  if (req.admin.email !== "erdos.jozsef@foodnet.ro") {
    return res.redirect("/");
  }
  next();
};
