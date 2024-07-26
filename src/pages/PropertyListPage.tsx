import useAxios from "../hooks/useAxios";
import Loader from "../components/Loader";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ListingDetailsType } from "../lib/types";
import ListingCard from "../components/ListingCard";
import DataNotFound from "../components/DataNotFound";

const PropertyListPage = () => {
    const navigate = useNavigate();
    const customAxios = useAxios();
    const [loading, setLoading] = useState(true);
    const [wishList, setPropertyList] = useState<ListingDetailsType[]>([]);

    const getPropertyList = async () => {
        try {
            const response = await customAxios.get(`/user/properties`);
            setPropertyList(response.data);
        } catch (err) {
            console.error("Fetch Trip List failed!", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { getPropertyList(); }, []);

    return (
        <div className="flex grow flex-col gap-5 px-14 py-10 pb-20 w-full">
            <h1>Your Property List</h1>
            {loading ? <Loader /> :
                wishList.length ?
                    <div className="flex flex-wrap gap-10">
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