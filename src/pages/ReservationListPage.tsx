import useAxios from "../hooks/useAxios";
import Loader from "../components/Loader";
import { useEffect, useState } from "react";
import { TripListType } from "../lib/types";
import { useNavigate } from "react-router-dom";
import ListingCard from "../components/ListingCard";
import DataNotFound from "../components/DataNotFound";

const ReservationListPage = () => {
    const navigate = useNavigate();
    const customAxios = useAxios();
    const [loading, setLoading] = useState(true);
    const [reservationList, setReservationList] = useState<TripListType[]>([]);

    const getReservationList = async () => {
        try {
            const response = await customAxios.get(`/user/reservations`);
            setReservationList(response.data);
        } catch (err) {
            console.error("Fetch Reservation List failed!", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { getReservationList(); }, []);

    return (
        <div className="flex grow flex-col gap-5 px-14 py-10 pb-20 w-full">
            <h1 className="title-list">Your Reservation List</h1>
            {loading ? <Loader /> :
                reservationList.length ?
                    <div className="flex flex-wrap gap-10">
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