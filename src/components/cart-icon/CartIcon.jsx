import "./cart-icon.scss";
import { ReactComponent as Cart } from "../../assets/shoping-cart.svg";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart-context/CartContext";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen } = useContext(CartContext);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };
  return (
    <div className="cart-icon-container" onClick={toggleCart}>
      <Cart className="cart-icon" />
      <span className="item-count">0</span>
    </div>
  );
};

export default CartIcon;
