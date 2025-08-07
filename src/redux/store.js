import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import noteReducer from "./slices/noteSlice.js"; 

const store= configureStore({
    reducer: {
        auth: authReducer,
        note: noteReducer 
    },
   
});

export default store;