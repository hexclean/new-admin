const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const Orders = require("../../models/Orders");


exports.getOrders = (req, res, next) => {
  Orders.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "userInfo"
      }
    }
  ])
    .then(orders => {
      var currentLanguage = req.cookies.language;
      console.log(orders);
      res.render("user/users", {
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


