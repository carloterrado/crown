import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./routes/home/Home";
import Navigation from "./routes/navigation/Navigation";
import Auth from "./routes/auth/Auth";
import Shop from "./routes/shop/Shop";
import CheckOut from "./routes/checkout/Checkout";
import PrivateRoute from "./routes/private-route/PrivateRoute";
import { useContext } from "react";
import { UserContext } from "./contexts/user-context/UserContext";
import Hide from "./routes/hide/Hide";

const App = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <div className="main">
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="/shop/*" element={<Shop />} />
          <Route element={<Hide />}>
            <Route path="/auth" element={<Auth />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/checkout" element={<CheckOut />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
