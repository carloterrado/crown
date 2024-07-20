import { useContext } from "react";
import "./checkout.scss";
import { CartContext } from "../../contexts/cart-context/CartContext";
import { currency } from "../../utils/numbers/number.utils.js";
import CheckOutItem from "../../components/checkout-item/CheckoutItem.jsx";

const CheckOut = () => {
  const { cartItems, totalAmount } = useContext(CartContext);

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      <div className="checkout-body">
        {cartItems.map((cartItem) => {
          return <CheckOutItem key={cartItem.id} cartItem={cartItem} />;
        })}
      </div>

      <span className="total">Total: {currency(totalAmount)}</span>
    </div>
  );
};

export default CheckOut;
