import useAxios from "../hooks/useAxios";
import Loader from "../components/Loader";
import { toTitleCase } from "../lib/utils";
import { useEffect, useState } from "react";
import { ListingDetailsType, } from "../lib/types";
import ListingCard from "../components/ListingCard";
import DataNotFound from "../components/DataNotFound";
import { useNavigate, useParams } from "react-router-dom";
import { AllCategoriesNames } from "../data/categoriesData";

const CategoryPage = () => {
    const navigate = useNavigate();
    const customAxios = useAxios();
    const { category } = useParams();
    const [loading, setLoading] = useState(true);
    const [categoryList, setCategoryList] = useState<ListingDetailsType[]>([]);

    const getCategoryList = async () => {
        try {
            if (category) {
                const response = await customAxios.get(`/listing?category=${category.toLowerCase()}`, "skip-authorization");
                setCategoryList(response.data);
            }
        } catch (err) {
            console.error("Fetch Trip List failed!", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { getCategoryList(); }, []);

    return (
        <div className="card-list-page">
            {!!category && AllCategoriesNames.includes(category.toLowerCase()) &&
                <h1>{toTitleCase(category)} Listings</h1>
            }
            {loading ? <Loader /> :
                categoryList.length ?
                    <div className="card-container">
                        {categoryList.map((item, index) =>
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
                    <DataNotFound message="No Data Found" />
            }
        </div>
    );
};

export default CategoryPage;