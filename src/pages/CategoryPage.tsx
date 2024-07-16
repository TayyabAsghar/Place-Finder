import { TripList } from "../lib/types";
import useAxios from "../hooks/useAxios";
import Loader from "../components/Loader";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ListingCard from "../components/ListingCard";

const CategoryPage = () => {
    const customAxios = useAxios();
    const { category } = useParams();
    const [loading, setLoading] = useState(true);
    const [listings, setListings] = useState<TripList[]>([]);

    const getFeedListings = async () => {
        try {
            const response = await customAxios.get(`properties?category=${category}`);
            setListings(response.data);
        } catch (err) {
            console.log("Fetch Listings Failed", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { getFeedListings(); }, [category]);

    return loading ? (
        <Loader />
    ) : (
        <>
            <h1 className="title-list">{category} listings</h1>
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

export default CategoryPage;