import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENPOINTS } from "../../../utils/api";
import { triggerToastMessage } from "../../../services";

export const shippingAddressAdd = createAsyncThunk(
  "auth/shippingAddressAdd",
  async ({
    address_name,
    address_email,
    address_addAddress,
    address_phoneNumber,
    address_type,
    address_pincode,
    country_id,
    state_id,
    city_id,
    defaddress
  }) => {
    try {
      const FORM_DATA = new FormData();

      FORM_DATA.append("name", address_name);
      FORM_DATA.append("email", address_email);
      FORM_DATA.append("address", address_addAddress);
      FORM_DATA.append("phone", address_phoneNumber);
      FORM_DATA.append("type", address_type);
      FORM_DATA.append("pincode", address_pincode);
      FORM_DATA.append("country_id", country_id);
      FORM_DATA.append("state_id", state_id);
      FORM_DATA.append("city_id", city_id);
      FORM_DATA.append("defaddress", defaddress);

      const response = await axios.post(
        API_ENPOINTS.CREATE_SHIPPING_ADDRESS,
        FORM_DATA
      );

      if (response.status === 200) {
        console.log("response", response.data);
        if (response.data?.status === "fail") {
          triggerToastMessage({
            message: "Registration failed",
            description: response.data?.msg,
          });
        } else {
          return response?.data?.address;
        }
      }

      if (response.status === 500) {
        console.log(response.data, "SERVER ERROR 500");
      }
    } catch (error) {
      console.log("Error", error?.response.message);
    }
  }
);
