import { ListingDetailsType, TripListType, UserState, WishList } from "../types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: UserState = {
    token: '',
    user: null,
    wishList: []
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
        setWishList: (state, action: PayloadAction<ListingDetailsType[]>) => {
            state.wishList = action.payload;
        }
    }
});

export const { setLogin, setLogout, setWishList } = userSlice.actions;
export default userSlice.reducer;