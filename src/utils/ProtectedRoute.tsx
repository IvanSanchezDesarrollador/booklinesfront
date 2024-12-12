import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, children }: { isAuthenticated: boolean; children: JSX.Element }) => {
  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;