import { createSlice } from "@reduxjs/toolkit";
import { fetchNotification } from '../../actions/notification/notification';

const initialState = {
    mynotification : [],

    notificationLoading : false,
}

export const NotificationSlice = createSlice({
    initialState: initialState,
    name: 'auth',
    reducers: {
        clearNotificationData: (state, action) => {
            state.mynotification = [];
        },
    },
    extraReducers: (builder) => {

        // ORDERS DATA API ACTIONS
        builder.addCase(fetchNotification.pending, (state, action) => {
            state.notificationLoading = true;
        })
        builder.addCase(fetchNotification.fulfilled, (state, action) => {
            state.notificationLoading = false;
            state.mynotification = action.payload;
        })
        builder.addCase(fetchNotification.rejected, (state, action) => {
            state.notificationLoading = false;
        })
        
    }
})

export const { clearNotificationData } = NotificationSlice.actions;
export default NotificationSlice.reducer;