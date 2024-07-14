import Loader from "./Loader";
import ListingCard from "./ListingCard";
import useAxios from "../hooks/useAxios";
import { UserState } from "../lib/types";
import { useEffect, useState } from "react";
import { setListings } from "../lib/redux/state";
import { useDispatch, useSelector } from "react-redux";
import { AllCategories } from "../data/categoriesData";

const Listings = () => {
    const dispatch = useDispatch();
    const customAxios = useAxios();
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const listings = useSelector((state: UserState) => state.listings);

    const getFeedListings = async () => {
        try {
            const response = await customAxios.get(selectedCategory === "All" ? "listing" : `listing?category=${selectedCategory}`);

            dispatch(setListings({ listings: response.data }));
            setLoading(false);
        } catch (err) {
            console.log("Fetch Listing Failed", err);
        }
    };

    useEffect(() => {
        getFeedListings();
    }, [selectedCategory]);

    return (
        <>
            <div className="flex justify-center flex-wrap gap-14 px-20 py-12 w-full">
                {AllCategories?.map((category, index) => (
                    <div className={`flex flex-col items-center cursor-pointer hover:text-primary ${category.label === selectedCategory ? "text-primary" : ""}`}
                        key={index} onClick={() => setSelectedCategory(category.label)}>
                        <div className="text-4xl">{category.icon}</div>
                        <p className="text-lg font-bold">{category.label}</p>
                    </div>
                ))}
            </div>

            {loading ? <Loader /> :
                <div className="flex flex-wrap justify-center gap-1.5 pb-28 px-14">
                    {listings?.map((item, index) =>
                        <ListingCard
                            key={index}
                            city={item.city}
                            type={item.type}
                            price={item.price}
                            listingId={item._id}
                            booking={false}
                            country={item.country}
                            creator={item.creator}
                            province={item.province}
                            category={item.category}
                            listingPhotoPaths={item.listingPhotoPaths}
                        />
                    )}
                </div>
            }
        </>
    );
};

export default Listings;