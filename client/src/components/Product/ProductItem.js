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
    // pushIfNew();
    const productsList = [];

    // // Example array
    // var array = [{ id: 1 }, { id: 2 }, { id: 3 }];

    // function pushIfNew(obj) {
    //   for (var i = 0; i < array.length; i++) {
    //     if (array[i].id === obj.id) {
    //       // modify whatever property you need
    //       return;
    //     }
    //   }
    //   array.push(obj);
    // }

    var array = [
      { id: 123, value: "value1", name: "Name1" },
      { id: 124, value: "value2", name: "Name1" },
      { id: 125, value: "value3", name: "Name2" },
      { id: 126, value: "value4", name: "Name2" },
    ];

    products = array.reduce(function (a, b) {
      if (a.indexOf(b.categoryTranslationName) == -1) {
        a.push(b.categoryTranslationName);
      }
      return a;
    }, []);

    console.log("products", products);

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
              <img src={"/" + products[i].categoryTranslationName} />
            </div>
            <div className="product-infocenter">
              <p className="short-desc">
                {products[i].categoryTranslationName}
              </p>
            </div>
            <div className="product-inforight">
              <div className="incre-box">
                <div className="incre-left d-flex justify-content-center">
                  {products[i].categoryTranslationName}
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
