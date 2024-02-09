import { createSlice } from "@reduxjs/toolkit";
import { fetchWishlist } from '../../actions/wishlist/fetchWishlist';

const initialState = {
    wishlist: [],
    dataFetching: false,
    moreDataFetching: true
}

export const WishlistSlice = createSlice({
    initialState: initialState,
    name: 'wishlist',
    reducers: {
        clearWishlistData: (state, action) => {
            state.wishlist = [];
            state.moreDataFetching = true;
        }
    },
    extraReducers: (builder) => {

        // WISHLIST DATA API ACTIONS
        builder.addCase(fetchWishlist.pending, (state, action) => {
            state.dataFetching = true;
        })
        builder.addCase(fetchWishlist.fulfilled, (state, action) => {
            state.dataFetching = false;
            state.wishlist = action.payload;
        })
        builder.addCase(fetchWishlist.rejected, (state, action) => {
            state.dataFetching = false;
        })
    }
})

export const { clearWishlistData} = WishlistSlice.actions;
export default WishlistSlice.reducer;