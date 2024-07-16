import useAxios from "../hooks/useAxios";
import { TripList, UserState } from "../lib/types";
import Loader from "../components/Loader";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ListingCard from "../components/ListingCard";

const ReservationList = () => {
    const customAxios = useAxios();
    const [loading, setLoading] = useState(true);
    const userId = useSelector((state: UserState) => state.user?._id);
    const [reservationList, setReservationList] = useState<TripList[]>([]);

    const getReservationList = async () => {
        try {
            const response = await customAxios.get(`users/${userId}/reservations`);
            setReservationList(response.data);
        } catch (err) {
            console.log("Fetch Reservation List failed!", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { getReservationList(); }, []);

    return (
        loading ?
            <Loader /> :
            <>
                <h1 className="title-list">Your Reservation List</h1>
                {/* <div className="list">
                {reservationList?.map(({ listingId, hostId, startDate, endDate, totalPrice, booking = true }) => (
                    <ListingCard
                        listingId={listingId._id}
                        creator={hostId._id}
                        listingPhotoPaths={listingId.listingPhotoPaths}
                        city={listingId.city}
                        province={listingId.province}
                        country={listingId.country}
                        category={listingId.category}
                        startDate={startDate}
                        endDate={endDate}
                        totalPrice={totalPrice}
                        booking={booking}
                    />
                ))}
            </div> */}
                <Footer />
            </>
    );
};

export default ReservationList;