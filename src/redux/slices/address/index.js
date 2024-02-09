import { createSlice } from "@reduxjs/toolkit";
import { fetchCounty } from "../../actions/address/country";
import { fetchState } from "../../actions/address/state";
import { fetchCity } from "../../actions/address/city";
import { getAllAddress } from "../../actions/address/getAllAddress";
import { getAllBillingAddress } from "../../actions/address/getBillingAddress";

const initialState = {
  county: null,
  stateValue: null,
  city: null,
  allAddress: [],
  allBillingAddress: [],

  countryLoading: false,
  stateLoading: false,
  cityLoading: false,
  getAlladdressLoading: false,
  getAllbillingaddressLoading: false,
};

export const AddressSlice = createSlice({
  name: "address",
  initialState: initialState,
  reducers: {
    storeData: (state, action) => {
      state.county = action.payload;
    },
    clearData: (state, action) => {
      state.county = null;
    },
  },
  extraReducers: (builder) => {
    // COUNTRY API ACTIONS
    builder.addCase(fetchCounty.pending, (state, action) => {
      state.countryLoading = true;
    });
    builder.addCase(fetchCounty.fulfilled, (state, action) => {
      state.countryLoading = false;
      state.county = action.payload;
    });
    builder.addCase(fetchCounty.rejected, (state, action) => {
      state.countryLoading = false;
    });

    // STATE API ACTIONS
    builder.addCase(fetchState.pending, (state, action) => {
      state.stateLoading = true;
    });
    builder.addCase(fetchState.fulfilled, (state, action) => {
      state.stateLoading = false;
      state.stateValue = action.payload;
    });
    builder.addCase(fetchState.rejected, (state, action) => {
      state.stateLoading = false;
    });

    // CITY API ACTIONS
    builder.addCase(fetchCity.pending, (state, action) => {
      state.cityLoading = true;
    });
    builder.addCase(fetchCity.fulfilled, (state, action) => {
      state.cityLoading = false;
      state.city = action.payload;
    });
    builder.addCase(fetchCity.rejected, (state, action) => {
      state.cityLoading = false;
    });

    // GET ALL ADDRESS API ACTIONS
    builder.addCase(getAllAddress.pending, (state, action) => {
      state.getAlladdressLoading = true;
    });
    builder.addCase(getAllAddress.fulfilled, (state, action) => {
      state.getAlladdressLoading = false;
      state.allAddress = action.payload;
    });
    builder.addCase(getAllAddress.rejected, (state, action) => {
      state.getAlladdressLoading = false;
    });

    // GET ALL BILLING ADDRESS API ACTIONS
    builder.addCase(getAllBillingAddress.pending, (state, action) => {
      state.getAllbillingaddressLoading = true;
    });
    builder.addCase(getAllBillingAddress.fulfilled, (state, action) => {
      state.getAllbillingaddressLoading = false;
      state.allBillingAddress = action.payload
    });
    builder.addCase(getAllBillingAddress.rejected, (state, action) => {
      state.getAllbillingaddressLoading = false;
    });
  },
});

export const { storeData, clearData } = AddressSlice.actions;
export default AddressSlice.reducer;
