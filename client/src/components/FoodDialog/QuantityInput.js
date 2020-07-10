import React from "react";

export function QuantityInput({ quantity }) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm">
          <button
            disabled={quantity.value === 1}
            onClick={() => {
              quantity.setValue(quantity.value - 1);
            }}
          >
            -
          </button>
        </div>
        <div className="col-sm">
          <input type="text" {...quantity} />
        </div>
        <div className="col-sm">
          <button
            onClick={() => {
              quantity.setValue(quantity.value + 1);
            }}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
