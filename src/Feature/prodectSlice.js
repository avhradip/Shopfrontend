import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getAllProduct = createAsyncThunk('product/fetchData', async () => {
    const token = localStorage.getItem("userToken")
    const { data } = await axios.get('https://shop-co-backend-hq73.onrender.com/api/v1/product/products/all', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return data
})

export const getProductById = createAsyncThunk('product/bvid', async (id) => {
    const token = localStorage.getItem("userToken")
    const { data } = await axios.get(`https://shop-co-backend-hq73.onrender.com/api/v1/product/${id}/productdetatls`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return data
})

export const addProduct = createAsyncThunk('/add/product', async (formData) => {
    const token = localStorage.getItem("userToken")
    const { data } = await axios.post(`https://shop-co-backend-hq73.onrender.com/api/v1/product/add/product`, formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        }
    })
    return data
})

export const editProduct = createAsyncThunk('product/edit', async ({ id, data }) => {
    const token = localStorage.getItem("userToken");
    const response = await axios.patch(`https://shop-co-backend-hq73.onrender.com/api/v1/product/${id}/edit/products`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response.data;
});


export const removeProduct = createAsyncThunk('/remove/products', async (id) => {
    const token = localStorage.getItem("userToken")
    const { data } = await axios.delete(`https://shop-co-backend-hq73.onrender.com/api/v1/product/${id}/remove/products`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return data
})

export const getAllCatagoris = createAsyncThunk('/all/catagori', async () => {
    try {
        const { data } = await axios.get('https://shop-co-backend-hq73.onrender.com/api/v1/product/getallcatagiris')

        return data.catagoris
    } catch (error) {
        console.log("Get all catagoris error", error)
    }
})

export const getProductByCatagori = createAsyncThunk('/product/productbycategory', async (slug) => {
    try {
        const { data } = await axios.get(`https://shop-co-backend-hq73.onrender.com/api/v1/product/getproductbycatagori/${slug}`)
        return data.products
    } catch (error) {
        console.log("Get all product by catagoris error", error)
    }
})

export const editOrder = createAsyncThunk('/edit/order', async ({ id, status }) => {
    try {
        const token = localStorage.getItem("userToken")
        const { data } = await axios.patch(`https://shop-co-backend-hq73.onrender.com/api/v1/user/${id}/editorder`, { status },{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return data
    } catch (error) {
        console.log("Edit order error", error);
    }
})

const productSlice = createSlice({
    name: 'product',
    initialState: {
        data: [],
        catagoris: [],
        productByCatagoris: [],
        loading: false,
        error: false,
        product: {}
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllProduct.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllProduct.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
                state.error = false
            })
            .addCase(getAllProduct.rejected, (state) => {
                state.loading = false
                state.data = []
                state.error = true
            })
            .addCase(getProductById.pending, (state) => {
                state.loading = true
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.loading = false
                state.product = action.payload
                state.error = false
            })
            .addCase(getProductById.rejected, (state) => {
                state.loading = false
                state.product = {}
                state.error = true
            })
            .addCase(addProduct.pending, (state) => {
                state.loading = true
            })
            .addCase(addProduct.fulfilled, (state) => {
                state.loading = false
                state.error = false
            })
            .addCase(addProduct.rejected, (state) => {
                state.loading = false
                state.error = true
            })
            .addCase(removeProduct.pending, (state) => {
                state.loading = true
            })
            .addCase(removeProduct.fulfilled, (state) => {
                state.loading = false
                state.error = false
            })
            .addCase(removeProduct.rejected, (state) => {
                state.loading = false
                state.error = true
            })
            .addCase(getAllCatagoris.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllCatagoris.fulfilled, (state, action) => {
                state.catagoris = action.payload
                state.loading = false
                state.error = false
            })
            .addCase(getAllCatagoris.rejected, (state) => {
                state.loading = false
                state.error = true
            })
            .addCase(editProduct.pending, (state) => {
                state.loading = true
            })
            .addCase(editProduct.fulfilled, (state) => {
                state.loading = false
                state.error = false
            })
            .addCase(editProduct.rejected, (state) => {
                state.loading = false
                state.error = true
            })
            .addCase(getProductByCatagori.pending, (state) => {
                state.loading = true
            })
            .addCase(getProductByCatagori.fulfilled, (state, action) => {
                state.productByCatagoris = action.payload
                state.loading = false
                state.error = false
            })
            .addCase(getProductByCatagori.rejected, (state) => {
                state.productByCatagoris = []
                state.loading = false
                state.error = true
            })
            .addCase(editOrder.pending, (state) => {
                state.loading = true
            })
            .addCase(editOrder.fulfilled, (state) => {
                state.loading = false
                state.error = false
            })
            .addCase(editOrder.rejected, (state) => {
                state.productByCatagoris = []
                state.loading = false
                state.error = true
            })
    }
})

export default productSlice.reducer
