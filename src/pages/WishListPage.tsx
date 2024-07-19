import useAxios from "../hooks/useAxios";
import Loader from "../components/Loader";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setWishList } from "../lib/redux/state";
import ListingCard from "../components/ListingCard";
import DataNotFound from "../components/DataNotFound";
import { useDispatch, useSelector } from "react-redux";
import { ListingDetailsType, UserState } from "../lib/types";

const WishListPage = () => {
    const navigate = useNavigate();
    const customAxios = useAxios();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const user = useSelector((state: UserState) => state.user);
    const [wishListData, setWishListData] = useState<ListingDetailsType[]>([]);

    const getWishList = async () => {
        try {
            const response = await customAxios.get(`users/${user?._id}/wishes`);
            setWishListData(response.data.wishList);
            dispatch(setWishList(response.data.wishListIds));
        } catch (err) {
            console.error("Fetch Wish List failed!", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { getWishList(); }, []);

    return (
        <div className="flex grow flex-col gap-5 px-14 py-10 pb-20 w-full">
            <h1>Your Wish List</h1>
            {loading ? <Loader /> :
                wishListData?.length ?
                    <div className="flex flex-wrap gap-10">
                        {wishListData.map((item, index) => (
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