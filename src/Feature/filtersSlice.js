import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const filteredData = createAsyncThunk('filter/product', async () => {
    const res = await fetch(`https://api.escuelajs.co/api/v1/products/?title=${title}&price_min=${price_min}&price_max=${price_max}&categoryId=${categoryId}`)
    return await res.json()
})

const filtersSlice = createSlice({
    name: 'filter',
    initialState: {
        data2: [],
        loading2: false,
        error2: false,
        price_min: 0,
        price_max: 300,
        categoryId: null,
        title: '',
        color2: '',
        size2:''
    },
    reducers: {
        setPrice_min: (state, action) => {
            state.price_min = action.payload
        },
        setPrice_max: (state, action) => {
            state.price_max = action.payload
        },
        setCategoryId: (state, action) => {
            state.categoryId = action.payload
        },
        setTitle: (state, action) => {
            state.title = action.payload
        },
        setColor: (state, action) => {
            state.color2 = action.payload
        },
        setSize: (state, action) => {
            state.size2 = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(filteredData.pending, (state) => {
                state.loading2 = true
                state.error2 = false
            })
            .addCase(filteredData.fulfilled, (state, action) => {
                state.data2 = action.payload
                state.loading2 = false
                state.error2 = false
            })
            .addCase(filteredData.rejected, (state) => {
                state.data2 = []
                state.error2 = true
                state.loading2 = false
            })
    }
})

export const { setPrice_min, setPrice_max, setCategoryId, setTitle, setColor, setSize }=filtersSlice.actions
export default filtersSlice.reducer

