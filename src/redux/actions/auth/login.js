import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";
import { API_ENPOINTS } from "../../../utils/api";
import { triggerToastMessage } from "../../../services";
import { AsyncStorageClear, AsyncStorageSetItem } from "../../../utils/storage";
import { LOGIN_DETAILS } from "../../../utils/constant";

export const loginUser = createAsyncThunk('auth/loginUser', async (details) => {

    try {

        const FORM_DATA = new FormData();

        FORM_DATA.append('email', details.email);
        FORM_DATA.append('password', details.password); 

        console.log("details", details);

        console.log("isRememberCheck",details)

        if(details.isRememberCheck){
            await AsyncStorageSetItem(LOGIN_DETAILS, details);
            console.log("CALLLLLLLL")
        } else {
            await AsyncStorageClear();
        }
        const response = await axios.post(API_ENPOINTS.LOGIN, FORM_DATA);

        if(response.status === 200) {
            if(response.data?.status === 'fail'){
                triggerToastMessage({
                    message : 'Login failed',
                    description : response.data?.msg
                })
            } else {
               return response.data;
            }
        }
        
        if(response.status === 500) {
            console.log(response.data,"SERVER ERROR 500");
        }
        
    } catch (error) {
        console.log("Error", error?.response.message);
    }

})