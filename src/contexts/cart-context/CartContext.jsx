import { createContext, useEffect, useState } from "react";

const checkItemToAdd = (cartItems, productToAdd) => {
  const found = cartItems.find((item) => item.id === productToAdd.id);

  if (!found) return [...cartItems, { ...productToAdd, quantity: 1 }];

  return cartItems.map((item) => {
    if (item.id === productToAdd.id) {
      item.quantity++;
    }
    return item;
  });
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  totalCount: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const addItemToCart = (productToAdd) => {
    setCartItems(checkItemToAdd(cartItems, productToAdd));
  };

  useEffect(() => {
    const currentCount = cartItems.reduce((count, item) => {
      return count + item.quantity;
    }, 0);

    setTotalCount(currentCount);
  }, [cartItems]);

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    totalCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
