import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from '../../actions/product/fetchProducts';

const initialState = {
    product: [],
    currentPage : 0,
    lastPage : 0,
    productDataFetching: false,
    productMoreDataFetching: true
}

export const productSlice = createSlice({
    initialState: initialState,
    name: 'product',
    reducers: {
        clearWishlistData: (state, action) => {
            state.product = [];
            state.productMoreDataFetching = true;
        },
        productData : (state, action) => {
            state.product = action.payload
        },
        updateProductFetchData : (state, action) => {
            state.productDataFetching = action.payload
        }
        
    },
    extraReducers: (builder) => {

        // PRODUCTS DATA API ACTIONS
        builder.addCase(fetchProducts.pending, (state, action) => {
            state.productDataFetching = true;
        })
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.productDataFetching = false;
            state.currentPage = action.payload.current_page;
            state.lastPage = action.payload.last_page;
            state.productMoreDataFetching = action.payload.current_page < action.payload.last_page;
            state.product = (action.payload.current_page == 1) ? action.payload.data : [...state.product, ...action.payload.data];
        })
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.productDataFetching = false;
        })
    }
})

export const { clearWishlistData, productData, updateProductFetchData } = productSlice.actions;
export default productSlice.reducer;