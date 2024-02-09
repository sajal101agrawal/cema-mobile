import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENPOINTS } from "../../../utils/api";
import { triggerToastMessage } from "../../../services";

export const fetchresetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({details,token, setLoading, navigation}) => {
    setLoading(true)
    try {
      const FORM_DATA = new FormData();

      FORM_DATA.append("old_password", details.old_password);
      FORM_DATA.append("password", details.password);
      FORM_DATA.append("password_confirmation", details.password_confirmation);

      console.log(FORM_DATA);

      const response = await axios.post(
        API_ENPOINTS.CHANGE_PASSWORD,
        FORM_DATA,
        token
      );

      if (response?.status === 200) {
        triggerToastMessage({
          type: "success",
          message: response.data?.message,
        });
        navigation.navigate("PasswordChangeDone");
        navigation.reset({
          index: 1,
          routes: [
            {
              name: "Signin",
            },
            {
              name: "PasswordChangeDone",
            },
          ],
        });
        if (response?.data?.status === "fail") {
          triggerToastMessage({
            message: "Password reset failed",
          });
        }
      }
      if (response?.status === 500) {
        console.log(response.data, "SERVER ERROR 500");
      }
    } catch (error) {
      triggerToastMessage({
        type:"error",
        message: "Old password is not match!",
      });
    } finally {
      setLoading(false)
    }
  }
);
