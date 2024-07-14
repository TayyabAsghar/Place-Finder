import { TripList, UserState } from "../types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: UserState = {
    token: '',
    user: null,
    listings: []
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLogin: (state, action: PayloadAction<UserState>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.token = '';
            state.user = null;
        },
        setListings: (state, action: PayloadAction<UserState>) => {
            state.listings = action.payload.listings;
        },
        setTripList: (state, action: PayloadAction<TripList[]>) => {
            if (state.user) state.user.tripList = action.payload;
        },
        setWishList: (state, action: PayloadAction<TripList[]>) => {
            // if (state.user) state.user.wishList = action.payload;
        }
    }
});

export const { setLogin, setLogout, setListings, setTripList, setWishList } = userSlice.actions;
export default userSlice.reducer;