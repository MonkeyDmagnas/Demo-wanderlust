import { Navigate, Outlet } from "react-router-dom";
import useAuthData from "../hooks/useAuth";

function UnprotectedRoute() {
  const { token } = useAuthData();

  return token ? <Navigate to="/" /> : <Outlet />;
}

export default UnprotectedRoute;
