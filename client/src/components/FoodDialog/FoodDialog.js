import React from "react";
import { useState } from "react";
import { QuantityInput } from "./QuantityInput";
import { useQuantity } from "../Hooks/useQuantity";

export function FoodDialogContainer({
  openFood,
  setOpenFood,
  setOrders,
  orders,
  products,
}) {
  function getPrice(order) {
    return order.quantity * order.price;
  }
  const quantity = useQuantity(openFood && openFood.quantity);
  const order = {
    name: "teszt",
    price: 5,
    quantity: quantity.value,
  };
  function addToOrder() {
    setOrders([...orders, order]);
  }

  return (
    <div className="modal modal-lg" role="dialog" id="myModal">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">bhjbjbjh</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="modal-desc">
              <h4>What is Lorem Ipsum?</h4>
              <QuantityInput quantity={quantity} />
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </p>
            </div>
            <div className="modal-mainbx">
              <h4>What is Lorem Ipsum?</h4>
              <div className="row">
                <div className="col-md-6">
                  <div className="row-line">
                    <div className="wid-10">
                      <b>O Ft </b>
                    </div>
                    <div className="wid-70">
                      Lorem Ipsum is simply dummy text of the printing
                    </div>
                    <div className="wid-10">
                      <button className="bt-gray">
                        <span className="fa fa-trash"></span>
                      </button>
                    </div>
                    <div className="wid-10">
                      <button className="bt-gray">+</button>
                    </div>
                    <div className="clear"></div>
                  </div>
                  <div className="row-line">
                    <div className="wid-10">
                      <b>O Ft </b>
                    </div>
                    <div className="wid-70">
                      Lorem Ipsum is simply dummy text of the printing
                    </div>
                    <div className="wid-10">
                      <button className="bt-gray">
                        <span className="fa fa-trash"></span>
                      </button>
                    </div>
                    <div className="wid-10">
                      <button className="bt-gray">+</button>
                    </div>
                    <div className="clear"></div>
                  </div>
                  <div className="row-line">
                    <div className="wid-10">
                      <b>O Ft </b>
                    </div>
                    <div className="wid-70">
                      Lorem Ipsum is simply dummy text of the printing
                    </div>
                    <div className="wid-10">
                      <button className="bt-gray">
                        <span className="fa fa-trash"></span>
                      </button>
                    </div>
                    <div className="wid-10">
                      <button className="bt-gray">+</button>
                    </div>
                    <div className="clear"></div>
                  </div>
                  <div className="row-line">
                    <div className="wid-10">
                      <b>O Ft </b>
                    </div>
                    <div className="wid-70">
                      Lorem Ipsum is simply dummy text of the printing
                    </div>
                    <div className="wid-10">
                      <button className="bt-gray">
                        <span className="fa fa-trash"></span>
                      </button>
                    </div>
                    <div className="wid-10">
                      <button className="bt-gray">+</button>
                    </div>
                    <div className="clear"></div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="row-line">
                    <div className="wid-10">
                      <b>O Ft </b>
                    </div>
                    <div className="wid-70">
                      Lorem Ipsum is simply dummy text of the printing
                    </div>
                    <div className="wid-10">
                      <button className="bt-gray">
                        <span className="fa fa-trash"></span>
                      </button>
                    </div>
                    <div className="wid-10">
                      <button className="bt-gray">+</button>
                    </div>
                    <div className="clear"></div>
                  </div>
                  <div className="row-line">
                    <div className="wid-10">
                      <b>O Ft </b>
                    </div>
                    <div className="wid-70">
                      Lorem Ipsum is simply dummy text of the printing
                    </div>
                    <div className="wid-10">
                      <button className="bt-gray">
                        <span className="fa fa-trash"></span>
                      </button>
                    </div>
                    <div className="wid-10">
                      <button className="bt-gray">+</button>
                    </div>
                    <div className="clear"></div>
                  </div>
                  <div className="row-line">
                    <div className="wid-10">
                      <b>O Ft </b>
                    </div>
                    <div className="wid-70">
                      Lorem Ipsum is simply dummy text of the printing
                    </div>
                    <div className="wid-10">
                      <button className="bt-gray">
                        <span className="fa fa-trash"></span>
                      </button>
                    </div>
                    <div className="wid-10">
                      <button className="bt-gray">+</button>
                    </div>
                    <div className="clear"></div>
                  </div>
                  <div className="row-line">
                    <div className="wid-10">
                      <b>O Ft </b>
                    </div>
                    <div className="wid-70">
                      Lorem Ipsum is simply dummy text of the printing
                    </div>
                    <div className="wid-10">
                      <button className="bt-gray">
                        <span className="fa fa-trash"></span>
                      </button>
                    </div>
                    <div className="wid-10">
                      <button className="bt-gray">+</button>
                    </div>
                    <div className="clear"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer text-center">
            <button type="button" className="btn-red">
              Close
            </button>
            <button type="button" className="btn-green" onClick={addToOrder}>
              This is a Button: {getPrice(order)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FoodDialog(props) {
  if (!props.openFood) return null;
  return <FoodDialogContainer {...props} />;
}
