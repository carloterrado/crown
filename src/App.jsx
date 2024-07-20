import { Route, Routes } from "react-router-dom";
import Home from "./routes/home/Home";
import Navigation from "./routes/navigation/Navigation";
import Auth from "./routes/auth/Auth";
import Shop from "./routes/shop/Shop";

const App = () => {
  return (
    <div className="main">
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
