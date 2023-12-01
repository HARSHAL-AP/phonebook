import { createSlice } from "@reduxjs/toolkit";

const contactSlice=createSlice({
    name:"contact",
    initialState:{
        contacts:[]
    },

    reducers:{
        add:(state,action)=>{
           state.contacts=[...state.contacts,action.payload]
        },
        edit:(state,action)=>{
           state.contacts=state.contacts.map((el,index)=>{
            if(el._id==action.payload.id){
                return action.payload.item
            }
            return el
           })
        },
        remove:(state,action)=>{
          state.contacts=state.contacts.filter(el=>el._id!==action.payload)
        },
        get:(state,action)=>{
            state.contacts=action.payload
        }
        
    }
})

export const {add,edit,remove,get}=contactSlice.actions;
export default contactSlice.reducer;
