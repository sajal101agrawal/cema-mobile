import { createSlice } from "@reduxjs/toolkit";
import {fetchpromoCodes} from "../../actions/promocodes/index"

const initialState = {
    couponDetails : null,
    couponCodeLoading : false
}


export const couponSlice = createSlice({
     initialState : initialState,
     name : 'promocode',
     reducers : {
         storeCounponDetails : (state , action) =>  {
             state.couponDetails = action.payload.couponCode
         },
         clearcouponDetails: (state, action) => {
            state.couponDetails = null;
        }
     },
     extraReducers: (builder) => {

        // COUNPON APPLY API ACTIONS

        builder.addCase(fetchpromoCodes.pending, (state, action) => {
            state.couponCodeLoading = true;
        })
        builder.addCase(fetchpromoCodes.fulfilled, (state, action) => {
            state.couponCodeLoading = false;
        })
        builder.addCase(fetchpromoCodes.rejected, (state, action) => {
            state.couponCodeLoading = false;
        })  

    }   
})

export const { clearcouponDetails, storeCounponDetails } = couponSlice.actions;
export default couponSlice.reducer;