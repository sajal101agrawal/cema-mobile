import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";
import { API_ENPOINTS } from "../../../utils/api";
import { triggerToastMessage } from "../../../services";
import { fetchCart } from './fetchCart'

export const addToCart = createAsyncThunk('cart/addToCart', async ({ product_id, type, variant_id, quantity }, thunk) => {
    
    if(type == undefined){
        triggerToastMessage({
            message: 'Product Failed to add in cart',
        })
        
    }
    console.log("PRRRRRR",type, product_id,variant_id, quantity );
    try {

        const FORM_DATA = new FormData();

        FORM_DATA.append('product_id', product_id);
        FORM_DATA.append('variant_id', variant_id);
        FORM_DATA.append('type', type);
        FORM_DATA.append('quantity', quantity);


        const response = await axios.post(API_ENPOINTS.ADD_TO_CART, FORM_DATA);

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
                thunk.dispatch(fetchCart());
            }
        }
        
        if (response.status === 500) {
            console.log(response.data, "SERVER ERROR 500");
        }

    } catch (error) {
        console.log("Error addToCart", err?.response?.data?.message);
    }

})