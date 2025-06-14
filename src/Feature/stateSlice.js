import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
    name: 'state',
    initialState: {
        menuOpen: false,
        showAll: false,
        inp: false,
        item: null,
        selectedColor: '',
        selectedSize: '',
        img: 0,
        products: true,
        reviews: false,
        FAQs: false,
        filter:false
    },
    reducers: {
        setMenuOpen: (state) => {
            state.menuOpen = !state.menuOpen
        },
        setShowAll: (state) => {
            state.showAll = !state.showAll
        },
        setInput: (state,action) => {
            state.inp = action.payload
        },
        setItem: (state, action) => {
            state.item = action.payload
        },
        setSelectedColor: (state,action) => {
            state.selectedColor = action.payload
        },
        setSelectedSize: (state, action) => {
            state.selectedSize =action.payload
        },
        setImg: (state,action) => {
            state.img=action.payload
        },
        setProduct: (state) => {
            state.products = true
            state.reviews = false
            state.FAQs = false
        },
        setReviews: (state) => {
            state.products = false
            state.reviews = true
            state.FAQs = false
        },
        setFAQs: (state) => {
            state.products = false
            state.reviews = false
            state.FAQs = true
        },
        setFilter: (state) => {
            state.filter = !state.filter
        }
        
    }
})

export const { setMenuOpen, setFilter, setShowAll, setInput, setItem, setSelectedColor, setSelectedSize, setImg, setProduct, setReviews, setFAQs } = stateSlice.actions;
export default stateSlice.reducer