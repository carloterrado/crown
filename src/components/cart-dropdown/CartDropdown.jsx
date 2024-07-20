import { useContext } from "react";
import Button from "../button/Button";
import CartItem from "../cart-item/CartItem";
import "./cart-dropdown.scss";
import { CartContext } from "../../contexts/cart-context/CartContext";

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.length > 0
          ? cartItems.map((carItem) => {
              return <CartItem key={carItem.id} cartItem={carItem} />;
            })
          : "No Item"}
      </div>
      <Button type="button"> Go to checkout</Button>
    </div>
  );
};

export default CartDropdown;
