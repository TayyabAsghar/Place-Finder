import useAxios from "../hooks/useAxios";
import { Favorite } from "@mui/icons-material";
import { setWishList } from "../lib/redux/state";
import { useDispatch, useSelector } from "react-redux";
import { LikeButtonProps, UserState } from "../lib/types";

const LikeButton = (props: LikeButtonProps) => {
    const customAxios = useAxios();
    const dispatch = useDispatch();
    const user = useSelector((state: UserState) => state.user);
    const wishList = user?.wishList || [];
    const isLiked = wishList?.find(item => item?._id === props.listingId);

    if (!user) return <></>;

    const patchWishList = async () => {
        const response = await customAxios.patch(`users/${user?._id}/${props.listingId}`, null, 'json');
        dispatch(setWishList(response.data));
    };

    return (
        <button className={`cursor-pointer ${props.className}`} onClick={() => patchWishList()} >
            {isLiked ? <Favorite className="stroke-accent text-accent" /> :
                <Favorite className="stroke-accent text-transparent" />}
        </button>
    );
};

export default LikeButton;