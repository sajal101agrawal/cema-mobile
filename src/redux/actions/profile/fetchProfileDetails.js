import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";
import { API_ENPOINTS } from "../../../utils/api";
import { triggerToastMessage } from "../../../services";

export const fetchProfileDetails = createAsyncThunk('auth/fetchProfileDetails', async ({ refresh_token, access_token }) => {

    try {
        const FORM_DATA = new FormData();

        FORM_DATA.append('token', refresh_token);

        const response = await axios.get(API_ENPOINTS.MY_PROFILE_DETAILS, FORM_DATA);

        if (response.status === 200) {
            if (response.data.status === 'fail') {
                triggerToastMessage({
                    message: 'Failed...! ',
                    description: response.data.msg
                })
            } else {
                return {
                    details: response.data,
                    refresh_token,
                    access_token
                };
            }
        }

        if (response.status === 500) {
            console.log(response.data, "SERVER ERROR 500");
        }

    } catch (error) {
        console.log("Error fetchProfileDetails", err?.response?.data?.message);
    }

})