import "../styles/List.scss";
import { UserState } from "../lib/types";
import { useSelector } from "react-redux";
import ListingCard from "../components/ListingCard";

const WishList = () => {
    const wishList = useSelector((state: UserState) => state?.user?.wishList);

    return (
        <>
            <h1 className="title-list">Your Wish List</h1>
            <div className="list">
                {wishList?.map((item, index) => (
                    <ListingCard
                        key={index}
                        booking={false}
                        city={item.city}
                        type={item.type}
                        price={item.price}
                        listingId={item._id}
                        country={item.country}
                        province={item.province}
                        category={item.category}
                        listingPhotoPaths={item.listingPhotoPaths}
                    />
                ))}
            </div>
        </>
    );
};

export default WishList;