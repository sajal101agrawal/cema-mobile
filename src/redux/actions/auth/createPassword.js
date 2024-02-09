import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENPOINTS } from "../../../utils/api";
import { triggerToastMessage } from "../../../services";

export const fetchcreatePassword = createAsyncThunk(
  "auth/createPassword",
  async (email) => {
    try {
      const FORM_DATA = new FormData();

      FORM_DATA.append("email", email);
      console.log(API_ENPOINTS.CREATE_PASSWORD, FORM_DATA);

      const response = await axios.post(
        API_ENPOINTS.CREATE_PASSWORD,
        FORM_DATA
      );

      if (response?.status === 200) {
        if (response.data.status === "fail") {
          triggerToastMessage({
            message: "password create failed",
          });
        }
      }
      if (response.status === 500) {
        console.log(response.data, "SERVER ERROR 500");
      }
    } catch (error) {
      triggerToastMessage({
        type: 'error',
        message: "Old password is not match!",
      });
      console.log(error);
    }
  }
);
