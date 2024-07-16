import { TripList } from "../lib/types";
import useAxios from "../hooks/useAxios";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ListingCard from "../components/ListingCard";

const SearchPage = () => {
    const customAxios = useAxios();
    const { search } = useParams();
    const [loading, setLoading] = useState(true);
    const [listings, setListings] = useState<TripList[]>([]);

    const getSearchListings = async () => {
        try {
            const response = await customAxios.get(`properties/search/${search?.toLowerCase()}`);
            setListings(response.data);
        } catch (err) {
            console.log("Fetch Search List failed!", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { getSearchListings(); }, [search]);

    return loading ? <Loader /> : (
        <>
            <h1 className="title-list">{search}</h1>
            <div className="list">
                {/* {listings?.map(
                    ({
                        _id,
                        creator,
                        listingPhotoPaths,
                        city,
                        province,
                        country,
                        category,
                        type,
                        price,
                        booking = false,
                    }) => (
                        <ListingCard
                            listingId={_id}
                            creator={creator}
                            listingPhotoPaths={listingPhotoPaths}
                            city={city}
                            province={province}
                            country={country}
                            category={category}
                            type={type}
                            price={price}
                            booking={booking}
                        />
                    )
                )} */}
            </div>
            <Footer />
        </>
    );
};

export default SearchPage;