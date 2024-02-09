import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";
import { API_ENPOINTS } from "../../../utils/api";
import { triggerToastMessage } from "../../../services";

export const fetchCategories = createAsyncThunk('category/fetchCategories', async ({ page = 1 }) => {

    try {

        const response = await axios.get(`${API_ENPOINTS.CATEGORIES}?per_page=10&page=${page}`);

        if (response.status === 200) {
            if (response.data.status === 'fail') {
                triggerToastMessage({
                    message: 'Failed...! ',
                    description: response.data.msg
                })
            } else {
                return response.data?.categories;
            }
        }

        if (response.status === 500) {
            console.log(response.data, "SERVER ERROR 500");
        }

    } catch (error) {
        console.log("Error fetchCategories", err?.response?.data?.message);
    }

})