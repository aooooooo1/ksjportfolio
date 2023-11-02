import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:'sliceAuth',
    initialState:{
        isLogin:false,
        isAdmin:false
    },
    reducers:{
        login:(state)=>{
            state.isLogin=true;
        },
        loginAdmin:(state)=>{
            state.isAdmin=true;
        },
        logout:(state)=>{
            localStorage.removeItem('user');
            state.isLogin = false;
        }
    }
});
export const {login, logout, loginAdmin} = authSlice.actions;
export default authSlice.reducer;