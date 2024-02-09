import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENPOINTS } from "../../../utils/api";
import { triggerToastMessage } from "../../../services";


export const fetchState = createAsyncThunk('address/state' , async({country_id}) => {
    try { 

        const response = await axios.get(API_ENPOINTS.STATES.concat(`/${country_id}`))
        if (response.status === 200) {
            //   console.log("state>>" , response.data)
            if (response.data.status === 'fail') {
                triggerToastMessage({
                    message: 'Failed...! ',
                    description: response.data.msg
                })
            } else {
                return response.data?.states;
            }
        }

        if (response.status === 500) {
            console.log(response.data, "SERVER ERROR 500");
        }

    } catch (error) {
        console.log("Error fetchCart", err?.response?.data?.message);
    }

})