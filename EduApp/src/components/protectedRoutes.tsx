import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";
import type { ProtectedRouteProps } from "../types/types";
import { Ellipsis } from "lucide-react";
import { useEffect, useState } from "react";

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const { currentUser, roles, loading } = useAuth();
  const [delayLoading, setDelayLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => setDelayLoading(false), 500); 
    return () => clearTimeout(timer);
  }, []);

  if (loading || delayLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-teal-100 to-teal-600">
        <Ellipsis className="animate-pulse text-teal-500 " size={150} />
      </div>
    );
  }

  const isAuthorized =
    currentUser && allowedRoles.some((r) => roles.includes(r));

  if (!isAuthorized) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
