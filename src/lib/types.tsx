import { Dispatch, ReactNode, SetStateAction } from "react";

type CreatorInfo = {
    _id: string,
    name: string,
    email: string,
    profileImagePath: string,
};

type Listing = {
    _id: string;
    city: string,
    country: string,
    province: string,
    category: string,
    listingPhotoPaths: string[];
};

export type HttpOptions = 'form' | 'json';

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
    host: string,
    endDate: Date,
    startDate: Date,
    listing: string,
    customer: string,
    totalPrice: number;
};

export type TripList = {
    _id: string,
    endDate: Date,
    hostId: string,
    startDate: Date,
    listing: Listing,
    totalPrice: number;
};

export type WishList = Listing & {
    type: string,
    price: number,
    listingId: string,
};

export type User = CreatorInfo & {
    createdAt: string,
    wishList: WishList[],
    tripList: TripList[],
    propertyList: string[],
    reservationList: string[];
};

export type ListingDetailsType = Listing & {
    type: string,
    price: number,
    title: string,
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

export type ListingCardProps = Omit<Listing, "_id"> & ({
    type: string,
    price: number,
    booking: false,
    listingId: string;
} | {
    booking: true,
    endDate: Date,
    tripId: string,
    startDate: Date,
    totalPrice: number;
});

export type SearchProps = {
    search: string,
    setSearch: Dispatch<SetStateAction<string>>;
};

export type UserState = {
    token?: string,
    user?: User | null,
    listings?: ListingDetailsType[];
};