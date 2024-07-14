import Loader from "./Loader";
import useAxios from "../hooks/useAxios";
import DataNotFound from "./DataNotFound";
import "react-date-range/dist/styles.css";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import { getInitials } from "../lib/utils";
import { useEffect, useState } from "react";
import { differenceInDays } from "date-fns";
import CustomCarousel from "./CustomCarousel";
import { Avatar, Button } from "@mui/material";
import "react-date-range/dist/theme/default.css";
import { Facilities } from "../data/categoriesData";
import { useNavigate, useParams } from "react-router-dom";
import { DateRange, RangeKeyDict, Range } from "react-date-range";
import { BookingForm, ListingDetailsType, UserState } from "../lib/types";

const ListingDetails = () => {
    const navigate = useNavigate();
    const customAxios = useAxios();
    const { listingId } = useParams();
    const [dayCount, setDayCount] = useState(1);
    const apiUrl = process.env.REACT_APP_API_URL;
    const [loading, setLoading] = useState(true);
    const [listing, setListing] = useState<ListingDetailsType | null>(null);
    const customerId = useSelector((state: UserState) => state.user?._id ?? "");
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: "selection"
    });
    const handleSelect = (ranges: RangeKeyDict) => {
        const endDate = ranges['selection']?.endDate ?? new Date().getDate();
        const startDate = ranges['selection']?.startDate ?? new Date().getDate();
        setDateRange(ranges['selection']);
        setDayCount(differenceInDays(endDate, startDate) + 1);
    };

    const getListingDetails = async () => {
        try {
            const response = await customAxios.get(`listing/${listingId}`);
            setListing(response.data);
        } catch (err) {
            console.log("Fetch Listing Details Failed", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { getListingDetails(); }, []);

    const handleSubmit = async () => {
        try {
            const bookingForm: BookingForm = {
                customer: customerId,
                listing: listingId ?? "",
                host: listing?.creator._id ?? "",
                endDate: dateRange.endDate ?? new Date(),
                startDate: dateRange.startDate ?? new Date(),
                totalPrice: listing?.price ?? 0 * dayCount
            };

            await customAxios.post("bookings/create", JSON.stringify(bookingForm), "json");
            navigate(`/user/trips`);
        } catch (err) {
            console.log("Submit Booking Failed.", err);
        }
    };

    return (
        <>
            {loading ? <Loader /> :
                listing ?
                    <div className="px-14 py-10 pb-20 w-full">
                        <div className="flex justify-between items-center mb-10">
                            <h1>{listing.title}</h1>
                        </div>
                        <CustomCarousel>
                            {listing.listingPhotoPaths.map((item, index) =>
                                <div className="flex items-center justify-center h-80" key={index}>
                                    <img className="h-full" src={`${apiUrl}${item.replace("public", "")}`} alt="Listing photo" />
                                </div>
                            )}
                        </CustomCarousel>
                        <h2 className="my-6 text-foreground">
                            {listing.type} in {listing.city}, {listing.province}, {listing.country}
                        </h2>
                        <p className="text-lg mb-6">
                            {listing.guestCount} Guest(s) - {listing.bedroomCount} Bedroom(s) - {listing.bedCount} Bed(s) - {listing.bathroomCount} Bathroom(s)
                        </p>
                        <hr className="border-t-2" />

                        <div className="flex gap-5 items-center my-5">
                            {listing.creator.profileImagePath ?
                                <Avatar className="!h-14 !w-14" src={`${apiUrl}${listing.creator.profileImagePath.replace("public", "")}`}
                                    sx={{ bgcolor: 'primary.main' }} alt="profile photo" /> :
                                <Avatar className="!h-14 !w-14" sx={{ bgcolor: 'primary.main', color: 'text.primary' }} >
                                    {getInitials(listing.creator.name)}
                                </Avatar>
                            }
                            <h3 className="text-xl font-bold">{listing.creator.name}</h3>
                        </div>
                        <hr className="border-t-2" />

                        <h3 className="text-xl font-bold my-5">Description</h3>
                        <p className="mb-5">{listing.description}</p>
                        <hr className="border-t-2" />

                        <h3 className="text-xl font-bold my-5">{listing.highlight}</h3>
                        <p className="mb-5">{listing.highlightDesc}</p>
                        <hr className="border-t-2" />

                        <div className="flex justify-between gap-4 flex-wrap mt-5">
                            <div>
                                <h2 className="text-foreground">What this place offers?</h2>
                                <div className="grid grid-cols-2 gap-x-24 max-w-2xl mt-5">
                                    {listing.amenities.map((item, index) => (
                                        <div className="flex items-center gap-5 text-lg font-semibold mb-5" key={index}>
                                            <div className="text-3xl">
                                                {Facilities.find(facility => facility.name === item)?.icon}
                                            </div>
                                            <p className="m-0">{item}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h2 className="text-foreground">How long do you want to stay?</h2>
                                <div className="flex flex-col gap-5 mt-7">
                                    <DateRange rangeColors={["#6D9E8D"]} ranges={[dateRange]} onChange={handleSelect} />
                                    <div className="flex flex-col gap-2">
                                        {dayCount > 1 ? <h2 className="text-foreground">${listing.price} x {dayCount} nights</h2> :
                                            <h2 className="text-foreground">${listing.price} x {dayCount} night</h2>
                                        }
                                        <h2 className="text-foreground">Total price: ${listing.price * dayCount}</h2>
                                    </div>
                                    <div className="flex flex-col gap-2 text-lg">
                                        <p>Start Date: {dateRange.startDate?.toDateString()}</p>
                                        <p>End Date: {dateRange.endDate?.toDateString()}</p>
                                    </div>

                                    <Button className="w-full mt-7" variant="contained" type="submit" onClick={handleSubmit}>
                                        Booking
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div> :
                    <DataNotFound message="No Data Found" />
            }
            <Footer />
        </>
    );
};

export default ListingDetails;