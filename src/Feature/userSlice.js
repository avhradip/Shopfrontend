import axios from "axios";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const signUp = createAsyncThunk('/user/signup', async (userInfo, { rejectWithValue }) => {
    try {
        await axios.post('https://shop-co-backend-hq73.onrender.com/api/v1/user/signup', userInfo);
    } catch (error) {
        console.log("signUp", error);
        return rejectWithValue(error.response?.data?.message || "Signup failed");
    }
}
)

export const login = createAsyncThunk('/user/login', async (userInfo, { rejectWithValue }) => {
    try {
        const { data } = await axios.post('https://shop-co-backend-hq73.onrender.com/api/v1/user/login', userInfo);
        localStorage.setItem("userToken", data.token);
        return data;
    } catch (error) {
        console.log("login", error);
        return rejectWithValue(error.response?.data?.message || "Login failed");
    }
}
)

export const forgotPassword = createAsyncThunk('/user/forgot-password', async (email) => {
    try {
        const { data } = await axios.post('https://shop-co-backend-hq73.onrender.com/api/v1/user/forgot-password', { email });

        return data;
    } catch (error) {
        console.log("forgot-password error", error);
        return rejectWithValue(error.response?.data?.message || "forgot-password failed");
    }
}
)

export const resetPassword = createAsyncThunk(
    '/user/reset-password',
    async ({ newPassword, conformPassword, token }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(
                'https://shop-co-backend-hq73.onrender.com/api/v1/user/reset-password',
                { newPassword, conformPassword },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Reset password failed");
        }
    }
);


export const getUserFun = createAsyncThunk('/api/user/', async () => {
    try {
        const token = localStorage.getItem('userToken')

        const { data } = await axios.get('https://shop-co-backend-hq73.onrender.com/api/v1/user/user', {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        return data
    } catch (error) {
        console.log('user', error)
    }
}
)

export const editProfile = createAsyncThunk('/user/editprofile', async (formData) => {
    try {
        const token = localStorage.getItem("userToken")
        const { data } = await axios.patch('https://shop-co-backend-hq73.onrender.com/api/v1/user/profile/edit', formData, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            }
        })
        return data
    } catch (error) {
        console.log("editProfile", error.message);
    }
})

export const cart = createAsyncThunk('/user/cart', async () => {
    const token = localStorage.getItem("userToken")
    const { data } = await axios.get('https://shop-co-backend-hq73.onrender.com/api/v1/user/allcartitems', {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        }
    })
    return data.cartItems
})

export const editCart = createAsyncThunk('/user/editcart', async ({ id, quantity }) => {
    const token = localStorage.getItem("userToken")
    const { data } = await axios.patch(`https://shop-co-backend-hq73.onrender.com/api/v1/user/${id}/editcart`, { quantity }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    )
    return data
})

export const removeFromCart = createAsyncThunk('/user/removefromcart', async (id) => {
    const token = localStorage.getItem("userToken")
    const { data } = await axios.delete(`https://shop-co-backend-hq73.onrender.com/api/v1/user/${id}/removefromcart`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    )
    return data
})

