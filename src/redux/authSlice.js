import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:'sliceAuth',
    initialState:{
        isLogin:false,
    },
    reducers:{
        login:(state)=>{
            state.isLogin=true;
        },
        logout:(state)=>{
            localStorage.removeItem('user');
            state.isLogin = false;
        }
    }
});
export const {login, logout} = authSlice.actions;
export default authSlice.reducer;