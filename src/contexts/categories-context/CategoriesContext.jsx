import { createContext, useEffect, useState } from "react";

import {
  addCollectionAndDocuments,
  getCategoriesAndDocuments,
} from "../../utils/firebase/firebase.utils";

const PRODUCT_INITIAL_VALUE = {};

export const CategoriesContext = createContext({
  categories: PRODUCT_INITIAL_VALUE,
});

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState(PRODUCT_INITIAL_VALUE);
  const value = { categories };

  useEffect(() => {
    const getCategories = async () => {
      const categoriesMap = await getCategoriesAndDocuments();
      setCategories(categoriesMap);
    };

    getCategories();
  }, []);

  // useEffect(() => {
  //   setProducts(PRODUCTS ?? PRODUCT_INITIAL_VALUE);
  // }, []);

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
