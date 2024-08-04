import useAxios from "../hooks/useAxios";
import Loader from "../components/Loader";
import ReactError from "../lib/reactError";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DataNotFound from "../components/DataNotFound";
import type { ListingDetailsType } from "../lib/types";
import useNotification from "../hooks/useNotification";
import ListingDetails from "../components/ListingDetails";

const WishDetailsPage = () => {
    const customAxios = useAxios();
    const { wishId } = useParams();
    const [loading, setLoading] = useState(true);
    const { setNotification } = useNotification();
    const [wishList, setWishList] = useState<ListingDetailsType | null>(null);

    const getListingDetails = async () => {
        try {
            const response = await customAxios.get(`/user/wishes/${wishId}`);
            setWishList(response.data);
        } catch (err) {
            if (err && err instanceof ReactError)
                setNotification({ message: err.message, severity: "error" });
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