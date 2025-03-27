import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ redirectTo = "/auth/login" }) {
  const { checkIsUserInStorage } = useAuth();

  return checkIsUserInStorage() ? <Outlet /> : <Navigate to={redirectTo} replace />;
}