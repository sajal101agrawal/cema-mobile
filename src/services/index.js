import { showMessage } from "react-native-flash-message";
import { Messages } from '../utils/messages';
import { Fonts, Colors, moderateScale } from '../utils/theme';
import * as Device from 'expo-device';
import moment from "moment";

export const triggerToastMessage = ({ message = undefined, isPositive = false, type = undefined, description = undefined, duration }) => {

    const messageObject = {
        autoHide: true,
        position: 'top',
        duration: duration || 3000,
        type: type ? type : isPositive ? 'success' : 'danger',
        message: message || Messages.SERVER,
        titleStyle: {
            fontFamily: Fonts.DM_SANS_BOLD,
            fontSize: moderateScale(14),
            color: Colors.WHITE
        },
        textStyle: {
            fontFamily: Fonts.DM_SANS_BOLD,
            fontSize: moderateScale(15),
            color: Colors.WHITE
        },
        icon: 'auto'
    }

    if (description) messageObject['description'] = description;

    showMessage(messageObject);
}

export const displayDateWithFormat = (date = new Date()) => moment(date).format('ll').toString();

export const displayAbsoluteAmount = (amount = 0) => amount.toLocaleString('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 })

export const generateImageUrl = (path, name) => `${path}/${name}`;

export const checkProductType = (type) => {
    switch (type) {
        case 'Sale': return '&hot=1';
        case 'New arrivals': return '&new_arrival=1';
        case 'Best sellers': return '&best_seller=1';
        case 'Featured products': return '&featured=1';
        default: return '';
    }
}

export const displayProductImage = () => {
    console.log("djkdshjkdshjkdfs:displayProductImage");
}