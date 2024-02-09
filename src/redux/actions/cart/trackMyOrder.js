import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";
import { API_ENPOINTS } from "../../../utils/api";
import { triggerToastMessage } from "../../../services";

export const trackMyOrder = createAsyncThunk('cart/trackMyOrder', async ({ traking_id }) => {

    let FINAL_URL = `${API_ENPOINTS.TRACK_ORDER}?trackingid=${traking_id}`;

    try {
        
        const response = await axios.post(FINAL_URL);

        if (response.status === 200) {
            if (response.data.status === 'fail') {
                triggerToastMessage({
                    message: 'Failed...! ',
                    description: response.data.msg
                })
            } else {
                return response.data.order
            }
        }

        if (response.status === 500) {
            console.log(response.data, "SERVER ERROR 500");
        }

    } catch (error) {
        console.log("Error fetchProducts", err?.response?.data?.message);
    }

})