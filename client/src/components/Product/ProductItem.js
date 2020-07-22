import React, { useState, useEffect } from "react";
import axios from "axios";

export function ProductItem() {
  const [products, setProducts] = useState([]);
  const [openFood, setOpenFood] = useState();
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
      productsList.push(
        <div key={Math.random().toString(36).substring(7)}>
          <div className="page-header">
            <div>{openFood}</div>
            <h2>{products[i].categoryTranslationName}</h2>
          </div>
          <div className="product-infobx pointer">
            <h4>{products[i].productTitle}</h4>
            <div className="product-infoleft">
              <img src={"/" + products[i].productTranslationTitle} />
            </div>
            <div className="product-infocenter">
              <p className="short-desc">
                {products[i].productTranslationTitle}
              </p>
            </div>
            <div className="product-inforight">
              <div className="incre-box">
                <div className="incre-left d-flex justify-content-center">
                  {products[i].productTranslationTitle}
                </div>
                <div
                  className="incre-right"
                  onClick={() => {
                    setOpenFood(products);
                  }}
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
          </div>
        </div>
      );
    }
    return productsList;
  };
  return <div>{getProducts()}</div>;
}

export default ProductItem;
