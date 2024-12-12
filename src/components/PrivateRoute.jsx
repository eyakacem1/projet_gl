import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

// Role-based private route
const PrivateRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  if (!user.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />; // Or redirect to a 403 page
  }

  return children;
};

export default PrivateRoute;
