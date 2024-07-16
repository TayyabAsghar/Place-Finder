import Footer from "./Footer";
import useAxios from "../hooks/useAxios";
import { UserState } from "../lib/types";
import Loader from "../components/Loader";
import DataNotFound from "./DataNotFound";
import { useEffect, useState } from "react";
import { setTripList } from "../lib/redux/state";
import ListingCard from "../components/ListingCard";
import { useDispatch, useSelector } from "react-redux";

const TripList = () => {
    const customAxios = useAxios();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const user = useSelector((state: UserState) => state?.user);

    const getTripList = async () => {
        try {
            const response = await customAxios.get(`users/${user?._id}/trips`);
            dispatch(setTripList(response.data));
        } catch (err) {
            console.error("Fetch Trip List failed!", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { getTripList(); }, []);

    return (
        <>
            {loading ? <Loader /> :
                user?.tripList.length ?
                    <div className="px-14 py-10 pb-20 w-full">
                        <h1>Your Trip List</h1>
                        <div className="">
                            {user.tripList.map(({ _id, listing, startDate, endDate, totalPrice }) => (
                                <ListingCard
                                    tripId={_id}
                                    booking={true}
                                    endDate={endDate}
                                    city={listing.city}
                                    startDate={startDate}
                                    totalPrice={totalPrice}
                                    country={listing.country}
                                    province={listing.province}
                                    category={listing.category}
                                    listingPhotoPaths={listing.listingPhotoPaths}
                                />
                            ))}
                        </div>
                    </div> :
                    <DataNotFound message="No Data Found" />
            }
            <Footer />
        </>
    );
};

export default TripList;