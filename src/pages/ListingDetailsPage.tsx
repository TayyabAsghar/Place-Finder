import useAxios from "../hooks/useAxios";
import Loader from "../components/Loader";
import ReactError from "../lib/reactError";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DataNotFound from "../components/DataNotFound";
import useNotification from "../hooks/useNotification";
import type { ListingDetailsType } from "../lib/types";
import ListingDetails from "../components/ListingDetails";

const ListingDetailsPage = () => {
    const customAxios = useAxios();
    const { listingId } = useParams();
    const [loading, setLoading] = useState(true);
    const { setNotification } = useNotification();
    const [listing, setListing] = useState<ListingDetailsType | null>(null);

    const getListingDetails = async () => {
        try {
            const response = await customAxios.get(`/listing/${listingId}`, "skip-authorization");
            setListing(response.data);
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
            listing ? <ListingDetails {...listing} booking={true} /> :
                <DataNotFound message="No Data Found" />
    );
};

export default ListingDetailsPage;