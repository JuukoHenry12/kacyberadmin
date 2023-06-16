import { configureStore } from "@reduxjs/toolkit";
import { loaderSlice } from "./loaderSlice";
import { UserSlice } from "./UserSlice";

const store =configureStore({
     reducer:{
         loaders:loaderSlice.reducer,
         users:UserSlice.reducer
     }
})

export default store