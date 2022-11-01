import { configureStore } from '@reduxjs/toolkit';
import AdminReducer from './AdminSlice';

export const store = configureStore({
    reducer: {
        Admin: AdminReducer,
    },
})