import { Dispatch, SetStateAction } from "react";

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


export type User = {
    _id: string,
    name: string,
    email: string,
    createdAt: string,
    tripList: string[],
    wishList: string[],
    propertyList: string[],
    profileImagePath: string,
    reservationList: string[];
};

export type Listing = {
    _id: string,
    type: string,
    city: string,
    price: number,
    title: string,
    country: string,
    province: string,
    aptSuite: string,
    bedCount: number,
    creatorId: string,
    highlight: string,
    guestCount: number,
    amenities: string[],
    description: string,
    categories: string[],
    bedroomCount: number,
    streetAddress: string,
    bathroomCount: number,
    highlightDesc: string,
    listingPhotoPaths: string[];
};

export type ListingCardProps = {
    type: string,
    city: string,
    price: number,
    country: string,
    booking: boolean,
    province: string,
    listingId: string,
    creatorId: string,
    categories: string[],
    listingPhotoPaths: string[];
};

export type SearchProps = {
    search: string,
    setSearch: Dispatch<SetStateAction<string>>;
};

export type UserState = {
    token?: string,
    user?: User | null,
    listings?: Listing[];
};