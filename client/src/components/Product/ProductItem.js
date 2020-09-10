import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

export function ProductItem({ setOpenFood }) {
  const [products, setProducts] = useState([]);
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
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getProducts = () => {
    const productsList = [];
    var k = Object.keys(products);
    for (var i = 0; i < k.length; i++) {
      productsList.push(
        <div key={k[i]} className="page-header">
          <h2>{k[i]}</h2>
        </div>
      );
      // alert(products[k[i]].length);
      for (var j = 0; j < products[k[i]].length; j++) {
        productsList.push(
          <div key={k[i] + Math.random()}>
            <a href="#" data-toggle="modal" data-target="#myModal">
              <div className="product-infobx pointer">
                <h4>{products[k[i]][j].productTitle}</h4>
                <div className="product-infoleft">
                  <img src={"/" + products[k[i]][j].productImageUrl} />
                </div>
                <div className="product-infocenter">
                  <p className="short-desc">
                    {products[k[i]][j].productDescription}
                  </p>
                </div>
                <div className="product-inforight">
                  <div className="incre-box">
                    <div className="incre-left d-flex justify-content-center">
                      =====>{products[k[i]][j].productPrice} lei
                    </div>
                    <div
                      onClick={() => {
                        console.log(products[k[i]][j].productTitle);
                        console.log(i);
                        console.log(k[i]);
                        // console.log(products[k[i]]);
                        // setOpenFood(products[k[i]]);
                        // console.log("hellooo");
                      }}
                      className="incre-right"
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
            </a>
          </div>
        );
      }
    }
    return productsList;
  };

  return <div>{getProducts()}</div>;
}

export default ProductItem;
