import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../Feature/prodectSlice"
import cartReducer from "../Feature/cartSlice"
import stateSlice from "../Feature/stateSlice"
import filterSlice from "../Feature/filtersSlice"
import userSlice from "../Feature/userSlice"

export const store = configureStore({
    reducer: {
        product: productReducer,
        cart: cartReducer,
        state: stateSlice,
        filter: filterSlice,
        user: userSlice
    },
});
