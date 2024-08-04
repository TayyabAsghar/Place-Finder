import useAxios from "../hooks/useAxios";
import Loader from "../components/Loader";
import ReactError from "../lib/reactError";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { TripListType } from "../lib/types";
import ListingCard from "../components/ListingCard";
import DataNotFound from "../components/DataNotFound";
import useNotification from "../hooks/useNotification";

const ReservationListPage = () => {
    const navigate = useNavigate();
    const customAxios = useAxios();
    const [loading, setLoading] = useState(true);
    const { setNotification } = useNotification();
    const [reservationList, setReservationList] = useState<TripListType[]>([]);

    const getReservationList = async () => {
        try {
            const response = await customAxios.get(`/user/reservations`);
            setReservationList(response.data);
        } catch (err) {
            if (err && err instanceof ReactError)
                setNotification({ message: err.message, severity: "error" });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { getReservationList(); }, []);

    return (
        <div className="card-list-page">
            <h1 className="title-list">Your Reservation List</h1>
            {loading ? <Loader /> :
                reservationList.length ?
                    <div className="card-container">
                        {reservationList.map((item, index) =>
                            <ListingCard
                                key={index}
                                booking={false}
                                tripId={item._id}
                                endDate={item.endDate}
                                startDate={item.startDate}
                                totalPrice={item.totalPrice}
                                placeDetails={item.placeDetails}
                                onClick={() => navigate(`/user/reservations/${item._id}`)}
                            />
                        )}
                    </div> :
                    <DataNotFound message="No Data Found" />
            }
        </div >
    );
};

export default ReservationListPage;