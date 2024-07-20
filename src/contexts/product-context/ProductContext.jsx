import { createContext, useEffect, useState } from "react";
import PRODUCTS from "../../shop-data.json";

const PRODUCT_INITIAL_VALUE = [];

export const ProductContext = createContext({
  products: PRODUCT_INITIAL_VALUE,
  setProducts: () => {},
});

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(PRODUCT_INITIAL_VALUE);
  const value = { products, setProducts };

  useEffect(() => {
    setProducts(PRODUCTS ?? PRODUCT_INITIAL_VALUE);
  }, []);

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
