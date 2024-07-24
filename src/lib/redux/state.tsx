import { UserState } from "../types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: UserState = {
    token: '',
    user: null
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
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        setWishList: (state, action: PayloadAction<string[]>) => {
            if (state.user) state.user.wishList = action.payload;
        }
    }
});

export const { setLogin, setLogout, setToken, setWishList } = userSlice.actions;
export default userSlice.reducer;