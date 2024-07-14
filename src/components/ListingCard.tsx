import { useState } from "react";
import useAxios from "../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ListingCardProps, UserState } from "../lib/types";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";

const ListingCard = ({ city, type, price, listingId, booking, country, province, creator, categories, listingPhotoPaths }: ListingCardProps) => {
    const navigate = useNavigate();
    const customAxios = useAxios();
    const dispatch = useDispatch();
    const [currentIndex, setCurrentIndex] = useState(0);
    const user = useSelector((state: UserState) => state.user);
    const wishList = user?.wishList || [];
    // const isLiked = wishList?.find(item => item?._id === listingId);
    const goToNextSlide = () => setCurrentIndex(prevIndex => (prevIndex + 1) % listingPhotoPaths.length);
    const goToPrevSlide = () => setCurrentIndex(prevIndex => (prevIndex - 1 + listingPhotoPaths.length) % listingPhotoPaths.length);
    console.log(creator);

    const patchWishList = async () => {
        // if (user?._id !== creator._id) {
        //     const response = await fetch(`users/${user?._id}/${listingId}`,
        //         {
        //             method: "PATCH",
        //             header: {
        //                 "Content-Type": "application/json",
        //             }
        //         }
        //     );
        //     const data = await response.json();
        //     dispatch(setWishList(data.wishList));
        // } else { return; }
    };

    return (
        <div className="listing-card" onClick={() => navigate(`/properties/${listingId}`)}        >
            <div className="slider-container">
                <div className="slider" style={{ transform: `translateX(-${currentIndex * 100}%)` }}                >
                    {listingPhotoPaths?.map((photo, index) => (
                        <div key={index} className="slide">
                            <img src={`http://localhost:3001/${photo?.replace("public", "")}`} alt={`photo ${index + 1}`} />
                            <div className="prev-button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    goToPrevSlide();
                                }} >
                                <ArrowBackIosNew sx={{ fontSize: "15px" }} />
                            </div>
                            <div
                                className="next-button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    goToNextSlide();
                                }}
                            >
                                <ArrowForwardIos sx={{ fontSize: "15px" }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <h3>
                {city}, {province}, {country}
            </h3>
            <p>{categories}</p>

            {!booking ? (
                <>
                    <p>{type}</p>
                    <p>
                        <span>${price}</span> per night
                    </p>
                </>
            ) : (
                <>
                    {/* <p>
                        {startDate} - {endDate}
                    </p> */}
                    <p>
                        {/* <span>${totalPrice}</span> total */}
                    </p>
                </>
            )}

            <button className="favorite"
                onClick={(e) => {
                    e.stopPropagation();
                    patchWishList();
                }}
                disabled={!user} >
                {/* {isLiked ? (
                    <Favorite sx={{ color: "red" }} />
                ) : (
                    <Favorite sx={{ color: "white" }} />
                )} */}
            </button>
        </div>
    );
};

export default ListingCard;