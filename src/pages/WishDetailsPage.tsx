import useAxios from "../hooks/useAxios";
import Loader from "../components/Loader";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ListingDetailsType } from "../lib/types";
import DataNotFound from "../components/DataNotFound";
import ListingDetails from "../components/ListingDetails";

const WishDetailsPage = () => {
    const customAxios = useAxios();
    const { wishId } = useParams();
    const [loading, setLoading] = useState(true);
    const [wishList, setWishList] = useState<ListingDetailsType | null>(null);

    const getListingDetails = async () => {
        try {
            const response = await customAxios.get(`/user/wishes/${wishId}`);
            setWishList(response.data);
        } catch (err) {
            console.error("Fetch Listing Details Failed", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { getListingDetails(); }, []);

    return (
        loading ? <Loader /> :
            wishList ? <ListingDetails {...wishList} booking={true} /> :
                <DataNotFound message="No Data Found" />
    );
};

export default WishDetailsPage;