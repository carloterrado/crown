import { useContext } from "react";
import "./checkout-item.scss";
import { CartContext } from "../../contexts/cart-context/CartContext";
import { currency } from "../../utils/numbers/number.utils";

const CheckOutItem = ({ cartItem }) => {
  const { name, price, imageUrl, quantity } = cartItem;

  const { addItemToCart, reduceItemFromCart, clearItemFromCart } =
    useContext(CartContext);

  const addQuantity = () => addItemToCart(cartItem);
  const reduceQuantity = () => reduceItemFromCart(cartItem);
  const clearItem = () => clearItemFromCart(cartItem);

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <i className="arrow" onClick={reduceQuantity}>
          &#10094;
        </i>
        <em className="value">{quantity}</em>{" "}
        <i className="arrow" onClick={addQuantity}>
          &#10095;
        </i>
      </span>
      <span className="price">{currency(price)}</span>
      <div className="remove-button" onClick={clearItem}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckOutItem;
