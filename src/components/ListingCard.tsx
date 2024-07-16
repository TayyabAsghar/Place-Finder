import useAxios from "../hooks/useAxios";
import CustomCarousel from "./CustomCarousel";
import { useNavigate } from "react-router-dom";
import { Favorite } from "@mui/icons-material";
import { setWishList } from "../lib/redux/state";
import { useDispatch, useSelector } from "react-redux";
import { ListingCardProps, UserState } from "../lib/types";

const ListingCard = (props: ListingCardProps) => {
    const navigate = useNavigate();
    const customAxios = useAxios();
    const dispatch = useDispatch();
    const apiUrl = process.env.REACT_APP_API_URL;
    const user = useSelector((state: UserState) => state.user);
    const wishList = user?.wishList || [];
    const openDetails = () => navigate(props.booking ? `users/trips/${props.tripId}` : `/listing/${props.listingId}`);

    const likeButton = () => {
        if (!props.booking && user) {
            const isLiked = wishList?.find(item => item?._id === props.listingId);

            const patchWishList = async () => {
                const response = await customAxios.patch(`users/${user?._id}/${props.listingId}`, null, 'json');
                dispatch(setWishList(response.data));
            };

            return (
                <button className="absolute right-5 top-5 cursor-pointer" onClick={() => patchWishList()} >
                    {isLiked ? <Favorite sx={{ color: "red" }} /> : <Favorite sx={{ color: "white" }} />}
                </button>
            );
        }
        return <></>;
    };

    return (
        <div className="cursor-pointer rounded-lg w-80 relative hover:shadow-lg" onClick={openDetails}>
            <div>
                <CustomCarousel indicators={false} autoPlay={false}>
                    {props.listingPhotoPaths?.map((photo, index) => (
                        <div className="flex items-center justify-center" key={index}>
                            <img className="h-full w-full" src={`${apiUrl}${photo.replace("public", "")}`} alt="Listing photo" />
                        </div>
                    ))}
                </CustomCarousel>
            </div>
            <div className="text-lg">
                {props.city}, {props.province}, {props.country}
            </div>
            <div>{props.category}</div>

            {props.booking ?
                <>
                    {/* <p>{props.startDate} - {props.endDate}</p> */}
                    <p><span>${props.totalPrice}</span> total</p>
                </> :
                <>
                    <p>{props.type}</p>
                    <p><span>${props.price}</span> per night</p>
                </>
            }
            {likeButton()}
        </div>

    );
};

export default ListingCard;