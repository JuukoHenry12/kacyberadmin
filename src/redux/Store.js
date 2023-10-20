import { configureStore } from "@reduxjs/toolkit";
import { loaderSlice } from "./loaderSlice";
import { UserSlice } from "./UserSlice";
import { tokenSlice } from "./tokenSlice";

const store =configureStore({
     reducer:{
         loaders:loaderSlice.reducer,
         users:UserSlice.reducer,
         token:tokenSlice.reducer
     }
})

export default store