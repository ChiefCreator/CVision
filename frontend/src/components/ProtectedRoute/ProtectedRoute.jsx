import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ redirectTo = "/auth/login" }) {
  const { userAuth, userAuthLoading } = useAuth();

  if (userAuthLoading) {
    return null;
  }

  return userAuth ? <Outlet /> : <Navigate to={redirectTo} replace />;
}