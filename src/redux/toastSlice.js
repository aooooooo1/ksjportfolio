import { createSlice } from "@reduxjs/toolkit";


const toastSlice = createSlice({
    name:'sliceToast',
    initialState:{
        toast:[]
    },
    reducers:{
        addToast : (state, action)=>{
            state.toast.push(action.payload);
        },
        removeToast : (state, action)=>{
            state.toast = state.toast.filter(v=>{
                return v.id !== action.payload;
            });
        }
    }
});
export const {addToast, removeToast} = toastSlice.actions;
export default toastSlice.reducer;