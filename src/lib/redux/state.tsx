import { UserState } from "../types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: UserState = {
    user: null,
    token: ''
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
            state.user = null;
            state.token = '';
        }
    }
});

export const { setLogin, setLogout } = userSlice.actions;
export default userSlice.reducer;