import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";
import { API_ENPOINTS } from "../../../utils/api";
import { triggerToastMessage } from "../../../services";

export const fetchNotification = createAsyncThunk('auth/fetchNotification', async () => {

    try {

        const response = await axios.get(API_ENPOINTS.NOTIFICATION);

        if(response.status === 200) {
            if(response.data?.status === 'fail'){
                triggerToastMessage({
                    message : 'Failed....',
                    description : response.data?.msg
                })
            } else {
               return response.data.notifications;
            }
        }
        
        if(response.status === 500) {
            console.log(response.data,"SERVER ERROR 500");
        }
        
    } catch (error) {
        console.log("Error", error?.response.message);
    }

})