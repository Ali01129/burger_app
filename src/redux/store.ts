import { configureStore } from '@reduxjs/toolkit';
import burgerSlice from './slices/burgerSlice';
import userSlice from './slices/loginSlice';

export const store=configureStore({
    reducer:{
        burger:burgerSlice,
        user:userSlice,
    }
});