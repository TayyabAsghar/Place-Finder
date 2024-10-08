import useAxios from "../hooks/useAxios";
import { useDispatch } from "react-redux";
import Loader from "../components/Loader";
import ReactError from "../lib/reactError";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setWishList } from "../lib/redux/state";
import ListingCard from "../components/ListingCard";
import DataNotFound from "../components/DataNotFound";
import useNotification from "../hooks/useNotification";
import type { ListingDetailsType } from "../lib/types";

const WishListPage = () => {
    const navigate = useNavigate();
    const customAxios = useAxios();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const { setNotification } = useNotification();
    const [wishListData, setWishListData] = useState<ListingDetailsType[]>([]);

    const getWishList = async () => {
        try {
            const response = await customAxios.get(`/user/wishes`);
            setWishListData(response.data.wishList);
            dispatch(setWishList(response.data.wishListIds));
        } catch (err) {
            if (err && err instanceof ReactError)
                setNotification({ message: err.message, severity: "error" });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { getWishList(); }, []);

    return (
        <div className="card-list-page">
            <h1>Your Wish List</h1>
            {loading ? <Loader /> :
                wishListData?.length ?
                    <div className="card-container">
                        {wishListData.map((item, index) =>
                            <ListingCard
                                key={index}
                                booking={true}
                                type={item.type}
                                price={item.price}
                                listingId={item._id}
                                placeDetails={item.placeDetails}
                                onClick={() => navigate(`/user/wishes/${item._id}`)}
                            />
                        )}
                    </div> :
                    <DataNotFound message="No Data Found" />
            }
        </div>
    );
};

export default WishListPage;