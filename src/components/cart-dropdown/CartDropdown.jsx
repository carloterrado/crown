import { useContext } from "react";
import Button from "../button/Button";
import CartItem from "../cart-item/CartItem";
import "./cart-dropdown.scss";
import { CartContext } from "../../contexts/cart-context/CartContext";
import { useNavigate } from "react-router-dom";

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const gotoCheckOut = () => {
    navigate("/checkout");
  };

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((carItem) => {
          return <CartItem key={carItem.id} cartItem={carItem} />;
        })}
      </div>
      {cartItems.length > 0 ? (
        <Button type="button" onClick={gotoCheckOut}>
          Go to checkout
        </Button>
      ) : (
        <Button type="button">No Items Found</Button>
      )}
    </div>
  );
};

export default CartDropdown;
