import { useState } from "react";
import useAxios from "../hooks/useAxios";
import { useDispatch } from "react-redux";
import { FiLogOut } from "react-icons/fi";
import { setLogout } from "../lib/redux/state";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const customAxios = useAxios({ continueCallOnUnmount: true });

    const handleLogOut = async () => {
        try {
            setLoading(true);
            await customAxios.post("/auth/logout");
            dispatch(setLogout());
            navigate("/login");
        } catch (err) {
            console.error(err);
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