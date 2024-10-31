import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/cart/cartSlice";
export const store=configureStore({
    reducer:{
        cart:productReducer
        }
})
