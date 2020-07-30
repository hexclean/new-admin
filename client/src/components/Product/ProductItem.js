import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

export function ProductItem() {
  const [products, setProducts] = useState([]);
  const [openFood, setOpenFood] = useState();
  const partnerId = useParams().partnerId;

  useEffect(() => {
    setProducts([]);
    axios
      .get(`/api/products/:locationName/${partnerId}`)
      .then((response) => {
        console.log("response", response);
        if (response.data) {
          setProducts(response.data);
        }
        console.log("products", response.data.productName);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getProducts = () => {
    const productsList = [];
    var k = Object.keys(products);
    for (var i = 0; i < k.length; i++) {
      console.log(k[i] + ": " + products[k[i]]);
      console.log("k[0]", k[0]);
      productsList.push(
        <div key={k[i]}>
          <div className="page-header">
            <div>{openFood}</div>
            <h2>{k[i]}</h2>
          </div>
          <div className="product-infobx pointer">
            {/* <h4>{products[i].productTitle}</h4> */}
            <div className="product-infoleft">
              {/* <img src={"/" + products[i].productTranslationTitle} /> */}
            </div>
            <div className="product-infocenter">
              <p className="short-desc">
                {/* {products[i].productTranslationTitle} */}
              </p>
            </div>
            <div className="product-inforight">
              <div className="incre-box">
                <div className="incre-left d-flex justify-content-center">
                  {/* {products[i].productFinalPrice} */}
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
