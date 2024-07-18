import LikeButton from "./LikeButton";
import { parseDate } from "../lib/utils";
import CustomCarousel from "./CustomCarousel";
import { ListingCardProps } from "../lib/types";

const ListingCard = (props: ListingCardProps) => {
    const apiUrl = process.env.REACT_APP_API_URL;

    return (
        <div className="flex flex-col cursor-pointer rounded-lg w-[326px] relative bg-secondary-100 bg-opacity-50 hover:shadow-lg"
            onClick={props.onClick}>
            <div>
                <CustomCarousel indicators={false}>
                    {props.listingPhotoPaths?.map((photo, index) => (
                        <div className="flex h-64 items-center justify-center" key={index}>
                            <img className="h-full w-full rounded-t-lg" src={`${apiUrl}${photo.replace("public", "")}`} alt="Property" />
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
                            <p>{props.type}</p>
                            <p>
                                <span className="font-extrabold">${props.price}</span> per night
                            </p>
                        </> :
                        <>
                            <p>{parseDate(props.startDate)}
                                {props.startDate !== props.endDate &&
                                    <span> - {parseDate(props.endDate)}</span>
                                }
                            </p>
                            <p>
                                <span className="font-extrabold">${props.totalPrice}</span> total
                            </p>
                        </>
                    }
                </div>

                {props.booking &&
                    <LikeButton className="absolute z-10 right-4 top-4 px-0.5 pb-0.5" listingId={props.listingId} />
                }
            </div>
        </div>

    );
};

export default ListingCard;