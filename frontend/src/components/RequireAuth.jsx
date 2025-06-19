import { Navigate } from "react-router-dom";

const RequireAuth = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" />;

  try {
    const payload = JSON.parse(atob(token.split(".")[1])); 
    const tipo = payload.tipo; 

    if (!allowedRoles || allowedRoles.includes(tipo)) {
      return children;
    }

    return <Navigate to="/" />; 
  } catch (error) {
    return <Navigate to="/login" />;
  }
};

export default RequireAuth;
