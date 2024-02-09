import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";
import { API_ENPOINTS } from "../../../utils/api";
import { triggerToastMessage } from "../../../services";

export const registerUser = createAsyncThunk('auth/registerUser', async ({details, navigation}) => {

    console.log("=====", details);
    try {
        const FORM_DATA = new FormData();

        FORM_DATA.append('name', details.name);
        FORM_DATA.append('email', details.email);
        FORM_DATA.append('mobile', details.mobile);
        FORM_DATA.append('password', details.password);

        const response = await axios.post(API_ENPOINTS.REGISTER, FORM_DATA);

        if(response.status === 200) {
            
            if (response.data.success == true){
                navigation.reset({
                    index : 0,
                    routes : [
                        {
                            name: 'Signin'
                        }
                    ]
                })
            }
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