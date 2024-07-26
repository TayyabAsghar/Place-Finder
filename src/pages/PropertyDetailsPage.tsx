import useAxios from "../hooks/useAxios";
import Loader from "../components/Loader";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ListingDetailsType } from "../lib/types";
import DataNotFound from "../components/DataNotFound";
import ListingDetails from "../components/ListingDetails";

const PropertyDetailsPage = () => {
    const customAxios = useAxios();
    const { propId } = useParams();
    const [loading, setLoading] = useState(true);
    const [property, setProperty] = useState<ListingDetailsType | null>(null);

    const getListingDetails = async () => {
        try {
            const response = await customAxios.get(`/user/properties/${propId}`);
            setProperty(response.data);
        } catch (err) {
            console.error("Fetch Listing Details Failed", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { getListingDetails(); }, []);

    return (
        loading ? <Loader /> :
            property ? <ListingDetails {...property} booking={true} /> :
                <DataNotFound message="No Data Found" />
    );
};

export default PropertyDetailsPage;