import useAxios from "../hooks/useAxios";
import Loader from "../components/Loader";
import ReactError from "../lib/ReactError";
import { TripListType } from "../lib/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingCard from "../components/ListingCard";
import DataNotFound from "../components/DataNotFound";
import useNotification from "../hooks/useNotification";

const TripListPage = () => {
    const navigate = useNavigate();
    const customAxios = useAxios();
    const [loading, setLoading] = useState(true);
    const { setNotification } = useNotification();
    const [tripList, setTripList] = useState<TripListType[]>([]);

    const getTripList = async () => {
        try {
            const response = await customAxios.get(`/user/trips`);
            setTripList(response.data);
        } catch (err) {
            if (err && err instanceof ReactError)
                setNotification({ message: err.message, severity: "error" });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { getTripList(); }, []);

    return (
        <div className="card-list-page">
            <h1>Your Trip List</h1>
            {loading ? <Loader /> :
                tripList.length ?
                    <div className="card-container">
                        {tripList.map((item, index) =>
                            <ListingCard
                                key={index}
                                booking={false}
                                tripId={item._id}
                                endDate={item.endDate}
                                startDate={item.startDate}
                                totalPrice={item.totalPrice}
                                placeDetails={item.placeDetails}
                                onClick={() => navigate(`/user/trips/${item._id}`)}
                            />
                        )}
                    </div> :
                    <DataNotFound message="No Data Found" />
            }
        </div>
    );
};

export default TripListPage;