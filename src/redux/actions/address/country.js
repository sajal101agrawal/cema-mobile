import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENPOINTS } from "../../../utils/api";
import { triggerToastMessage } from "../../../services";

export const fetchCounty = createAsyncThunk('address/country' , async() => {
    try {

        const response = await axios.get(API_ENPOINTS.COUNTRIES)
        if (response.status === 200) {
            //  console.log("country>>" , response.data)
            if (response.data.status === 'fail') {
                triggerToastMessage({
                    message: 'Failed...! ',
                    description: response.data.msg
                })
            } else {
                return response.data?.countries;
            }
        }

        if (response.status === 500) {
            console.log(response.data, "SERVER ERROR 500");
        }

    } catch (error) {
        console.log("Error fetchCart", err?.response?.data?.message);
    }

})