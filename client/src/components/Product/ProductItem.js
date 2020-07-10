import React, { useState, useEffect } from "react";
import axios from "axios";

export function ProductItem({ openFood, setOpenFood, products, setProducts }) {
  useEffect(() => {
    setProducts([]);
    axios
      .get("/api/products/test")
      .then((response) => {
        console.log("response", response);
        if (response.data) {
          setProducts(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getProducts = () => {
    const productsList = [];
    for (var i = 0; i < products.length; i++) {
      var test = products[i].length;
      for (let j = 0; j < test; j++) {
        productsList.push(
          <div>
            <div className="page-header">
              <h2>{products[i][j].categoryName}</h2>
            </div>
            <div className="product-infobx">
              <a href="#" data-toggle="modal" data-target="#myModal">
                <h4>{products[i][j].productTitle}</h4>
                <div className="product-infoleft">
                  <img src={"/" + products[i][j].productImageUrl} />
                </div>
                <div className="product-infocenter">
                  <p className="short-desc">{products[i][j].productDesc}</p>
                </div>
                <div className="product-inforight">
                  <div className="incre-box">
                    <div className="incre-left d-flex justify-content-center">
                      {products[i][j].productFinalPrice}
                    </div>
                    <div
                      className="incre-right"
                      onClick={() => setOpenFood(products)}
                    >
                      +
                    </div>
                    <div className="clear"></div>
                  </div>

                  <div className="extra-optional d-flex justify-content-center">
                    extra elérhető
                  </div>
                </div>
                <div className="clear"></div>
              </a>
            </div>
          </div>
        );
      }
    }
    return productsList;
  };
  return <div>{getProducts()}</div>;
}

export default ProductItem;
