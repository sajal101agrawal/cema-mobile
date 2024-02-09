import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories } from '../../actions/category/fetchCategories';

const initialState = {
    category: null,
    dataFetching: false,
    moreDataFetching: true
}

export const CategorySlice = createSlice({
    initialState: initialState,
    name: 'category',
    reducers: {
        clearCategoryData: (state, action) => {
            state.category = null;
            state.moreDataFetching = true;
        }
    },
    extraReducers: (builder) => {

        // CATEGORIES DATA API ACTIONS
        builder.addCase(fetchCategories.pending, (state, action) => {
            state.dataFetching = true;
        })
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.dataFetching = false;
            state.category = action.payload;
        })
        builder.addCase(fetchCategories.rejected, (state, action) => {
            state.dataFetching = false;
        })
    }
})

export const { clearCategoryData } = CategorySlice.actions;
export default CategorySlice.reducer;