export const addToCart = createAsyncThunk('/user/addtocart', async ({ id, quantity, size, color }) => {
    const token = localStorage.getItem("userToken")
    const { data } = await axios.post(`https://shop-co-backend-hq73.onrender.com/api/v1/user/${id}/addtocart`, { quantity, size, color }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return data
})

export const wishlistFun = createAsyncThunk('/user/addorremovefromwishlist', async (id) => {
    const token = localStorage.getItem("userToken")
    const { data } = await axios.post(`https://shop-co-backend-hq73.onrender.com/api/v1/user/${id}/addorremovefromwishlist`, {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    )

    return data
})

export const getwishlistFun = createAsyncThunk('/user/addorremovefromwishlist', async () => {
    const token = localStorage.getItem("userToken")
    const { data } = await axios.get(`https://shop-co-backend-hq73.onrender.com/api/v1/user/allwishlistitems`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    )
    return data
})

export const placeOrder = createAsyncThunk('/user/placeorder', async ({ id, paymentMethod }) => {

    const token = localStorage.getItem("userToken");
    const { data } = await axios.post(`https://shop-co-backend-hq73.onrender.com/api/v1/user/${id}/placeorder`, { paymentMethod }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    );

    return data;
});

export const orders = createAsyncThunk('/user/order', async () => {
    const token = localStorage.getItem("userToken")
    const { data } = await axios.get('https://shop-co-backend-hq73.onrender.com/api/v1/user/orderlist', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return data
})

export const addReview = createAsyncThunk(
    '/user/:id/addreview',
    async ({ id, comment, rating }) => {
        const token = localStorage.getItem("userToken");
        const { data } = await axios.post(`https://shop-co-backend-hq73.onrender.com/api/v1/user/${id}/addreview`, { comment, rating }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        );
        return data;
    }
);

export const deletereview = createAsyncThunk('/user/remove', async (id) => {
    const token = localStorage.getItem("userToken")
    const { data } = await axios.delete(`https://shop-co-backend-hq73.onrender.com/api/v1/user/${id}/deletereview`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return data
})

export const getAddress = createAsyncThunk('/user/getress', async (_, thunkAPI) => {
    try {
        const token = localStorage.getItem("userToken");

        const res = await axios.get(`https://shop-co-backend-hq73.onrender.com/api/v1/user/getaddress`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return res.data.addresses;

    } catch (error) {
        console.error("Error fetching addresses:", error);
        return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch addresses");
    }
}
);

export const addAddress = createAsyncThunk('/user/addaddress', async (addressInfo) => {
    try {
        const token = localStorage.getItem("userToken");

        const { data } = await axios.post(`https://shop-co-backend-hq73.onrender.com/api/v1/user/addaddress`, addressInfo, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return data
    } catch (error) {
        console.error("Error fetching addresses:", error);
        return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch addresses");
    }
}
);

export const removeAddress = createAsyncThunk('/user/removeaddress', async (id) => {
    try {
        const token = localStorage.getItem("userToken");
        const { data } = await axios.delete(`https://shop-co-backend-hq73.onrender.com/api/v1/user/${id}/deleteaddress`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return data
    } catch (error) {
        console.error("Error fetching addresses:", error);
        return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch addresses");
    }
})

export const getReviewByProductId = createAsyncThunk("/product/getReviewByProductId", async (id) => {
    try {
        const token = localStorage.getItem("userToken");
        const { data } = await axios.delete(`https://shop-co-backend-hq73.onrender.com/api/v1/user/${id}/getReviewByProductId`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return data
    } catch (error) {
        console.error("Error fetching addresses:", error);
        return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch addresses");
    }
})



const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        error: null,
        user: {},
        ordersList: [],
        cartData: [],
        address: [],
        wishlistItems: [],
        isAuthenticated: false,
        review: []
    },
    extraReducers: (builder) => {
        builder
            // Sign Up
            .addCase(signUp.pending, (state) => {
                state.loading = true;
            })
            .addCase(signUp.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(signUp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Login
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.user = action.payload.user;
                state.isAuthenticated = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isAuthenticated = false;
            })
            .addCase(getUserFun.pending, (state) => {
                state.loading = true
            })
            .addCase(getUserFun.fulfilled, (state, action) => {
                state.loading = false
                state.error = false
                state.isAuthenticated = action?.payload?.user?._id ? true : false
                state.user = action.payload?.user
            })
            .addCase(getUserFun.rejected, (state) => {
                state.loading = false
                state.error = true
            })
            .addCase(editProfile.pending, (state) => {
                state.loading = true
            })
            .addCase(editProfile.fulfilled, (state, action) => {
                state.loading = false
                state.error = false
                state.user = action.payload
            })
            .addCase(editProfile.rejected, (state) => {
                state.loading = false
                state.error = true
            })
            .addCase(cart.pending, (state) => {
                state.loading = true
            })
            .addCase(cart.fulfilled, (state, action) => {
                state.loading = false
                state.error = false
                state.cartData = action.payload
            })
            .addCase(cart.rejected, (state) => {
                state.loading = false
                state.error = true
            })
            .addCase(editCart.pending, (state) => {
                state.loading = true
            })
            .addCase(editCart.fulfilled, (state, action) => {
                state.loading = false
                state.error = false
                state.cartData = action.payload
            })
            .addCase(editCart.rejected, (state) => {
                state.loading = false
                state.error = true
            })
            .addCase(removeFromCart.pending, (state) => {
                state.loading = true
            })
            .addCase(removeFromCart.fulfilled, (state) => {
                state.loading = false
                state.error = false
            })
            .addCase(removeFromCart.rejected, (state) => {
                state.loading = false
                state.error = true
            })
            .addCase(addToCart.pending, (state) => {
                state.loading = true
            })
            .addCase(addToCart.fulfilled, (state) => {
                state.loading = false
                state.error = false
            })
            .addCase(addToCart.rejected, (state) => {
                state.loading = false
                state.error = true
            })
            .addCase(orders.pending, (state) => {
                state.loading = true
            })
            .addCase(orders.fulfilled, (state, action) => {
                state.ordersList = action.payload
                state.loading = false
                state.error = false
            })
            .addCase(orders.rejected, (state) => {
                state.ordersList = []
                state.loading = false
                state.error = true
            })
            .addCase(deletereview.pending, (state) => {
                state.loading = true
            })
            .addCase(deletereview.fulfilled, (state) => {
                state.loading = false
                state.error = false
            })
            .addCase(deletereview.rejected, (state) => {
                state.loading = false
                state.error = true
            })
            .addCase(placeOrder.pending, (state) => {
                state.loading = true
            })
            .addCase(placeOrder.fulfilled, (state) => {
                state.loading = false
                state.error = false
            })
            .addCase(placeOrder.rejected, (state) => {
                state.loading = false
                state.error = true
            })
            .addCase(getAddress.pending, (state) => {
                state.loading = true
            })
            .addCase(getAddress.fulfilled, (state, action) => {
                state.loading = false
                state.address = action.payload
                state.error = false
            })
            .addCase(getAddress.rejected, (state) => {
                state.loading = false
                state.error = true
            })
            .addCase(addAddress.pending, (state) => {
                state.loading = true
            })
            .addCase(addAddress.fulfilled, (state, action) => {
                state.loading = false
                state.error = false
            })
            .addCase(addAddress.rejected, (state) => {
                state.loading = false
                state.error = true
            })
            .addCase(getwishlistFun.pending, (state) => {
                state.loading = true
            })
            .addCase(getwishlistFun.fulfilled, (state, action) => {
                state.loading = false
                state.wishlistItems = action.payload
                state.error = false
            })
            .addCase(getwishlistFun.rejected, (state) => {
                state.loading = false
                state.wishlistItems = []
                state.error = true
            })
            .addCase(removeAddress.pending, (state) => {
                state.loading = true
            })
            .addCase(removeAddress.fulfilled, (state, action) => {
                state.loading = false
                state.error = false
            })
            .addCase(removeAddress.rejected, (state) => {
                state.loading = false
                state.error = true
            })
            .addCase(getReviewByProductId.pending, (state) => {
                state.loading = true
            })
            .addCase(getReviewByProductId.fulfilled, (state, action) => {
                state.loading = false
                state.review = action.payload
                state.error = false
            })
            .addCase(getReviewByProductId.rejected, (state) => {
                state.loading = false
                state.review = []
                state.error = true
            })
    }
});

export default userSlice.reducer;
