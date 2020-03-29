const Order = require("../../models/Orders");
const Product = require("../../models/Product");
const Admin = require("../../models/Admin");

exports.indexController = (req, res, next) => {
 
    
      res.render("profile/dashboard", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products"
      });
    
};
