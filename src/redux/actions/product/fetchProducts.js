import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";
import { API_ENPOINTS } from "../../../utils/api";
import { triggerToastMessage } from "../../../services";

export const fetchProducts = createAsyncThunk('product/fetchProducts', async ({ page = 1, type = '', postfix = null }) => {

    let FINAL_URL = `${API_ENPOINTS.GET_PRODUCTS}?per_page=10&page=${page}`;

    

    if(type.length != 0 || type != undefined){
        FINAL_URL = FINAL_URL.concat(type);
    }

    if(postfix !== null){
        FINAL_URL = FINAL_URL.concat(postfix);
        // FINAL_URL = `${API_ENPOINTS.GET_PRODUCTS}${page}`;
    }

    try {
        
        const response = await axios.get(FINAL_URL);

        if (response.status === 200) {
            if (response.data.status === 'fail') {
                triggerToastMessage({
                    message: 'Failed...! ',
                    description: response.data.msg
                })
            } else {
                const DATA = response.data?.data;

                return {
                    current_page : DATA?.current_page,
                    last_page : DATA?.last_page,
                    data : DATA.data
                }
            }
        }

        if (response.status === 500) {
            console.log(response.data, "SERVER ERROR 500");
        }

    } catch (error) {
        console.log("Error fetchProducts", err?.response?.data?.message);
    }

})