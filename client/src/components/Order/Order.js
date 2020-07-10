import React from "react";
import { getPrice } from "../FoodDialog/FoodDialog";

export function Order() {
  // const subtotal = orders.reduce((total, order) => {
  //   return total + getPrice(order);
  // }, 0);
  return (
    <div>
      {true === 0 ? (
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
            <div className="fizetendo">
              <div className="graybox-heading">FIZETENDO</div>
              <div className="graybox-body">
                <div class="product-row">
                  {/* {orders.map((order) => (
                    <div>
                      <div class="product-no">{order.quantity}</div>
                      <div class="product-name">
                        {order.name}
                        <p>{subtotal}</p>
                      </div>
                      <div class="product-size">
                        <b>33 Ft</b>
                      </div>
                      <div class="product-close">&#10006;</div>
                      <div class="clear"></div>
                    </div>
                  ))} */}
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
