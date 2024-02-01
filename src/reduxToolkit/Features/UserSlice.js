import { createSlice } from "@reduxjs/toolkit";

let initialState={
    name:null,
    email:null,
    uid:null,
}
let userSlice=createSlice({
    name:"user",
    initialState:initialState,
    reducers:{
      setUser:(state,action)=>action.payload,
    }

})

export const {setUser} = userSlice.actions;

export default userSlice.reducer;