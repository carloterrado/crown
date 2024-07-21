import { useContext } from "react";
import { UserContext } from "../../contexts/user-context/UserContext";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { currentUser } = useContext(UserContext);

  return currentUser ? <Outlet /> : <Navigate to={"/auth"} />;
};

export default PrivateRoute;
