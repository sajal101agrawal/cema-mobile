import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";
import { API_ENPOINTS } from "../../../utils/api";
import { triggerToastMessage } from "../../../services";
import { fetchWishlist } from './fetchWishlist'
import { fetchProducts } from "../product/fetchProducts";
import { updateProductFetchData } from "../../slices/product";

export const addRemoveWishlist = createAsyncThunk('wishlist/addRemoveWishlist', async ({ product_id, type, dispatch, currentPage },thunk) => {
    
    try {
        console.log("======",type, product_id);
        const FORM_DATA = new FormData();

        FORM_DATA.append('product_id', product_id);
        FORM_DATA.append('type', type);

        const response = await axios.post(API_ENPOINTS.ADD_REMOVE_WISHLIST, FORM_DATA);

        if (response.status === 200) {
            if (response.data.status === 'fail') {
                triggerToastMessage({
                    message: 'Failed...!',
                    description: response.data.msg
                })
                thunk.dispatch(fetchWishlist())
            } else {
                triggerToastMessage({
                    message: 'Success...!',
                    description: response.data.msg,
                    type : 'success'
                });
                thunk.dispatch(fetchWishlist())
            }
        }

        if (response.status === 500) {
            console.log(response.data, "SERVER ERROR 500");
            thunk.dispatch(fetchWishlist())
        }

    } catch (error) {
        console.log("Error addRemoveWishlist", err?.response?.data?.message);
    }
    

})