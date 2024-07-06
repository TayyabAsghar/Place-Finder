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

export type SearchProps = {
    search: string,
    setSearch: Dispatch<SetStateAction<string>>;
};

export type UserState = {
    user: User | null,
    token: string;
};