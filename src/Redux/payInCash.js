import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const cashaction = createAsyncThunk('api/payIncash', async function (values) {
    
    const token = localStorage.getItem('userToken')
    let headers = { token }
    let idcart = localStorage.getItem('cartId')

    try {
        const { data } = await axios.post(`https://route-ecommerce.onrender.com/api/v1/orders/checkout-session/${idcart}?`, values,
            {
                headers,
                params: { url: "https://abdelrahman10001.github.io/" }
            }
        )
        window.open(data.session.url) 
    }
    catch (error) {
        console.log(error);
    }
})

export const cashSlice = createSlice({
    name: 'api',
    initialState: {
        count: 0,
        message: {},
        loading: false
    },
    reducers: {
        increase: (state, action) => {
            console.log(state.count++);
        }
    }, extraReducers: function (builder) {

        builder.addCase(cashaction.fulfilled, function (state, action) {
            // console.log(state.message = action.payload);
            return state.message = action.payload
        })

        builder.addCase(cashaction.pending, function () {
            console.log('pending...');
        })

        builder.addCase(cashaction.rejected, function () {
            console.log('rejected...');
        })
    }
})

export let { increase } = cashSlice.actions
export const cashReducer = cashSlice.reducer