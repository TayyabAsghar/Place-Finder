import useAxios from "../hooks/useAxios";
import Loader from "../components/Loader";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ListingCard from "../components/ListingCard";
import { TripListType, UserState } from "../lib/types";

const PropertyListPage = () => {
    const customAxios = useAxios();
    const [loading, setLoading] = useState(true);
    const userId = useSelector((state: UserState) => state.user?._id);
    const [propertyList, setPropertyList] = useState<TripListType[]>([]);

    const getPropertyList = async () => {
        try {
            const response = await customAxios.get(`users/${userId}/properties`);
            setPropertyList(response.data);
        } catch (err) {
            console.log("Fetch all properties failed", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { getPropertyList(); }, []);

    return (
        loading ? <Loader /> :
            <>
                <h1 className="title-list">Your Property List</h1>
                {/* <div className="list">
                {propertyList?.map(
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
                )}
            </div> */}

                <Footer />
            </>
    );
};

export default PropertyListPage;