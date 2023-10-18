import { configureStore } from "@reduxjs/toolkit";
import { cashReducer } from "./payInCash";



export const store = configureStore({
    reducer: {
        cashapi: cashReducer
    }
})