import useAxios from "../hooks/useAxios";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ListingCard from "../components/ListingCard";
import DataNotFound from "../components/DataNotFound";
import { TripListType, UserState } from "../lib/types";

const TripListPage = () => {
    const customAxios = useAxios();
    const [loading, setLoading] = useState(true);
    const user = useSelector((state: UserState) => state?.user);
    const [tripList, setTripList] = useState<TripListType[]>([]);

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
        <div className="flex grow flex-col gap-5 px-14 py-10 pb-20 w-full">
            <h1>Your Trip List</h1>
            {loading ? <Loader /> :
                tripList.length ?
                    <div className="flex flex-wrap gap-10">
                        {tripList.map((item, index) => (
                            <ListingCard
                                key={index}
                                booking={true}
                                tripId={item._id}
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
                    </div> :
                    <DataNotFound message="No Data Found" />
            }
        </div>
    );
};

export default TripListPage;