import { createSlice } from "@reduxjs/toolkit";
import { fetchMyOrders } from '../../actions/cart/fetchMyOrders';
import { fetchCart } from '../../actions/cart/fetchCart';
import { trackMyOrder } from '../../actions/cart/trackMyOrder';
import { fetchCheckout } from "../../actions/cart/checkout";

const initialState = {
    cart : null,
    myOrders : [],
    trakingOrder : null,
    checkout : null ,
    moreLoading: true,
    pageNo : 1,
    ordersFetching : true,
    cartDataFetching : false,
    trackingLoading : false,
    checkoutLoading : false
}

export const CartSlice = createSlice({
    initialState: initialState,
    name: 'cart',
    reducers: {
        clearCartData: (state, action) => {
            state.cart = null;
        },
        clearMyordersData: (state, action) => {
            state.myOrders = [];
        },
        initialMoreLoading : (state, action) => {
            state.moreLoading = true
        },
        updatePageNo : (state, action) => {
            state.pageNo = action.payload
        }
    },
    extraReducers: (builder) => {

        // ORDERS DATA API ACTIONS
        builder.addCase(fetchMyOrders.pending, (state, action) => {
            // state.ordersFetching = true;
        })
        builder.addCase(fetchMyOrders.fulfilled, (state, action) => {
            state.ordersFetching = false;
            if(action.payload.length < 10){
                state.moreLoading = false
            }
            if(state.pageNo > 1){
                state.myOrders = [...state.myOrders,...action.payload]
            } else {
                state.myOrders = action.payload;
            }
            
            
        })
        builder.addCase(fetchMyOrders.rejected, (state, action) => {
            state.ordersFetching = false;
        })


        // CART DATA API ACTIONS
        builder.addCase(fetchCart.pending, (state, action) => {
            state.cartDataFetching = true;
        })
        builder.addCase(fetchCart.fulfilled, (state, action) => {
            state.cartDataFetching = false;
            state.cart = action.payload;
        })
        builder.addCase(fetchCart.rejected, (state, action) => {
            state.cartDataFetching = false;
        })

        // TRACK DATA API ACTIONS
        builder.addCase(trackMyOrder.pending , (state , action) => {
            state.trackingLoading = true
        })
        builder.addCase(trackMyOrder.fulfilled , (state , action) => {
            state.trackingLoading = false;
            state.trakingOrder = action.payload
        })
        builder.addCase(trackMyOrder.rejected , (state , action) => {
            state.trackingLoading = false
        })

        // TRACK DATA API ACTIONS
        builder.addCase(fetchCheckout.pending , (state , action) => {
            state.trackingLoading = true
        })
        builder.addCase(fetchCheckout.fulfilled , (state , action) => {
            state.trackingLoading = false;
            state.checkout = action.payload
        })
        builder.addCase(fetchCheckout.rejected , (state , action) => {
            state.trackingLoading = false
        })
    }
})

export const { clearCartData, clearMyordersData, updatePageNo, initialMoreLoading} = CartSlice.actions;
export default CartSlice.reducer;