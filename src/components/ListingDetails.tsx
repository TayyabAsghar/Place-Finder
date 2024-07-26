import Booking from "./Booking";
import LikeButton from "./LikeButton";
import { getInitials } from "../lib/utils";
import CustomCarousel from "./CustomCarousel";
import { useNavigate } from "react-router-dom";
import { ListingDetailsProps } from "../lib/types";
import { Facilities } from "../data/categoriesData";
import { Avatar, Button, Tooltip } from "@mui/material";

const ListingDetails = (props: ListingDetailsProps) => {
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;

    return (
        <div className="px-14 py-10 pb-20 w-full">
            <div className="flex justify-between items-start gap-10 mb-5">
                <h1>{props.title}</h1>
                {props.booking ? <LikeButton className="w-10 h-10" listingId={props._id} /> :
                    <Button variant="contained" onClick={() => navigate(`/listing/${props._id}`)}>Open Original Listing</Button>
                }
            </div>
            <CustomCarousel>
                {props.placeDetails.listingPhotoPaths.map((item, index) =>
                    <div className="flex items-center justify-center h-[70vh]" key={index}>
                        <img className="h-full w-full" src={`${apiUrl}${item.replace("public", "")}`} alt="Listing photo" />
                    </div>
                )}
            </CustomCarousel>
            <h2 className="my-6 text-foreground">
                {props.type} in {props.placeDetails.city}, {props.placeDetails.province}, {props.placeDetails.country}
            </h2>
            <p className="text-lg mb-6">
                {props.guestCount} Guest(s) - {props.bedroomCount} Bedroom(s) - {props.bedCount} Bed(s) - {props.bathroomCount} Bathroom(s)
            </p>
            <hr className="border-t-2" />

            <div className="flex gap-5 items-center my-5">
                <Tooltip title={props.creator.name}>
                    {props.creator.avatar ?
                        <Avatar className="!h-14 !w-14" src={`${apiUrl}${props.creator.avatar.replace("public", "")}`}
                            sx={{ bgcolor: 'primary.main' }} alt="profile photo" /> :
                        <Avatar className="!h-14 !w-14" sx={{ bgcolor: 'primary.main', color: 'text.primary' }} >
                            {getInitials(props.creator.name)}
                        </Avatar>
                    }
                </Tooltip>
                <h3 className="text-xl font-bold">{props.creator.name}</h3>
            </div>
            <hr className="border-t-2" />

            <h3 className="text-xl font-bold my-5">Description</h3>
            <p className="mb-5 whitespace-pre-wrap">{props.description}</p>
            <hr className="border-t-2" />

            <h3 className="text-xl font-bold my-5">{props.highlight}</h3>
            <p className="mb-5 whitespace-pre-wrap">{props.highlightDesc}</p>
            <hr className="border-t-2" />

            <div className="flex justify-between gap-4 flex-wrap mt-5">
                <div>
                    <h2 className="text-foreground">What this place offers?</h2>
                    <div className="grid grid-cols-2 gap-x-24 max-w-2xl mt-5">
                        {props.amenities.map((item, index) => (
                            <div className="flex items-center gap-5 text-lg font-semibold mb-5" key={index}>
                                <div className="text-3xl">
                                    {Facilities.find(facility => facility.name === item)?.icon}
                                </div>
                                <p className="m-0">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
                {props.booking ?
                    <Booking booking={true} price={props.price} listingId={props._id} creatorId={props.creator._id} /> :
                    <Booking booking={false} endDate={props.endDate} totalPrice={props.totalPrice} startDate={props.startDate}
                        days={props.days} price={props.price} />
                }
            </div>
        </div>
    );
};

export default ListingDetails;