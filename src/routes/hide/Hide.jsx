import { useContext } from "react";
import { UserContext } from "../../contexts/user-context/UserContext";
import { Navigate, Outlet } from "react-router-dom";

const Hide = () => {
  const { currentUser } = useContext(UserContext);
  return currentUser ? <Navigate to={"/"} /> : <Outlet />;
};

export default Hide;
