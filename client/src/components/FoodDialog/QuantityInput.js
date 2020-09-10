import React from "react";

export function QuantityInput({ quantity }) {
  return (
    <div>
      <div>Quantity: </div>
      <input {...quantity} type="text" name="name" />
      <button
        onClick={() => {
          quantity.setValue(quantity.value - 1);
        }}
        disabled={quantity.value === 1}
      >
        {" "}
        -{" "}
      </button>
      <button
        onClick={() => {
          quantity.setValue(quantity.value + 1);
        }}
      >
        {" "}
        +
      </button>
    </div>
  );
}
