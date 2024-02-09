import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from '../../actions/auth/register';
import { loginUser } from '../../actions/auth/login';
import { fetchProfileDetails } from '../../actions/profile/fetchProfileDetails';
import { updateProfileDetails } from '../../actions/profile/updateProfileDetails';
import { fetchforgetpassword } from "../../actions/auth/forgotPassword";
import { verifyRegistration } from "../../actions/auth/verifyRegistration";
import { resendTwoFactorCode } from "../../actions/auth/resendTwoFactorCode";
import { fetchcreatePassword } from "../../actions/auth/createPassword";
import { fetchresetPassword } from "../../actions/auth/resetPassword";


const initialState = {
    userDetails: null,
    isUserLoggedIn: false,
    registrationLoading: false,
    loginLoading : false,
    forgetpasswordLoading : false,
    varifyRegistrationLoading : false,
    resendTwoFactorLoading : false ,
    createPasswordLoading : false,
    resetPasswordLoading : false,
    token: '',
    refreshToken: ''
}

export const AuthSlice = createSlice({
    initialState: initialState,
    name: 'auth',
    reducers: {
        storeUserDetails: (state, action) => {
            state.userDetails = action.payload.details;
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken;
            state.isUserLoggedIn = true;
        },
        clearUserDetails: (state, action) => {
            state.userDetails = null;
            state.isUserLoggedIn = false;
        }
    },
    extraReducers: (builder) => {

        // REGISTRATION API ACTIONS
        builder.addCase(registerUser.pending, (state, action) => {
            state.registrationLoading = true;
        })
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.registrationLoading = false;
        })
        builder.addCase(registerUser.rejected, (state, action) => {
            state.registrationLoading = false;
        })

        // LOGIN API ACTIONS

        builder.addCase(loginUser.pending, (state, action) => {
            // state.loginLoading = true;
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.token = action.payload.access_token;
            state.refreshToken = action.payload.refresh_token;
            state.isUserLoggedIn = true;
            state.loginLoading = false;
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loginLoading = false;
        })

        // PROFILE DETATILS API ACTIONS

        builder.addCase(fetchProfileDetails.pending, (state, action) => {
            state.loginLoading = true;
        })
        builder.addCase(fetchProfileDetails.fulfilled, (state, action) => {
            state.userDetails = action.payload.details;
            state.token = action.payload.access_token;
            state.refreshToken = action.payload.refresh_token;
            state.loginLoading = false;
            state.isUserLoggedIn = true;
        })
        builder.addCase(fetchProfileDetails.rejected, (state, action) => {
            state.loginLoading = false;
        })

        // PROFILE DETAILS UPDATE API ACTIONS

        builder.addCase(updateProfileDetails.pending , (state , action) => {
            state.loginLoading = true;
        })
        builder.addCase(updateProfileDetails.fulfilled , (state , action) => {
            state.userDetails = action.payload.details;
            state.loginLoading = false;
            state.isUserLoggedIn = true;
        })
        builder.addCase(updateProfileDetails.rejected , (state , action) => {
            state.loginLoading = false;
        })

        //FORGET PASSWORD API ACTIONS 

        builder.addCase(fetchforgetpassword.pending, (state, action) => {
            state.forgetpasswordLoading = true;
        })
        builder.addCase(fetchforgetpassword.fulfilled, (state, action) => {
            state.forgetpasswordLoading = false;
        })
        builder.addCase(fetchforgetpassword.rejected, (state, action) => {
            state.forgetpasswordLoading = false;
        })

        // VARIFY REGISTRATION API ACTIONS

        builder.addCase(verifyRegistration.pending, (state, action) => {
            state.varifyRegistrationLoading = true;
        })
        builder.addCase(verifyRegistration.fulfilled, (state, action) => {
            state.varifyRegistrationLoading = false;
        })
        builder.addCase(verifyRegistration.rejected, (state, action) => {
            state.varifyRegistrationLoading = false;
        })

        // RESEND TWO FACTOR API ACTIONS 

        builder.addCase(resendTwoFactorCode.pending, (state, action) => {
            state.resendTwoFactorLoading = true;
        })
        builder.addCase(resendTwoFactorCode.fulfilled, (state, action) => {
            state.resendTwoFactorLoading = false;
        })
        builder.addCase(resendTwoFactorCode.rejected, (state, action) => {
            state.resendTwoFactorLoading = false;
        })

        // CREATE PASSWORD API ACTIONS

        builder.addCase(fetchcreatePassword.pending, (state, action) => {
            state.createPasswordLoading = true;
        })
        builder.addCase(fetchcreatePassword.fulfilled, (state, action) => {
            state.createPasswordLoading = false;
        })
        builder.addCase(fetchcreatePassword.rejected, (state, action) => {
            state.createPasswordLoading = false;
        })

        // RESET PASSWORD API ACTIONS

        builder.addCase(fetchresetPassword.pending, (state, action) => {
            state.resetPasswordLoading = true;
        })
        builder.addCase(fetchresetPassword.fulfilled, (state, action) => {
            state.resetPasswordLoading = false;
        })
        builder.addCase(fetchresetPassword.rejected, (state, action) => {
            state.resetPasswordLoading = false;
        })
 
    }
})

export const { clearUserDetails, storeUserDetails } = AuthSlice.actions;
export default AuthSlice.reducer;