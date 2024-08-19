import useAxios from "../hooks/useAxios";
import Loader from "../components/Loader";
import ReactError from "../lib/reactError";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingCard from "../components/ListingCard";
import DataNotFound from "../components/DataNotFound";
import type { ListingDetailsType } from "../lib/types";
import useNotification from "../hooks/useNotification";

const PropertyListPage = () => {
    const navigate = useNavigate();
    const customAxios = useAxios();
    const [loading, setLoading] = useState(true);
    const { setNotification } = useNotification();
    const [wishList, setPropertyList] = useState<ListingDetailsType[]>([]);

    const getPropertyList = async () => {
        try {
            const response = await customAxios.get(`/user/properties`);
            setPropertyList(response.data);
        } catch (err) {
            if (err && err instanceof ReactError)
                setNotification({ message: err.message, severity: "error" });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { getPropertyList(); }, []);

    return (
        <div className="card-list-page">
            <h1>Your Property List</h1>
            {loading ? <Loader /> :
                wishList.length ?
                    <div className="card-container">
                        {wishList.map((item, index) =>
                            <ListingCard
                                key={index}
                                booking={true}
                                type={item.type}
                                price={item.price}
                                listingId={item._id}
                                placeDetails={item.placeDetails}
                                onClick={() => navigate(`/user/properties/${item._id}`)}
                            />
                        )}
                    </div> :
                    <DataNotFound message="No Data Found" />
            }
        </div>
    );
};

export default PropertyListPage;