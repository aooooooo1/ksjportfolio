import { configureStore } from "@reduxjs/toolkit";
import toastSlice from "./toastSlice";
import authSlice from "./authSlice";

export default configureStore({
    reducer:{
        toast: toastSlice,
        auth: authSlice
    }
});