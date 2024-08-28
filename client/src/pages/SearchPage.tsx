import useAxios from "../hooks/useAxios";
import Loader from "../components/Loader";
import ReactError from "../lib/reactError";
import { useEffect, useState } from "react";
import ListingCard from "../components/ListingCard";
import DataNotFound from "../components/DataNotFound";
import type { ListingDetailsType } from "../lib/types";
import useNotification from "../hooks/useNotification";
import { useNavigate, useSearchParams } from "react-router-dom";

const SearchPage = () => {
    const navigate = useNavigate();
    const customAxios = useAxios();
    const [URLSearchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
    const { setNotification } = useNotification();
    const searchQuery = URLSearchParams.get('query');
    const [listings, setListings] = useState<ListingDetailsType[]>([]);

    const getSearchListings = async () => {
        try {
            if (searchQuery) {
                const response = await customAxios.get(`/listing/search?q=${searchQuery.toLowerCase()}`, "skip-authorization");
                setListings(response.data);
            } else setListings([]);
        } catch (err) {
            if (err && err instanceof ReactError)
                setNotification({ message: err.message, severity: "error" });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { getSearchListings(); }, [searchQuery]);

    return (
        <div className="card-list-page">
            <h1 className="w-4/5 text-ellipsis overflow-hidden whitespace-nowrap">{searchQuery}</h1>
            {loading ? <Loader /> :
                listings.length ?
                    <div className="card-container">
                        {listings.map((item, index) =>
                            <ListingCard
                                key={index}
                                booking={true}
                                type={item.type}
                                price={item.price}
                                listingId={item._id}
                                placeDetails={item.placeDetails}
                                onClick={() => navigate(`/listing/${item._id}`)}
                            />
                        )}
                    </div> :
                    <DataNotFound message="No Search Results" />
            }
        </div>
    );
};

export default SearchPage;