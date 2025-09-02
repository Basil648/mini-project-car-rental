import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const location = useLocation();

  if (!isLoggedIn) {
    // Only pass `from` if the user was trying to access a protected route
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
