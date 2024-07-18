import { useState } from "react";
import { Button } from "@mui/material";
import { moveDays } from "../lib/utils";
import useAxios from "../hooks/useAxios";
import "react-date-range/dist/styles.css";
import { useSelector } from "react-redux";
import { differenceInDays } from "date-fns";
import { useNavigate } from "react-router-dom";
import "react-date-range/dist/theme/default.css";
import { DateRange, RangeKeyDict, Range } from "react-date-range";
import { BookingForm, BookingProps, UserState } from "../lib/types";

const Booking = (props: BookingProps) => {
    const navigate = useNavigate();
    const customAxios = useAxios();
    const [dayCount, setDayCount] = useState(props.booking ? 1 : props.days);
    const customerId = useSelector((state: UserState) => state.user?._id ?? "");
    const [dateRange, setDateRange] = useState<Range>({
        endDate: props.booking ? new Date() : new Date(props.endDate),
        startDate: props.booking ? new Date() : new Date(props.startDate),
        key: "selection"
    });

    const handleSelect = (ranges: RangeKeyDict) => {
        const endDate = ranges['selection']?.endDate ?? new Date().getDate();
        const startDate = ranges['selection']?.startDate ?? new Date().getDate();
        setDateRange(ranges['selection']);
        setDayCount(differenceInDays(endDate, startDate) + 1);
    };

    const bookingButton = () => {
        if (props.booking) {
            const handleSubmit = async () => {
                try {
                    const bookingForm: BookingForm = {
                        days: dayCount,
                        customer: customerId,
                        host: props.creatorId,
                        listing: props.listingId,
                        totalPrice: props.price * dayCount,
                        endDate: dateRange.endDate ?? new Date(),
                        startDate: dateRange.startDate ?? new Date()
                    };

                    await customAxios.post("trip/create", JSON.stringify(bookingForm), "json");
                    navigate('/user/trips');
                } catch (err) {
                    console.log("Submit Booking Failed.", err);
                }
            };

            return (
                <Button className="w-full mt-7" variant="contained" type="submit" onClick={handleSubmit}>
                    Booking
                </Button>
            );
        }
    };


    return (
        <div>
            <h2 className="text-foreground">How long do you want to stay?</h2>
            <div className="flex flex-col gap-5 mt-7">
                {props.booking ? <DateRange rangeColors={["#6D9E8D"]} ranges={[dateRange]} onChange={handleSelect} /> :
                    <DateRange rangeColors={["#6D9E8D"]} ranges={[dateRange]} onChange={() => { }}
                        minDate={new Date(props.startDate)} maxDate={moveDays(props.startDate, -1)} />
                }
                <div className="flex flex-col gap-2">
                    <h2 className="text-foreground">${props.price} x {dayCount} night{dayCount > 1 ? "s" : ""}</h2>
                    <h2 className="text-foreground">Total price: ${props.booking ? props.price * dayCount : props.totalPrice}</h2>
                </div>
                <div className="flex flex-col gap-2 text-lg">
                    <p>Start Date: {dateRange.startDate?.toDateString()}</p>
                    <p>End Date: {dateRange.endDate?.toDateString()}</p>
                </div>

                {bookingButton()}
            </div>
        </div>
    );
};

export default Booking;