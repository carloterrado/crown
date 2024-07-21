import "./navigation.scss";
import { ReactComponent as TLogo } from "../../assets/crown.svg";
import { ReactComponent as CLogo } from "../../assets/c.svg";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../contexts/user-context/UserContext";
import { CartContext } from "../../contexts/cart-context/CartContext";
import { signOutAuthUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/CartIcon";
import CartDropdown from "../../components/cart-dropdown/CartDropdown";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  const navigate = useNavigate();

  const handleSignOut = () => {
    signOutAuthUser();
  };

  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to={"/"}>
          <TLogo className="logo" />
          <TLogo className="logo" />
        </Link>

        <div className="nav-links-container">
          <Link className="nav-link" to={"/shop"}>
            SHOP
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={handleSignOut}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to={"/auth"}>
              SIGN IN
            </Link>
          )}
          <CartIcon />
        </div>
        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
