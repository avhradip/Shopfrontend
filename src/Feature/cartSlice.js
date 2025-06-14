const { createSlice } = require("@reduxjs/toolkit");


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: []
    },
    reducers: {
        addToCart: (state, action) => {
            const data = action.payload
            const exestingItem = state.items.find(item => item.id === data.id &&
                item.selectColor === data.selectColor &&
                item.selestSize === data.selectSize
            )
            if (exestingItem) {
                exestingItem.qty += data.qty;
            } else {
                state.items.push(data)
            }
        },
        remove: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload)
        },
        incrementQty: (state, action) => {
            const item = state.items.find(ele => ele.id === action.payload)
            if (item) item.qty += 1
        },
        decrementQty: (state, action) => {
            const item = state.items.find(ele => ele.id === action.payload)
            if (item && item.qty > 1) item.qty -= 1
        },
        clearCart: (state) => {
            state.items = []
        }
    }
})

export const { addToCart, remove, incrementQty, decrementQty, clearCart } = cartSlice.actions;
export default cartSlice.reducer