import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";
import { API_ENPOINTS } from "../../../utils/api";
import { triggerToastMessage } from "../../../services";

export const resendTwoFactorCode = createAsyncThunk('auth/resendTwoFactorCode', async (details) => {

    try {

        const FORM_DATA = new FormData();

        FORM_DATA.append('email', details.email);

        const response = await axios.post(API_ENPOINTS.RESEND_TWO_FACTOR, FORM_DATA);

        if(response.status === 200) {
            if(response.data.status === 'fail'){
                triggerToastMessage({
                    message : 'Registration failed',
                    description : response.data.msg
                })
            }
        }
        
        if(response.status === 500) {
            console.log(response.data,"SERVER ERROR 500");
        }
        
    } catch (error) {
        console.log("Error", error?.response.message);
    }

})