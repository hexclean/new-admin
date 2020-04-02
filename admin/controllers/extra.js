const ExtraAdd = require("../../models/ExtraAdd");

exports.getOrders = (req, res, next) => {
  ExtraAdd.find({ admin: req.admin._id })

    .then(orders => {
      var currentLanguage = req.cookies.language;
      console.log(orders);
      res.render("extra/extra-list", {
        ords: orders,
        currentLanguage: currentLanguage,
        pageTitle: "Admin Products",
        path: "/admin/products"
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getEditOrder = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const ordId = req.params.orderId;
  Orders.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "userinfo"
      }
    },
    {
      $lookup: {
        from: "orderitems",
        localField: "_id",
        foreignField: "orderId",
        as: "orderdetails"
      }
    },
    {
      $lookup: {
        from: "products",
        localField: "adminId",
        foreignField: "_id",
        as: "dasd"
      }
    }
  ])
    .then(order => {
      let ordItem;
      for (let ord of order) {
        if (ord._id == ordId) {
          ordItem = ord;
        }
      }
      console.log(ordItem);
      if (!order) {
        return res.redirect("/");
      }
      res.render("order/edit-order", {
        pageTitle: "Edit order",
        path: "/admin/edit-order",
        editing: editMode,
        order: ordItem,
        hasError: false,
        errorMessage: null,
        validationErrors: []
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postEditOrder = (req, res, next) => {
  const ordId = req.body.orderId;
  // Title

  const updatedSms = req.body.telNumb;

  Orders.findById(ordId)
    .then(order => {
      if (order.adminId.toString() !== req.admin._id.toString()) {
        return res.redirect("/");
      }
      order.telNumb = updatedSms;

      return order.save().then(result => {
        console.log("UPDATED PRODUCT!");
        res.redirect("/admin/products");
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postDeleteOrder = (req, res, next) => {
  const ordId = req.body.orderId;
  Orders.findById(ordId)
    .then(admin => {
      if (!admin) {
        return next(new Error("Product not found."));
      }

      return Orders.deleteOne({ _id: ordId, admin: req.admin._id });
    })
    .then(() => {
      res.redirect("/admin/orders");
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};