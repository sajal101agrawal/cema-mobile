import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";
import { API_ENPOINTS } from "../../../utils/api";
import { triggerToastMessage } from "../../../services";

export const fetchMyOrders = createAsyncThunk('auth/fetchMyOrders', async (page) => {
    console.log("page", page);

    let FINAL_URL = `${API_ENPOINTS.ORDERS}?page=${page}&per_page=10`;

    try {

        const response = await axios.get(FINAL_URL);
        if(response.status === 200) {
            // console.log("colsole", response.data)
            if(response.data?.status === 'fail'){
                triggerToastMessage({
                    message : 'Failed....',
                    description : response.data?.msg
                })
            } else {
               return response.data?.orders?.data;
            }
        }
        
        if(response.status === 500) {
            console.log(response.data,"SERVER ERROR 500");
        }
        
    } catch (error) {
        console.log("Error", error?.response.message);
    }

})