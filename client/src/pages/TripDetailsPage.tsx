import useAxios from "../hooks/useAxios";
import Loader from "../components/Loader";
import ReactError from "../lib/reactError";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { TripDetails } from "../lib/types";
import DataNotFound from "../components/DataNotFound";
import useNotification from "../hooks/useNotification";
import ListingDetails from "../components/ListingDetails";

const TripDetailsPage = () => {
    const customAxios = useAxios();
    const { tripId } = useParams();
    const [loading, setLoading] = useState(true);
    const { setNotification } = useNotification();
    const [trip, setTrip] = useState<TripDetails | null>(null);

    const getListingDetails = async () => {
        try {
            const response = await customAxios.get(`/user/trips/${tripId}`);
            setTrip(response.data);
        } catch (err) {
            if (err && err instanceof ReactError)
                setNotification({ message: err.message, severity: "error" });
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