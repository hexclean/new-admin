import React from "react";

export function QuantityInput({ quantity }) {
  return (
    <div class="container">
      <div class="row">
        <div class="col-sm">
          <button
            disabled={quantity.value === 1}
            onClick={() => {
              quantity.setValue(quantity.value - 1);
            }}
          >
            -
          </button>
        </div>
        <div class="col-sm">
          <input type="text" {...quantity} />
        </div>
        <div class="col-sm">
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
