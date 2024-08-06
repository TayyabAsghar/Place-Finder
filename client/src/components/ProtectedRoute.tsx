import { useSelector } from "react-redux";
import type { UserState } from "../lib/types";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
    const location = useLocation();
    const isLoggedIn = useSelector((state: UserState) => state.isLoggedIn);

    if (isLoggedIn) return <Outlet />;
    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default ProtectedRoute;