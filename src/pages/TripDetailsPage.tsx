import useAxios from "../hooks/useAxios";
import Loader from "../components/Loader";
import { TripDetails } from "../lib/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DataNotFound from "../components/DataNotFound";
import ListingDetails from "../components/ListingDetails";

const TripDetailsPage = () => {
    const customAxios = useAxios();
    const { tripId } = useParams();
    const [loading, setLoading] = useState(true);
    const [trip, setTrip] = useState<TripDetails | null>(null);

    const getListingDetails = async () => {
        try {
            const response = await customAxios.get(`/user/trips/${tripId}`);
            setTrip(response.data);
        } catch (err) {
            console.error("Fetch Listing Details Failed", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { getListingDetails(); }, []);

    return (
        loading ? <Loader /> :
            trip ? <ListingDetails {...trip.listing}
                booking={false}
                days={trip.days}
                endDate={trip.endDate}
                startDate={trip.startDate}
                totalPrice={trip.totalPrice} /> :
                <DataNotFound message="No Data Found" />
    );
};

export default TripDetailsPage;