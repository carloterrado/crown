import { createContext, useEffect, useState } from "react";

const checkItemToAdd = (cartItems, productToAdd) => {
  const found = cartItems.find((item) => item.id === productToAdd.id);

  if (!found) return [...cartItems, { ...productToAdd, quantity: 1 }];

  return cartItems.map((item) => {
    item.id === productToAdd.id && item.quantity++;
    return item;
  });
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  totalCount: 0,
  totalAmount: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const clearItemFromCart = (productToRemove) => {
    const newCart = cartItems.filter((item) => {
      return item.id !== productToRemove.id;
    });

    setCartItems(newCart);
  };

  const addItemToCart = (productToAdd) => {
    setCartItems(checkItemToAdd(cartItems, productToAdd));
  };

  const reduceItemFromCart = (productToReduce) => {
    if (productToReduce.quantity === 1) {
      clearItemFromCart(productToReduce);
      return;
    }
    const newCartItems = cartItems.map((item) => {
      item.id === productToReduce.id && item.quantity--;
      return item;
    });

    setCartItems(newCartItems);
  };

  useEffect(() => {
    const INITIAL_COUNT = 0,
      INITIAL_AMOUNT = 0;

    const [totalCount, totalAmount] = cartItems.reduce(
      ([count, amount], item) => {
        return [count + item.quantity, amount + item.quantity * item.price];
      },
      [INITIAL_COUNT, INITIAL_AMOUNT]
    );

    setTotalCount(totalCount);
    setTotalAmount(totalAmount);
  }, [cartItems]);

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    reduceItemFromCart,
    clearItemFromCart,
    totalCount,
    totalAmount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
