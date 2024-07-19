import { Tooltip } from "@mui/material";
import useAxios from "../hooks/useAxios";
import { MouseEvent as RME } from "react";
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

    const patchWishList = async (e: RME<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        const response = await customAxios.patch(`users/${user?._id}/${props.listingId}`, undefined, 'json');
        dispatch(setWishList(response.data));
    };

    return (
        <Tooltip title="Add to Wish List">
            <button className={`cursor-pointer ${props.className}`} onClick={e => patchWishList(e)}>
                {isLiked ? <Favorite className="stroke-accent text-accent" /> :
                    <Favorite className="stroke-accent text-transparent" />}
            </button>
        </Tooltip>
    );
};

export default LikeButton;