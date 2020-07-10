import { useState } from "react";

export function useProducts() {
  const [products, setProducts] = useState([]);
  return {
    products,
    setProducts,
  };
}
