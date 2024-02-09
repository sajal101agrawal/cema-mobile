import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";
import { API_ENPOINTS } from "../../../utils/api";
import { triggerToastMessage } from "../../../services";
import { fetchCart } from './fetchCart'

export const removeFromCart = createAsyncThunk('cart/removeFromCart', async ({ product_id }, thunk) => {

    try {

        console.log("priffff",product_id);

        const response = await axios.post(`${API_ENPOINTS.REMOVE_FROM_CART}/${product_id}`);

        if (response.status === 200) {
            console.log("repsonse" , response.data)
            if (response.data.status === 'fail') {
                triggerToastMessage({
                    message: 'Failed...!',
                    description: response.data.msg
                })
            } else {
                triggerToastMessage({
                    message: 'Success...!',
                    description: response.data.message,
                    type: 'success'
                });
                thunk.dispatch(fetchCart());
            }
        }

        if (response.status === 500) {
            console.log(response.data, "SERVER ERROR 500");
        }

    } catch (error) {
        console.log("Error removeFromCart", err?.response?.data?.message);
    }

})