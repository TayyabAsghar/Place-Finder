import useAxios from "../hooks/useAxios";
import Loader from "../components/Loader";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ReservationDetails } from "../lib/types";
import DataNotFound from "../components/DataNotFound";
import ListingDetails from "../components/ListingDetails";

const ReservationDetailsPage = () => {
    const { resId } = useParams();
    const customAxios = useAxios();
    const [loading, setLoading] = useState(true);
    const [reservation, setReservation] = useState<ReservationDetails | null>(null);

    const getListingDetails = async () => {
        try {
            const response = await customAxios.get(`booking/reservations/${resId}`);
            setReservation(response.data);
        } catch (err) {
            console.log("Fetch Listing Details Failed", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { getListingDetails(); }, []);

    return (
        loading ? <Loader /> :
            reservation ? <ListingDetails {...reservation.listing}
                booking={false}
                days={reservation.days}
                endDate={reservation.endDate}
                creator={reservation.customer}
                startDate={reservation.startDate}
                totalPrice={reservation.totalPrice} /> :
                <DataNotFound message="No Data Found" />
    );
};

export default ReservationDetailsPage;