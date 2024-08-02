import { Dispatch, MouseEventHandler, SetStateAction } from "react";

type CreatorInfo = {
    _id: string,
    name: string,
    email: string,
    avatar: string;
};

type PlaceDetails = {
    _id: string,
    city: string,
    country: string,
    category: string,
    province: string,
    listingPhotoPaths: string[];
};

type Listing = {
    _id: string,
    placeDetails: PlaceDetails;
};

export type HttpOptions = "form" | "json" | "skip-authorization";

export type SignUpForm = {
    name: string,
    email: string,
    password: string;
};

export type LogInForm = {
    email: string,
    password: string;
};

export type BookingForm = {
    days: number,
    host: string,
    endDate: Date,
    startDate: Date,
    listing: string,
    customer: string,
    totalPrice: number;
};

export type TripListType = {
    _id: string,
    days: number,
    endDate: Date,
    startDate: Date,
    totalPrice: number,
    placeDetails: PlaceDetails;
};

export type ReservationListType = {
    _id: string,
    endDate: Date,
    startDate: Date,
    listing: Listing,
    totalPrice: number,
    customer: CreatorInfo;
};

export type WishList = Listing & {
    type: string,
    price: number,
    listingId: string,
};

export type User = CreatorInfo & {
    createdAt: string,
    wishList: string[];
};

export type ListingDetailsType = Listing & {
    type: string,
    title: string,
    price: number,
    aptSuite: string,
    bedCount: number,
    highlight: string,
    guestCount: number,
    amenities: string[],
    description: string,
    creator: CreatorInfo,
    bedroomCount: number,
    streetAddress: string,
    bathroomCount: number,
    highlightDesc: string;
};

export type TripDetails = {
    days: number,
    endDate: Date,
    startDate: Date,
    customer: string,
    createdAt: string,
    totalPrice: number,
    listing: ListingDetailsType;
};

export type ReservationDetails = {
    days: number,
    endDate: Date,
    startDate: Date,
    createdAt: string,
    totalPrice: number,
    customer: CreatorInfo,
    listing: ListingDetailsType;
};

export type ListingDetailsProps = ListingDetailsType & ({
    booking: true;
} | {
    days: number,
    endDate: Date,
    booking: false,
    startDate: Date,
    totalPrice: number;
});

export type BookingProps = {
    booking: true,
    price: number,
    listingId: string,
    creatorId: string;
} | {
    days: number,
    endDate: Date,
    price: number,
    booking: false,
    startDate: Date,
    totalPrice: number,
};

export type ListingCardProps = Omit<Listing, "_id"> & ({
    type: string,
    price: number,
    booking: true,
    listingId: string,
    onClick: MouseEventHandler<HTMLDivElement>;
} | {
    booking: false,
    endDate: Date,
    tripId: string,
    startDate: Date,
    totalPrice: number,
    onClick: MouseEventHandler<HTMLDivElement>;
});

export type LikeButtonProps = {
    listingId: string,
    className?: string | undefined;
};

export type UserState = {
    token?: string,
    user?: User | null,
    isLoggedIn?: boolean;
};

export type AxiosProps = {
    continueCallOnUnmount?: boolean;
};

export type NotificationProps = {
    message: string,
    duration?: number,
    showNotification?: boolean,
    severity: "error" | "info" | "success" | "warning";
};

export type NotificationContextType = {
    notification: NotificationProps,
    setNotification: Dispatch<SetStateAction<NotificationProps>>;
};

export type ErrorData = {
    message: string,
    success: boolean;
};