import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_ENPOINTS } from "../../../utils/api";
import axios from "axios";
import { triggerToastMessage } from "../../../services";


export const updateProfileDetails = createAsyncThunk('auth/updateProfileDetails' , async({ profileDetails, country_id = 1 , state_id=2, city_id=3 }) => {

    try {
        // console.log('...', profileDetails,axios.defaults.headers);
        
        const FORM_DATA = new FormData();

        FORM_DATA.append('name' , profileDetails.name);
        // FORM_DATA.append('email' , profileDetails.email);
        FORM_DATA.append('phone' , profileDetails.phone);
        FORM_DATA.append('country_id' , country_id);
        FORM_DATA.append('state_id' , state_id);
        FORM_DATA.append('city_id', city_id)
        FORM_DATA.append('image', image);

        console.log('...FORM_DATA', FORM_DATA,image);
        
        const response = await axios.post(API_ENPOINTS.UPDATE_PROFILE_DETAILS, FORM_DATA);

        if (response.status === 200) {
            if (response.data.status === 'fail') {
                triggerToastMessage({
                    message: 'Failed...! ',
                    description: response.data.msg
                })
            } else {
                return {
                    details: response.data,
                };
            }
        }

        if (response.status === 500) {
            console.log(response.data, "SERVER ERROR 500");
        }

    } catch (error) {
        console.log("Error updateProfileDetails", err?.response?.data?.message);

    }
})