import { createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:"auth",
    initialState:{
        isAuthenticated:false||JSON.parse(localStorage.getItem("isAuth")),
        token:null||JSON.parse(localStorage.getItem("token"))
    },
    reducers:{
        login:(state,action)=>{
            state.isAuthenticated=true;
            state.token=action.payload;
            localStorage.setItem("isAuth",JSON.stringify(true))
            localStorage.setItem("token",JSON.stringify(action.payload))
        },
        logout:state=>{
            state.isAuthenticated=false;
            state.user=null;
            localStorage.setItem("isAuth",JSON.stringify(false))
            localStorage.setItem("token",JSON.stringify(null))
        }
        
    }
})

export const {login,logout}=authSlice.actions;
export default authSlice.reducer;
