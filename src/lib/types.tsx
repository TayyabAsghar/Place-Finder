import { Dispatch, SetStateAction } from "react";

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
    wishList: WishList[];
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

export type TripDetails = {
    days: number,
    endDate: Date,
    startDate: Date,
    customer: string,
    createdAt: string,
    totalPrice: number,
    listing: ListingDetailsType;
};

export type ListingDetailsProps = ListingDetailsType & ({
    booking: true;
} | {
    days: number,
    booking: false,
    endDate: Date,
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
    booking: false,
    listingId: string;
} | {
    booking: true,
    endDate: Date,
    tripId: string,
    startDate: Date,
    totalPrice: number;
});

export type LikeButtonProps = {
    listingId: string,
    className?: string | undefined;
};

export type SearchProps = {
    search: string,
    setSearch: Dispatch<SetStateAction<string>>;
};

export type UserState = {
    token?: string,
    user?: User | null,
    listings?: ListingDetailsType[];
};