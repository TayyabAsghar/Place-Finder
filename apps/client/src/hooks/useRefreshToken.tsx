import axios from "axios";
import { useDispatch } from "react-redux";
import { setToken } from "../lib/redux/state";

const useRefreshToken = () => {
    const dispatch = useDispatch();

    const refresh = async () => {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/refresh`, {}, { withCredentials: true });
        dispatch(setToken(response.data));
    };

    return refresh;
};

export default useRefreshToken;