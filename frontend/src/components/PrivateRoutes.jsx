import useAuthStatus from "./../hooks/useAuthStatus";
import Spinner from "./Spinner";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoutes() {
  const { loading, loginStatus } = useAuthStatus();

  if (loading) {
    return <Spinner />;
  }

  return loginStatus ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;
