import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENPOINTS } from "../../../utils/api";
import { triggerToastMessage } from "../../../services";

export const getAllBillingAddress = createAsyncThunk('address/getAllBillingAddress' , async() => {
    try {

        const response = await axios.get(API_ENPOINTS.GET_ALL_BILLING_ADDRESS)
        if (response.status === 200) {
            if (response.data.status === 'fail') {
                triggerToastMessage({
                    message: 'Failed...! ',
                    description: response.data.msg
                })
            } else {
                return response.data?.address;
            }
        }

        if (response.status === 500) {
            console.log(response.data, "SERVER ERROR 500");
        }

    } catch (error) {
        console.log("Error fetchaddress", err?.response?.data?.message);
    }

})