import { createSlice } from '@reduxjs/toolkit';

let admin: any = null

if (!global) {
    admin = localStorage.getItem("Admin") || null
}

const initialState = {
    Admin: JSON.parse(admin) || null,
    isLoading: false,
    error: "",
}

export const AdminSlice = createSlice({
    name: 'Admin',
    initialState,
    reducers: {
        loading: (state) => {
            state.isLoading = true;
        },
        adminLoginSuccess: (state, action) => {
            state.isLoading = false;
            state.Admin = action.payload;
            localStorage.setItem('Admin', JSON.stringify(action.payload));
        },
        adminLoginFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        adminLogout: (state) => {
            state.Admin = null;
            localStorage.removeItem('Admin');
            state.isLoading = false;
            state.error = '';
        }
    },
})

export const { loading, adminLoginSuccess, adminLoginFailure, adminLogout } = AdminSlice.actions

export default AdminSlice.reducer