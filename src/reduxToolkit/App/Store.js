import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Features/UserSlice";
import podcastReducer from "../Features/PodcastSlice";
let store=configureStore({
    reducer:{
         user:userReducer,
         podcast:podcastReducer
    }
})

export default store;