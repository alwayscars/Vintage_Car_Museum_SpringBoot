import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const role = sessionStorage.getItem("role");

  if (role !== "ADMIN") {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default AdminRoute;
