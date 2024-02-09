import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";
import { API_ENPOINTS } from "../../../utils/api";
import { triggerToastMessage } from "../../../services";

export const verifyRegistration = createAsyncThunk('auth/verifyRegistration', async (details) => {

    try {

        const FORM_DATA = new FormData();

        FORM_DATA.append('email', details.email);
        FORM_DATA.append('two_factor_code', details.code);

        const response = await axios.post(API_ENPOINTS.VERIFY_REGISTRATION, FORM_DATA);

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