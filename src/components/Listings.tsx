import ListingCard from "./ListingCard";
import useAxios from "../hooks/useAxios";
import { UserState } from "../lib/types";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
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

            {loading ?
                <div className="flex items-center h-screen">
                    <CircularProgress thickness={4} size={48} />
                </div> :
                <div className="flex flex-wrap justify-center gap-1.5 pb-28 px-14">
                    {listings?.map(({ _id, creatorId, listingPhotoPaths, city, province, country, categories, type, price }, index) =>
                        <ListingCard
                            key={index}
                            city={city}
                            type={type}
                            price={price}
                            listingId={_id}
                            booking={false}
                            country={country}
                            province={province}
                            creatorId={creatorId}
                            categories={categories}
                            listingPhotoPaths={listingPhotoPaths}
                        />
                    )}
                </div>
            }
        </>
    );
};

export default Listings;