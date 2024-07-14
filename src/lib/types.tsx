import { Dispatch, ReactNode, SetStateAction } from "react";

type CreatorInfo = {
    _id: string,
    name: string,
    email: string,
    profileImagePath: string,
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

export type User = CreatorInfo & {
    createdAt: string,
    tripList: string[],
    wishList: string[],
    propertyList: string[],
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
    highlight: string,
    guestCount: number,
    amenities: string[],
    description: string,
    creator: CreatorInfo,
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
    creator: CreatorInfo,
    categories: string[],
    listingPhotoPaths: string[];
};

export type SearchProps = {
    search: string,
    setSearch: Dispatch<SetStateAction<string>>;
};

export type CarouselProps = {
    children: ReactNode;
};

export type UserState = {
    token?: string,
    user?: User | null,
    listings?: Listing[];
};