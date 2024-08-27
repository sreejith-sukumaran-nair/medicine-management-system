import { configureStore } from "@reduxjs/toolkit";
import authSlice from './authSlice';
import medicinesSlice from "./medicinesSlice";

var store = configureStore({
    reducer:{
             auth: authSlice,
             medicines: medicinesSlice,
    }
});

export default store;