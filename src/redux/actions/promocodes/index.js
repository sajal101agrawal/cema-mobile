import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENPOINTS } from "../../../utils/api";
import { triggerToastMessage } from "../../../services";
import { fetchCart } from "../cart/fetchCart";


export const fetchpromoCodes = createAsyncThunk('promocode', async({couponCodeValue , currencyType, dispatch}) => {
    try {
        
        const FORM_DATA = new FormData()

        FORM_DATA.append('code' , couponCodeValue)
        FORM_DATA.append('currency' ,currencyType)


        const response = await axios.post(API_ENPOINTS.APPLY_COUPAN , FORM_DATA)
        if(response.status === 200) {
            triggerToastMessage({
                message : 'GET50 Applied Successfully',
                type : 'success',
            })
            dispatch(fetchCart())
            if(response.data?.status === 'fail'){
                triggerToastMessage({
                    message : 'Coupon Apply failed',
                    description : response.data?.msg
                })
            
            } else {
               return response.data;
            }
        }
        dispatch(fetchCart())
        if(response.status === 500) {
            console.log(response.data,"SERVER ERROR 500");
            dispatch(fetchCart())
        }
        
    } catch (error) {
        console.log("Error", error?.response.message);
        dispatch(fetchCart())
    }
})