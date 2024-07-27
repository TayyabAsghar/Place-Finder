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
    const RangeColor = ["#6D9E8D"];
    const customAxios = useAxios();
    const [dayCount, setDayCount] = useState(props.booking ? 1 : props.days);
    const customerId = useSelector((state: UserState) => state.user?._id || "");
    const [dateRange, setDateRange] = useState<Range>({
        endDate: props.booking ? new Date() : new Date(props.endDate),
        startDate: props.booking ? new Date() : new Date(props.startDate),
        key: "selection"
    });

    const handleSelect = (ranges: RangeKeyDict) => {
        const endDate = ranges['selection']?.endDate || new Date().getDate();
        const startDate = ranges['selection']?.startDate || new Date().getDate();
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
                        endDate: dateRange.endDate || new Date(),
                        startDate: dateRange.startDate || new Date()
                    };

                    await customAxios.post("/trip/create", JSON.stringify(bookingForm), "json");
                    navigate('/user/trips');
                } catch (err) {
                    console.error("Submit Booking Failed.", err);
                }
            };

            return (
                <Button className="w-full mt-7" variant="contained" type="submit" onClick={handleSubmit}>
                    Book the Trip
                </Button>
            );
        }
    };

    return (
        <div>
            <h2 className="text-foreground">
                {props.booking ? "How long do you want to stay?" : "How long is the stay?"}
            </h2>
            <div className="flex flex-col gap-5 mt-7">
                {props.booking ? <DateRange rangeColors={RangeColor} ranges={[dateRange]} onChange={handleSelect} minDate={new Date()} /> :
                    <DateRange rangeColors={RangeColor} ranges={[dateRange]} onChange={() => { }} minDate={new Date(props.startDate)}
                        maxDate={moveDays(props.startDate, -1)} />
                }
                <div className="flex flex-col gap-2">
                    <h2 className="text-foreground">${props.price} x {dayCount} night{dayCount > 1 ? "s" : ""}</h2>
                    <h2 className="text-foreground text-opacity-35">Total price: <span className="text-foreground">${props.booking ? props.price * dayCount : props.totalPrice}</span></h2>
                </div>

                {bookingButton()}
            </div>
        </div>
    );
};

export default Booking;