import React from "react";

export function Order({ orders }) {
  return (
    <div>
      {orders.length === 0 ? (
        <div className="whitebox margin-bottom-30 cart-box">
          <div className="graybox-heading">ORDER</div>
          <div className="graybox-body">
            <p>Your cart is still empty, choose something delicious!</p>

            <a href="#" className="btn-gray empty-car">
              Min: 0 Ft
            </a>
          </div>
        </div>
      ) : (
        <div>
          <div className="whitebox margin-bottom-30 rendel-box">
            <div className="graybox-heading">RENDELESEM</div>
            <div className="graybox-body">
              <div className="product-row">
                <div className="product-no">1</div>
                <div className="product-name">
                  Genorous Jack
                  <p>Lorem Ipsum Lorem Ipsum.</p>
                </div>
                <div className="product-size">
                  <b>1450 Ft</b>
                </div>
                <div className="product-close">&#10006;</div>
                <div className="clear"></div>
              </div>
              <div className="product-row">
                <div className="product-no">1</div>
                <div className="product-name">
                  Genorous Jack
                  <p>Lorem Ipsum Lorem Ipsum.</p>
                </div>
                <div className="product-size">
                  <b>1450 Ft</b>
                </div>
                <div className="product-close">&#10006;</div>
                <div className="clear"></div>
              </div>
              <div className="product-row">
                <div className="product-no">1</div>
                <div className="product-name">
                  Genorous Jack
                  <p>Lorem Ipsum Lorem Ipsum.</p>
                </div>
                <div className="product-size">
                  <b>1450 Ft</b>
                </div>
                <div className="product-close">&#10006;</div>
                <div className="clear"></div>
              </div>
            </div>
            <div className="fizetendo">
              <div className="graybox-heading">FIZETENDO</div>
              <div className="graybox-body">
                <div className="product-row">
                  <div className="product-name">
                    <b>Genorous Jack</b>
                  </div>
                  <div className="product-size">
                    <b>1450 Ft</b>
                  </div>

                  <div className="clear"></div>
                </div>
                <div className="product-row">
                  <div className="product-name">
                    <b>Genorous Jack</b>
                  </div>
                  <div className="product-size">
                    <b>1450 Ft</b>
                  </div>

                  <div className="clear"></div>
                </div>
                <div className="product-row">
                  <div className="product-name">
                    <b>Genorous Jack</b>
                  </div>
                  <div className="product-size">
                    <b>1450 Ft</b>
                  </div>

                  <div className="clear"></div>
                </div>
                <div className="product-row">
                  <a href="#" className="btn-green order-button">
                    MEGRENDELEM
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Order;
