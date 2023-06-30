import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser: null,
    isLoading: false,
    error: false,
    updateLoading: false,
    updateError: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.isLoading = true;
        },
        loginSuccess: (state, action) => {
            state.isLoading = false;
            state.currentUser = action.payload;
        },
        loginFailure: (state) => {
            state.isLoading = false;
            state.error = true;
        },
        logout: (state) => {
            state.currentUser = null;
            state.isLoading = false;
            state.error = true;
        },
        updateStart: (state) => {
            state.updateLoading = true;
            state.updateError = false;
        },
        updateSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.isLoading = false;
            state.error = false;
        },
        updateFailure: (state) => {
            state.isLoading = false;
            state.error = true;
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, logout, updateStart, updateSuccess, updateFailure } = userSlice.actions;

export default userSlice.reducer;