import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";
import { API_ENPOINTS } from "../../../utils/api";
import { triggerToastMessage } from "../../../services";

export const fetchWishlist = createAsyncThunk('wishlist/fetchWishlist', async () => {

    try {
        console.log("-------FETCH", );
        const response = await axios.get(API_ENPOINTS.GET_WISHLIST);

        if (response.status === 200) {
            if (response.data.status === 'fail') {
                triggerToastMessage({
                    message: 'Failed...! ',
                    description: response.data.msg
                })
            } else {
                return response.data?.data;
            }
        }

        if (response.status === 500) {
            console.log(response.data, "SERVER ERROR 500");
        }

    } catch (error) {
        console.log("Error fetchWishlist", err?.response?.data?.message);
    }

})