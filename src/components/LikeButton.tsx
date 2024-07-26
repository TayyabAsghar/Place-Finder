import useAxios from "../hooks/useAxios";
import { Favorite } from "@mui/icons-material";
import { setWishList } from "../lib/redux/state";
import { IconButton, Tooltip } from "@mui/material";
import { MouseEvent as RME, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LikeButtonProps, UserState } from "../lib/types";

const LikeButton = (props: LikeButtonProps) => {
    const customAxios = useAxios();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const user = useSelector((state: UserState) => state.user);
    const wishList = user?.wishList || [];
    const isLiked = wishList?.includes(props.listingId);

    if (!user) return <></>;

    const patchWishList = async (e: RME<HTMLButtonElement, MouseEvent>) => {
        setLoading(true);
        e.stopPropagation();
        const response = await customAxios.patch(`/user/${props.listingId}`, undefined, 'json');
        dispatch(setWishList(response.data.list));
        setLoading(false);
    };

    return (
        <Tooltip title={`${isLiked ? "Remove from" : "Add to"} Wish List`}>
            <div className={`cursor-pointer ${props.className}`}>
                <IconButton disabled={loading} onClick={e => patchWishList(e)}>
                    {isLiked ? <Favorite className="stroke-accent text-accent" /> :
                        <Favorite className="stroke-accent text-transparent" />}
                </IconButton>
            </div>
        </Tooltip>
    );
};

export default LikeButton;