import useAxios from "../hooks/useAxios";
import Loader from "../components/Loader";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ListingDetailsType } from "../lib/types";
import DataNotFound from "../components/DataNotFound";
import ListingDetails from "../components/ListingDetails";

const ListingDetailsPage = () => {
    const customAxios = useAxios();
    const { listingId } = useParams();
    const [loading, setLoading] = useState(true);
    const [listing, setListing] = useState<ListingDetailsType | null>(null);

    const getListingDetails = async () => {
        try {
            const response = await customAxios.get(`listing/${listingId}`);
            setListing(response.data);
        } catch (err) {
            console.log("Fetch Listing Details Failed", err);
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