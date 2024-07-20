import { Outlet, Route, Routes } from "react-router-dom";
import Home from "./routes/home/Home";
import Navigation from "./routes/navigation/Navigation";
import Auth from "./routes/auth/Auth";
import Shop from "./routes/shop/Shop";
import { useContext } from "react";
import { CartContext } from "./contexts/cart-context/CartContext";

const categories = [
  {
    id: 1,
    title: "hats",
    imageUrl: "https://i.ibb.co/cvpntL1/hats.png",
  },
  {
    id: 2,
    title: "jackets",
    imageUrl: "https://i.ibb.co/px2tCc3/jackets.png",
  },
  {
    id: 3,
    title: "sneakers",
    imageUrl: "https://i.ibb.co/0jqHpnp/sneakers.png",
  },
  {
    id: 4,
    title: "womens",
    imageUrl: "https://i.ibb.co/GCCdy8t/womens.png",
  },
  {
    id: 5,
    title: "mens",
    imageUrl: "https://i.ibb.co/R70vBrQ/men.png",
  },
];

const App = () => {
  const { isCartOpen, setIsCartOpen } = useContext(CartContext);

  const toggleDropdown = () => {
    isCartOpen && setIsCartOpen(false);
  };
  return (
    <div className="main" onClick={toggleDropdown}>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/auth" element={<Auth />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
