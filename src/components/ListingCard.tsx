import LikeButton from "./LikeButton";
import CustomCarousel from "./CustomCarousel";
import { useNavigate } from "react-router-dom";
import { ListingCardProps } from "../lib/types";

const ListingCard = (props: ListingCardProps) => {
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;
    const openDetails = () => navigate(props.booking ? `users/trips/${props.tripId}` : `/listing/${props.listingId}`);

    return (
        <div className="flex flex-col cursor-pointer rounded-lg w-80 relative hover:shadow-lg" onClick={openDetails}>
            <div>
                <CustomCarousel indicators={false} autoPlay={false}>
                    {props.listingPhotoPaths?.map((photo, index) => (
                        <div className="flex h-64 items-center justify-center" key={index}>
                            <img className="h-full w-full rounded-t-lg" src={`${apiUrl}${photo.replace("public", "")}`} alt="Listing photo" />
                        </div>
                    ))}
                </CustomCarousel>
            </div>
            <div className="flex flex-col text-lg p-4">
                <div className="text-xl font-bold">
                    {props.city}, {props.province}, {props.country}
                </div>
                <div>{props.category}</div>
                <div>
                    {props.booking ?
                        <>
                            {/* <p>{props.startDate} - {props.endDate}</p> */}
                            <p>
                                <span className="font-semibold">${props.totalPrice}</span> total
                            </p>
                        </> :
                        <>
                            <p>{props.type}</p>
                            <p>
                                <span className="text-xl font-bold">${props.price}</span> per night
                            </p>
                        </>
                    }
                </div>

                {!props.booking &&
                    <LikeButton className="absolute z-10 right-4 top-4 px-0.5 pb-0.5" listingId={props.listingId} />
                }
            </div>
        </div>

    );
};

export default ListingCard;