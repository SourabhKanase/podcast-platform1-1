import { createSlice } from "@reduxjs/toolkit";

let initialState=[]
let podcastSlice=createSlice({
    name:"podcasts",
    initialState:initialState,
    reducers:{
      setPodcasts:(state,action)=>action.payload,
    }

})

export const {setPodcasts} = podcastSlice.actions;

export default podcastSlice.reducer;