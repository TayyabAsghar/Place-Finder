import { useState } from "react";
import useAxios from "../hooks/useAxios";
import { useDispatch } from "react-redux";
import { FiLogOut } from "react-icons/fi";
import ReactError from "../lib/ReactError";
import { setLogout } from "../lib/redux/state";
import { useNavigate } from "react-router-dom";
import useNotification from "../hooks/useNotification";

const LogOut = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { setNotification } = useNotification();
    const [loading, setLoading] = useState(false);
    const customAxios = useAxios({ continueCallOnUnmount: true });

    const handleLogOut = async () => {
        try {
            setLoading(true);
            await customAxios.post("/auth/logout");
            dispatch(setLogout());
            navigate("/login");
        } catch (err) {
            if (err && err instanceof ReactError)
                setNotification({ message: err.message, severity: "error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <button className="profile-dropdown" onClick={handleLogOut} disabled={loading}>
            <FiLogOut />
            Log Out
        </button>
    );
};

export default LogOut;