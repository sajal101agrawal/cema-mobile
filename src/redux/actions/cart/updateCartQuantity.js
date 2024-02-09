import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";
import { API_ENPOINTS } from "../../../utils/api";
import { triggerToastMessage } from "../../../services";

export const updateCartQuantity = createAsyncThunk('cart/updateCartQuantity', async ({ cart_id, variant_id, quantity }, thunk) => {

    try {

        const FORM_DATA = new FormData();

        FORM_DATA.append('id', cart_id); //cart product id
        FORM_DATA.append('variant_id', variant_id);
        FORM_DATA.append('quantity', quantity);

        const response = await axios.post(API_ENPOINTS.UPDATE_CART_QUANTITY, FORM_DATA);

        if (response.status === 200) {
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
            }
        }

        if (response.status === 500) {
            console.log(response.data, "SERVER ERROR 500");
        }

    } catch (error) {
        console.log("Error updateCartQuantity", err?.response?.data?.message);
    }

})