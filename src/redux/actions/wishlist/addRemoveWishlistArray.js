import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";
import { API_ENPOINTS } from "../../../utils/api";
import { triggerToastMessage } from "../../../services";

export const addRemoveWishlistArray = createAsyncThunk('wishlist/addRemoveWishlistArray', async ({ productArr = [] }) => {

    try {

        const response = await axios.post(API_ENPOINTS.ADD_REMOVE_WISHLIST_ARRAY, { "products": productArr });

        if (response.status === 200) {
            if (response.data.status === 'fail') {
                triggerToastMessage({
                    message: 'Failed...!',
                    description: response.data.msg
                })
            } else {
                triggerToastMessage({
                    message: 'Success...!',
                    description: response.data.msg
                })
            }
        }

        if (response.status === 500) {
            console.log(response.data, "SERVER ERROR 500");
        }

    } catch (error) {
        console.log("Error addRemoveWishlistArray", err?.response?.data?.message);
    }

})