import Footer from "./Footer";
import useAxios from "../hooks/useAxios";
import Loader from "../components/Loader";
import DataNotFound from "./DataNotFound";
import { useEffect, useState } from "react";
import ListingCard from "../components/ListingCard";
import { TripListType, UserState } from "../lib/types";
import { useDispatch, useSelector } from "react-redux";

const TripList = () => {
    const customAxios = useAxios();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [tripList, setTripList] = useState<TripListType[]>([]);
    const user = useSelector((state: UserState) => state?.user);

    const getTripList = async () => {
        try {
            const response = await customAxios.get(`users/${user?._id}/trips`);
            setTripList(response.data);
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
                tripList.length ?
                    <div className="px-14 py-10 pb-20 w-full">
                        <h1>Your Trip List</h1>
                        <div className="">
                            {tripList.map((item, index) => (
                                <ListingCard
                                    key={index}
                                    tripId={item._id}
                                    booking={true}
                                    endDate={item.endDate}
                                    city={item.listing.city}
                                    startDate={item.startDate}
                                    totalPrice={item.totalPrice}
                                    country={item.listing.country}
                                    province={item.listing.province}
                                    category={item.listing.category}
                                    listingPhotoPaths={item.listing.listingPhotoPaths}
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