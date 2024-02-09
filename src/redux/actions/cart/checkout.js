import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";
import { API_ENPOINTS } from "../../../utils/api";
import { triggerToastMessage } from "../../../services";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { STACK_NAVIGATION_KEYS } from "../../../navigation/NavigationKeys";
import { fetchCart } from "./fetchCart";


export const fetchCheckout = createAsyncThunk('cart/checkout', async ({grand_total, billing_id ,shipping_id , navigation, dis }) => {

    console.log("======================",  shipping_id);

    
    try {

        const FORM_DATA = new FormData();

        FORM_DATA.append('grand_total', grand_total);
        FORM_DATA.append('billing_id', billing_id);
        FORM_DATA.append('shipping_id', shipping_id);

      console.log("FORM_DATA",FORM_DATA);

        const response = await axios.post(API_ENPOINTS.CHECKOUT , FORM_DATA);

        if(response.status === 200) {
          console.log("resss>>>>>>>>>", response.data)
            dis(fetchCart())
            navigation.dispatch(
                    CommonActions.navigate(
                      STACK_NAVIGATION_KEYS.ORDER_SUCCESS_SCREEN
                    )
                  )
                  triggerToastMessage({
                    message : "Success...",
                    description : response?.data?.message,
                    type: 'success'
                })
            if(response.data?.success === false){
                triggerToastMessage({
                    message : 'Failed....',
                    description : response.data?.msg
                })
                navigation.dispatch(
                  CommonActions.navigate(
                    STACK_NAVIGATION_KEYS.ORDER_FAILED_SCREEN
                  )
                )
            } else {
               return response.data;
            }
        }
        
        if(response.status === 500) {
            console.log(response.data,"SERVER ERROR 500");
        }
        
    } catch (error) {
        // console.log("Error", error?.response.message);
        triggerToastMessage({
            message : 'Failed....',
            description : 'something went wrong try again.'
        })
    }

})