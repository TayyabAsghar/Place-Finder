import useAxios from "../hooks/useAxios";
import ReactError from "../lib/reactError";
import { Favorite } from "@mui/icons-material";
import { setWishList } from "../lib/redux/state";
import { IconButton, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import useNotification from "../hooks/useNotification";
import { type MouseEvent as RME, useState } from "react";
import type { LikeButtonProps, UserState } from "../lib/types";

const LikeButton = (props: LikeButtonProps) => {
    const customAxios = useAxios();
    const dispatch = useDispatch();
    const { setNotification } = useNotification();
    const [loading, setLoading] = useState(false);
    const user = useSelector((state: UserState) => state.user);
    const wishList = user?.wishList || [];
    const isLiked = wishList?.includes(props.listingId);

    if (!user) return <></>;

    const patchWishList = async (e: RME<HTMLButtonElement, MouseEvent>) => {
        try {
            setLoading(true);
            e.stopPropagation();
            const response = await customAxios.patch(`/user/${props.listingId}`, undefined, 'json');
            dispatch(setWishList(response.data.list));
        } catch (err) {
            if (err && err instanceof ReactError)
                setNotification({ message: err.message, severity: "error" });
        } finally {
            setLoading(false);
        }
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