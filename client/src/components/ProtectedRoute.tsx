import type { UserState } from "../lib/types";
import { setLogout } from "../lib/redux/state";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const isLoggedIn = useSelector((state: UserState) => state.isLoggedIn);

    if (isLoggedIn) return <Outlet />;

    dispatch(setLogout());
    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default ProtectedRoute;