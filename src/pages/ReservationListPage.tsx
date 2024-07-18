import useAxios from "../hooks/useAxios";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingCard from "../components/ListingCard";
import DataNotFound from "../components/DataNotFound";
import { TripListType, UserState } from "../lib/types";

const ReservationListPage = () => {
    const navigate = useNavigate();
    const customAxios = useAxios();
    const [loading, setLoading] = useState(true);
    const userId = useSelector((state: UserState) => state.user?._id);
    const [reservationList, setReservationList] = useState<TripListType[]>([]);

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
        <div className="flex grow flex-col gap-5 px-14 py-10 pb-20 w-full">
            <h1 className="title-list">Your Reservation List</h1>
            {loading ? <Loader /> :
                reservationList.length ?
                    <div className="flex flex-wrap gap-10">
                        {reservationList.map((item, index) => (
                            <ListingCard
                                key={index}
                                booking={false}
                                tripId={item._id}
                                endDate={item.endDate}
                                city={item.listing.city}
                                startDate={item.startDate}
                                totalPrice={item.totalPrice}
                                country={item.listing.country}
                                province={item.listing.province}
                                category={item.listing.category}
                                listingPhotoPaths={item.listing.listingPhotoPaths}
                                onClick={() => navigate(`/user/reservations/${item._id}`)}
                            />
                        ))}
                    </div> :
                    <DataNotFound message="No Data Found" />
            }
        </div >
    );
};

export default ReservationListPage;