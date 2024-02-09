import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENPOINTS , BASE_URL } from "../../../utils/api";
import { triggerToastMessage } from "../../../services";


export const fetchCity = createAsyncThunk('address/city' , async({state_id}) => {
    try {
        const response = await axios.get(API_ENPOINTS.CITIES.concat(`/${state_id}`))
        if (response.status === 200) {
            //   console.log("city>>" , response.data)
            if (response.data.status === 'fail') {
                triggerToastMessage({
                    message: 'Failed...! ',
                    description: response.data.msg
                })
            } else {
                return response.data?.cities;
            }
        }

        if (response.status === 500) {
            console.log(response.data, "SERVER ERROR 500");
        }

    } catch (error) {
        console.log("Error fetchCart", err?.response?.data?.message);
    }

})