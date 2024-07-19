import useAxios from "../hooks/useAxios";
import Loader from "../components/Loader";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setWishList } from "../lib/redux/state";
import ListingCard from "../components/ListingCard";
import DataNotFound from "../components/DataNotFound";
import { useDispatch, useSelector } from "react-redux";
import { WishListDetails, UserState } from "../lib/types";

const WishListPage = () => {
    const navigate = useNavigate();
    const customAxios = useAxios();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const state = useSelector((state: UserState) => state);

    const getWishList = async () => {
        try {
            const response = await customAxios.get(`users/${state.user?._id}/wishes`);
            dispatch(setWishList(response.data));
        } catch (err) {
            console.error("Fetch Trip List failed!", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { getWishList(); }, []);

    return (
        <div className="flex grow flex-col gap-5 px-14 py-10 pb-20 w-full">
            <h1>Your Wish List</h1>
            {loading ? <Loader /> :
                state.wishList?.length ?
                    <div className="flex flex-wrap gap-10">
                        {state.wishList.map((item, index) => (
                            <ListingCard
                                key={index}
                                booking={true}
                                city={item.city}
                                type={item.type}
                                price={item.price}
                                listingId={item._id}
                                country={item.country}
                                province={item.province}
                                category={item.category}
                                listingPhotoPaths={item.listingPhotoPaths}
                                onClick={() => navigate(`/user/wish/${item._id}`)}
                            />
                        ))}
                    </div> :
                    <DataNotFound message="No Data Found" />
            }
        </div>
    );
};

export default WishListPage;